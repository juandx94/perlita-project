import Link from "next/link";
import { useContext, useState } from "react";
import { Layout, Quilljs } from "../components/common";
import { UserContext } from "../lib/context";
import { Disclosure } from '@headlessui/react'
import toast from "react-hot-toast";
import { addDoc, collection, getFirestore, serverTimestamp} from "firebase/firestore";
import {DefaultSeo} from 'next-seo'
const SendPerla = () => {
  const [content, setContent] = useState('');
  const [rawContent, setRawContent] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState();
  const {username} = useContext(UserContext);


  const createPost = async() => {
    const data = {
      name,
      age,
      publisher: {
        username: username
      },
      content,
      aproved: false,
      createdAt: serverTimestamp(),
    }

    const ref = collection(getFirestore(),'posts');
    toast.promise(addDoc(ref, data),{
      loading: 'Saving...',
      success: <b>Perlita creada</b>,
      error: <b>Ups, no se ha podido crear.</b>,
    })
  }

  const _onSubmit = async(e) => {
    e.preventDefault();
    try {
      checkForm()
      await createPost()

      setName('');
      setAge();
      setContent('')
    } catch (error) {
      console.error(error)
      error.name !== 'FirebaseError' 
      ? toast.error(error.message) : 
      toast.error('Error interno, intentelo mas tarde')
    }
  }

  const checkForm = () => {
    if(name.length < 3 || name.length >15){
      throw new Error('El nombre tiene que contener entre 3 a 15 caracteres.')
      
    }

    if(age < 0 || age > 100) {
      throw new Error('Introduce una edad validad')
    }

    if(rawContent.length <= 1) {
      throw new Error ('Contenido vacio')
    }
  }
  return (
    <div className="text-sm max-w-7xl mx-auto px-2 pt-4 sm:px-6 lg:px-8 text-grey">
      <DefaultSeo title="Crear perla" />
      <div className="max-w-3xl mx-auto">
      <h1 className="font-bold text-2xl">Publica tu <span className="text-green">Perlita</span></h1>
      <br/>
      <div className="m-2 max-w-3xl">
        <Disclosure>
          <Disclosure.Button className="font-medium py-2">
          <p>Por favor, respeta las <span className=" hover:underline font-medium text-green">reglas:</span></p>
          <br />
          </Disclosure.Button>
          <Disclosure.Panel className="font-medium bg-secondary-2 p-4 pl-8 text-secondary text-sm rounded-sm">
            <ul className="list-disc  list-outside">
              <li className="m-2">
                No hay reglas tabu. Cuentanos la perla que has escuchado en una conversacion.
              </li>
              <li className="m-2">
                Si la aportacion contiene referencias despectivas que pueden herir u ofender a la comunidad, inmediatamente no seran publicados.
              </li>
              <li className="m-2">
                Si la aportacion contiene faltas de ortografia, seran valoradas negativamente y duramente seran publicadas.
              </li>
              <li className="m-2">
                Si la aportacion esta mal redactado y con errores no seran publicadas.
              </li>
            </ul>
          </Disclosure.Panel>
        </Disclosure>
      </div>
      <div className="m-2 max-w-3xl">

        <Disclosure>
          <Disclosure.Button className="font-medium py-2">
            <p>Ver <span className=" hover:underline font-medium text-green">ejemplo:</span></p>
            <br />
          </Disclosure.Button>
          <Disclosure.Panel className="bg-secondary-2 p-4 pl-8 text-secondary text-sm rounded-sm">
            <p>
              Yo- ¿Sabes quien es Ares?
              <br/>
              jenny- No
              <br/>
              Yo- Ares, es el dios de la guerra.
              <br />
              jenny- ¿Enserio?. Yo pensaba que <strong>Ares </strong> era el <strong>Dios de las descargas por internet</strong>
            </p>
          </Disclosure.Panel>
        </Disclosure>
      </div>
      <br />
      <p className="m-2 font-medium ">
        No podremos garantizar que tu perlita sea publicada, pero si es original y divertida, tendras muchas posibilidades de que sea publidado.
      </p>
      <br />
      <div className="m-2 h-2/6">
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
              <form 
              onSubmit={_onSubmit}
              className="flex flex-col">
                <div className="flex font-medium placeholder:font-medium text-secondary m-0">
                  <input 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="border-0 rounded-sm outline-none placeholder:font-medium m-2 p-2 w-full"  type={'text'} placeholder="Nombre" required/>
                  <input 
                  min={0}
                  max={100}
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="border-0 rounded-sm outline-none placeholder:font-medium m-2 p-2 w-1/3" type={'number'} placeholder="Edad"  required/>
                </div>
                {/*<Tiptap getValue={getEditorValue}/>*/}
                <Quilljs content={content} 
                getContent={(htmlContent,rawContent) => {
                  setContent(htmlContent)
                  setRawContent(rawContent);
                }}/>
              <input className="border-0 rounded-sm outline-none hover:bg-green-100 bg-green m-2 p-2 uppercase font-bold text-primary" type={'submit'} value={'subir perlita'} />
            </form>
            </div>
        }
        
        </div>
      </div>
    </div>
  )
}
SendPerla.Layout = Layout;
export default SendPerla;