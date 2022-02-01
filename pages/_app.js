import '../styles/globals.css'
import {Head} from '../components/common';
import { UserContext } from '../lib/context';
import { useUserData } from '../lib/hooks';

const noLayout = ({children}) => <>{children}</>

function MyApp({ Component, pageProps }) {
  const Layout = Component.Layout || noLayout;

  const userData = useUserData();
  return (
    <>
      <UserContext.Provider value={userData}>
        <Head />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </UserContext.Provider>
    </>
  )
}

export default MyApp
