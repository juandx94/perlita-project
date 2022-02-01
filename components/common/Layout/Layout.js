import { Toaster } from "react-hot-toast";
import { Navbar, Footer } from "..";
import { useAcceptCookies } from "../../../lib/useAcceptCookies";

const Layout = ({children}) => {  

  const {acceptedCookies, onAcceptCookies} = useAcceptCookies();

  return(
    <div className="relative">
      {/* NAVIGATION BAR  */}
      <Navbar />
      <main> {children}</main>
      <Footer />

    {/*Cookies*/ }
      <div className={!acceptedCookies ? `fixed
      bottom-0 
      bg-secondary-2
      text-secondary
      text-center 
      p-6 
      text-xs
      w-full
      z-50 transition-all duration-300 ease-out
      transform translate-y-0 opacity-100` : `fixed
      top-0
      text-center 
      p-6 
      text-xs
      w-full
      z-30 transition-all duration-300 ease-out
      transform translate-y-full opacity-0`}>

        <span className="block md:inline ">
          Esta pagina web usa cookies para mejorar tu experiencia. Haciendo click, estas de acuerdo con nuestra Politica de Privacidad
          </span>
        <button className="mx-5 font-semibold hover:underline" onClick={() => onAcceptCookies()}>
          Acceptar cookies
        </button>     
      </div>

      <Toaster />
    </div>
  )
}

export default Layout;