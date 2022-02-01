
import { getDocs, getFirestore, limit, query, where, orderBy, collection, Timestamp, startAfter } from "firebase/firestore";
import { useState } from "react";
import { Layout } from "../components/common";
import { Refresh } from "../components/icons";

import { ListPosts } from "../components/ui";

const LIMIT = 10;
export async function getServerSideProps(context) {
  
  const ref = collection(getFirestore(), 'posts');
  const postsQuery = query(
    ref,
    where('aproved', '==', true),
    orderBy('createdAt', 'desc'),
    limit(LIMIT)
  )

  const posts = await (await getDocs(postsQuery)).docs.map((value)=> {
    const data = value.data();
   return {
      id: value.id,
      ...data,
      createdAt: data.createdAt.toMillis() || 0
   }
  })
  return {
    props: {
      posts: posts,
    }
  }
}

const Home = (props) => {
  const [posts, setPosts] = useState(props.posts);
  const [loading, setLoading] = useState(false);
  const [ postsEnd, setPostsEnd] = useState(false);



  const _onLoadMore = async () => {
    console.log("Loading more content")
    setLoading(true);
    const lastPost = posts[posts.length - 1];
    console.log(lastPost)


    const ref = collection(getFirestore(), 'posts');
    const cursor = typeof lastPost.createdAt == 'number' ?
    Timestamp.fromMillis(lastPost.createdAt) :
    lastPost.createdAt;

    const postsQuery = query(
      ref,
      where('aproved', '==', true),
      orderBy('createdAt', 'desc'),
      startAfter(cursor),
      limit(LIMIT)
    )

    const newPosts = await (await getDocs(postsQuery)).docs.map((value)=> {
      const data = value.data();
     return {
        id: value.id,
        ...data,
        createdAt: data.createdAt.toMillis() || 0
     }
    });

    setPosts(posts.concat(newPosts));
    setLoading(false);

    if(newPosts.length < LIMIT) setPostsEnd(true)
  }

   return (
    <div className="max-w-7xl mx-auto px-2 pt-4 sm:px-6 lg:px-8 block">
        <ListPosts data={posts} />
        <div>
          {postsEnd ? 
          <div className="max-w-3xl mx-auto m-2 flex">
            <div
            className={`
            m-2 
            p-2  
            rounded-sm 
            uppercase 
            w-full 
            flex justify-center
            font-bold text-sm bg-blue`}>
            
            Estas al dia

            </div>
        </div>: 
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
      </div>
        }
        </div>
    </div>
  )
}
Home.Layout = Layout;
export default Home;