import { Layout } from "../components/common";
import { Smile } from "../components/icons";
import Link from 'next/link';
import {
  EmailIcon,
} from 'react-share';

const About = () => {
  return(
    <div className="max-w-7xl mx-auto px-2 pt-4 sm:px-6 lg:px-8 font-medium block text-grey">
      <div className="max-w-3xl mx-auto">
      
      <h1 className="font-bold text-2xl">Sobre Qué<span className="text-green">Perlita</span></h1>
      <br/>
      <p>
        QuéPerlita es descubrir que todavía somos niños. Si los niños sueltan perlas, los mayores también. 
        Quien no ha dicho es su vida alguna estupidez y han dicho. 
        <strong>¡Si hiciera un libro por cada tontería que dijeras! </strong>
      </p>
      <br/>
      <p>
        A esto nos dedicamos aquí, a recolectar las perlas que alguna vez hemos dicho u oido
        algún día. 
      </p>
      <br />
      <p>
        Para qué guardarlo en las notas de tu móvil o dejarlas en el aire si puedes compartir tu experiencia.
      </p>
      </div>
      <div className="flex justify-center text-grey ">
        <Smile className="m-2 w-32 h-32"/>
      </div>
      <div className="max-w-3xl mx-auto my-2">
        <h2 className="font-bold text-2xl">Contacta con nosotros:</h2>
        <br />
        <p>QuePerlita.com esta lejos de ser perfecta. Se seguiran añadiendo mas funcionalidades para mejorar la experiencia del usuario y seguir disfrutando. <br/><br/> Por favor, reporta cualquier error que pueda ocurrir en la pagina o aportanos ideas para seguir mejorando.<br/><br/> Vuestro feedback es muy importante para nosotros.</p>

        <div className="p-4 justify-center flex">
          <Link href ="mailto:juandxdev@gmail.com">
          <a>
          <EmailIcon size={64} round={true} />
          </a>
          </Link>
 
          
        </div>
      </div>
    </div>
  )
}

About.Layout = Layout;
export default About;