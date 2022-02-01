import { Disclosure } from "@headlessui/react";
import { collection, doc, getDocs, getFirestore, limit, query, where ,orderBy, updateDoc, deleteDoc} from "firebase/firestore";
import { useContext, useState } from "react";
import { Layout } from "../components/common";
import Link from 'next/link';
import { UserContext } from "../lib/context";
import { Like, SadIcon, UnLike } from "../components/icons";
import { useRouter } from "next/router";

export const getServerSideProps = async (context) => {
  const ref = collection(getFirestore(), 'posts');
  const postsQuery = query(
    ref,
    where('aproved', '==', false),
    orderBy('createdAt', 'desc'),
    limit(1)
  )
  const docs = await getDocs(postsQuery)
  
  var post = [];
  if (docs.size > 0 ) {
    post =  docs.docs.map((value)=> {
      const data = value.data();
     return {
        id: value.id,
        ...data,
        createdAt: data.createdAt.toMillis() || 0
     }
    })
  }
  
  return {
    props: {
      post: post[0] || null
    }
  }
}

const Moderar = (props) => {
  const {username} = useContext(UserContext);
  const [post, setPost] = useState(props.post);
  const getNewPost = async () => {
    const ref = collection(getFirestore(), 'posts');
    const postsQuery = query(
      ref,
      where('aproved', '==', false),
      orderBy('createdAt', 'desc'),
      limit(1)
    )

    const newPost = await(await getDocs(postsQuery)).docs.map((value) => {
      const data = value.data();
      return {
        id: value.id,
        ...data,
        createdAt: data.createdAt.toMillis() || 0
      }
    })
    setPost(newPost[0] || null)
  }


  const _onClickAccept = async () => {
    const ref = doc(getFirestore(), 'posts', post.id)
    try {
      if (ref) {
        await updateDoc(ref, {
          aproved: true
        })
        await getNewPost()
      }
    } catch (error) {
      console.error(error)
    }

  }
  const _onClickReject = async () => {
    
    const ref = doc(getFirestore(), 'posts', post.id)
    console.log("ref delete: ", ref)
    try {
      if (ref) {
        await deleteDoc(ref)
        console.log('delete function')
        await getNewPost()
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="text-sm max-w-7xl mx-auto px-2 pt-4 sm:px-6 lg:px-8 text-grey">
      <div className="max-w-3xl mx-auto"> 
      <h1 className="font-bold text-2xl">Buscador de <span className="text-green">Perlas</span></h1>
      <br/>
      <p className="m-2 font-medium ">
      ¿Sabes como son las perlas?, ¿Crees que tienes lo necesario para para encontrar una de buena calidad?. 
      En esta seccion, nos dedicamos a buscar las perlas dignas de ser mostradas. Demuestra tus habilidades de buscador y encuentralas.
      </p>
      
      <div className="m-2 max-w-3xl">
        <Disclosure>
          <Disclosure.Button className="font-medium py-2">
          <p>¿Cómo son las <span className=" hover:underline font-medium text-green">perlas</span>?</p>
          <br />
          </Disclosure.Button>
          <Disclosure.Panel className="font-medium bg-secondary-2 p-4 pl-8 text-secondary text-sm rounded-sm">
            <strong>Las perlas cumplen con los siguientes requisitos:</strong>
            <ul className="list-disc  list-outside">
              <li className="m-2">
                Estan bien escritas , estructuradas y sin faltas de ortografia
              </li>
              <li className="m-2">
                Son originales y divertidos.
              </li>
              <li className="m-2">
                No tienen referencias despectivas que  puedan ofender a terceros.
              </li>
              <li className="m-2">
                No son obcenas ni desagradables.
              </li>
            </ul>
          </Disclosure.Panel>
        </Disclosure>
      </div>
      <br />
      <div className="m-2 max-w-3xl"> 
        {
          !username ? 
          <div className="rounded-sm bg-secondary-2 p-4 text-secondary text-sm font-medium">
            <p className="text-center">
            Necesitas una cuenta de QuePerlita.com para publicar perlitas.
            <Link href={'/signin'}>
              <a className="text-green ml-4 font-bold">
              ¡Crea tu cuenta ahora!
              </a>
            </Link>
            </p>
          </div> : 
          <div>
            {
              post ? 
              <div className="bg-secondary rounded-sm text-secondary font-medium">
                <div className="text-lg py-2 px-4">
                  <p>{post.name}, {post.age} años</p>
                </div>
                <div className='h-1 mx-4 my-2 bg-grey' />
                  <div className='prose prose-sm text-base font-medium px-4 py-2'>
                    <div dangerouslySetInnerHTML={{__html: post.content}} />
                  </div>
                  <div className="flex justify-between text-center text-primary">
                    <button 
                    onClick={_onClickAccept}
                    className=" flex bg-blue flex-1 p-2 justify-center items-center hover:bg-blue-100">
                      <Like className="w-6 h-6 m-1" />
                    </button>
                    <button 
                    onClick={_onClickReject}
                    className="flex bg-red flex-1 p-2 justify-center items-center hover:bg-red-100">
                      <UnLike className="w-6 h-6 m-1"/>
                    </button>
                  </div>
              </div>: 
              <div className=" flex flex-col bg-secondary rounded-sm text-secondary items-center justify-center font-bold">
                <SadIcon className="h-32 w-32 m-2" />
                <p className="m-2">No hay perlitas disponibles</p>
              </div>
            }
          </div>
          }
      </div>
      </div>
    </div>
  )
}

Moderar.Layout = Layout;
export default Moderar;