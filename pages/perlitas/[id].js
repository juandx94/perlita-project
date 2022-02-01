import { Layout } from "../../components/common";
import {useCollectionData} from 'react-firebase-hooks/firestore';
import {where,collection, doc, getDoc, getDocs, getFirestore, limit, orderBy, query, Timestamp, startAfter } from "firebase/firestore";
import { PostItem } from "../../components/Items";
import { Refresh, SadIcon } from "../../components/icons";
import ListPosts from "../../components/ui/ListPosts";
import { useState } from "react";


const postToJson = (doc) => {
  const data = doc.data();

  return {
    id: doc.id,
    ...data,
    createdAt: data?.createdAt.toMillis() || 0
  }
}

export const getStaticProps = async ({params}) => {
  const {id} = params;
  let post = null;
  let path;
  const postref = doc(getFirestore(),'posts', id);
  const snap = await getDoc(postref);
  if (snap.exists()) {
    post = postToJson(snap)
  }

  let lastestPosts = null
  const lastesPostRef = collection(getFirestore(),'posts');
  const q = query(
    lastesPostRef,
    where('aproved', '==', true),
    orderBy('createdAt', 'desc'),
    limit(10)
  )

  const snaps = await getDocs(q);
  if(snaps.size > 0) {
    lastestPosts = snaps.docs.map((value) => {
      const data = value.data();
      return {
         id: value.id,
         ...data,
         createdAt: data.createdAt.toMillis() || 0
      }
     });
  } 
  
  path = postref.path;
  console.log(path)
  return {
    props: { post, lastestPosts },
    revalidate: 100,
  };
}
export const  getStaticPaths = async () => {

  const q = query(
    collection(getFirestore(),'posts'),
    where('aproved', '==', true),
    orderBy('createdAt', 'desc'),
    limit(10)
  )

  const snapshot = await getDocs(q);
  
  const paths = snapshot.docs.map((doc) => {
    return {
      params: {id: doc.id}
    };
  });

  return {
    paths,
    fallback: 'blocking'
  }
}

const Post = (props) => {
  const [post] = useState(props.post)
  const [lastestPosts, setLastestPosts] = useState(props.lastestPosts);
  const [loading, setLoading] = useState(false);
  const [postsEnd, setPostEnd] = useState(false);


  const _onLoadMore = async () => {
    console.log("Loading more content.")
    setLoading(true);

    const lastPost = lastestPosts[lastestPosts.length - 1];
    
    const ref = collection(getFirestore(), 'posts');
    const cursor = typeof lastPost.createdAt == 'number' ?
    Timestamp.fromMillis(lastPost.createdAt) :
    lastPost.createdAt;

    const postsQuery = query(
      ref,
      where('aproved', '==', true),
      orderBy('createdAt', 'desc'),
      startAfter(cursor),
      limit(10)
    )

    const newPosts = await( await getDocs(postsQuery)).docs.map((value) => {
      const data = value.data();
      return {
        id: value.id,
        ...data,
        createdAt: data.createdAt.toMillis() || 0
      }
    });

    setLastestPosts(lastestPosts.concat(newPosts));
    setLoading(false);

    if(newPosts.length < 10) setPostEnd(true)

  }
  return (
    <div className="max-w-7xl mx-auto px-2 pt-4 sm:px-6 lg:px-8 block">
      <div className="max-w-3xl mx-auto">
        {
          post ?
          <PostItem item={post} /> :
          <div className="
          mx-auto
          bg-secondary
          rounded-sm 
          flex 
          flex-col 
          justify-center 
          items-center 
          text-center 
          p-2 
          m-2
          text-secondary
          font-bold 
          text-lg uppercase
          
          ">
            <SadIcon className="h-32 w-32 m-2" />
            <p className="m-2">Esta perlita no existe.</p>
        </div>
        }
      </div>
      <br />
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-medium text-grey">Ultimas perlas</h1>
        <br/>
        <ListPosts data={lastestPosts} />
        <div>
          {postsEnd ? 
          <div
          className={`
          m-2 
          p-2  
          rounded-sm 
          uppercase 
          flex justify-center
          font-bold text-sm bg-blue`}>
          
          Estas al dia

          </div> : 
          <div className="max-w-3xl mx-auto m-2 flex">
            <button
            onClick={_onLoadMore}
            disabled={loading}
            className={`
            m-2 
            p-2  
            rounded-sm 
            uppercase 
            w-full 
            flex justify-center
            font-bold text-sm hover:bg-green-100 bg-green `}>
              {loading ? <Refresh className="h-6 w-6 animate-spin" /> :
              'mas perlitas'}
            </button>
          </div>}
        </div>
      </div>

    </div>
  )
}
Post.Layout = Layout;
export default Post;