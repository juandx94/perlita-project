import { Layout } from "../components/common";

const PrivacyPolicy = () => {
  return(
    <div className="max-w-7xl mx-auto px-2 pt-4 sm:px-6 lg:px-8 text-sm font-medium block text-grey">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-bold text-2xl">Politicas de <span className="text-green">Privacidad</span></h1>
        <br/>
        <p className="m-2">
          Se establece los terminos en que David usa y proteje la informacion que es 
          proporcionada por los usuarios al momento de utilizar esta pagina web.
        </p>
        <h1 className="text-lg text-green">1. Datos de caracter personal </h1>
        <p className="m-2">
            David recoge informacion personal introducidad por los usuarios, como nombre, direccion de correo electronico.
            <br/>
            David tambien puede recoger otro informacion relativa a sus usuarios o visitantes, tales como ip, tipo navegador o idioma.
            Estos datos son utilizados para ofrecer un mejor servicio a todos nuestros usuarios y relaizar estadisticas.

        </p>
        <p className="m-2">
          David se reserva el derecho de poder remitir por cualquier medio electronico a sus ususarios notificaciones, avisos y/o noticias relacionadas con el servicio.
        </p>
        <h1 className="text-lg text-green">2. Uso de cookies</h1>
        <p className="m-2">
          David podra instalar dispositivos de almacenamieto, recuperacion de datos, tambien denominadas cookies, en su ordenador
          con el fin de conocer informacion de los visitantes a sus web, en ningun caso dichos datos se trataran de datos personales.
          En ocasiones la pagina web, generara un mensaje instantaneo el cual brindara la posibilidad a los visitantesde la web de oponerse a la 
          instalacion de los citados dispositivos.
        </p>
        <p className="m-2">
          Esta pagina puede contener cookies de terceros, como google analytics.
        </p>
        <h1 className="text-lg text-green">3. Privacidad de menores</h1>
        <p className="m-2">
          El sitio web no esta destinado a menores de 14 años, ya que somos conscientes que pueden no llegar a comprendr todos los puntos de nuestra Politica de Privacidad, 
          y en todo caso, no se recabara de forma consciente informacion confidencial de menores de 14 años.
        </p>
        <h1 className="text-lg text-green"> 4. Cambios en la Politica de Privacidad</h1>
        <p className="m-2">
          David se reserva eñ derecho de poder realizar cambios en esta Politica de Privacidad, los cuales seran publicados para que nuestros usuarios y visitantes tengan consciencia de 
          los mismos. Los usuarios del Sitio Web quedaran sujetos a la nueva Politica de Privacidad cuando entren en vigor en el sitio.
        </p>
        
      
      </div>
      
    </div>
  )
}

PrivacyPolicy.Layout = Layout;
export default PrivacyPolicy;