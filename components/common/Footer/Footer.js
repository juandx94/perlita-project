import Link from 'next/link';


const FooterNavigation = [
  {name: 'Acerca', href: "/about"},
  {name: 'Terminos y Condiciones', href: 'terms'},
  {name: 'Privacidad', href: 'privacy'},
  //{name: 'Faqs', href: '#'}
]
const Footer = () => {

  return (
    <footer className='pt-5 '>
      <div className='font-medium text-grey max-w-7xl mx-auto p-2 sm:px-6 lg:px-8'>
        <h1 className='text-3xl p-2'>
          Que<span className='text-green'>Perlita.com</span>.com ha sido creado para <span className='text-green'>divertir</span>.
        </h1>
        <h2 className='text-2xl p-2'>
          <span className='text-green'>¡Sonrie!.</span> La vida es corta. 
        </h2>
      </div>
      <div className='text-grey text-sm sm:flex sm:justify-between font-medium max-w-7xl mx-auto px-2 sm:px-6 lg:px-8'>
        {
          FooterNavigation.map((item, index) => (
            <Link 
            href={item.href}
            key={index}
            >
              <a className='block text-left sm:text-center p-2 hover:bg-primary-2'>
                {item.name}
              </a>
            </Link>
          ))
        }
      </div>
      <div 
      className='flex justify-center text-xs text-grey p-4 bg-primary-2'>
        <p>&copy;QuePerlita.com</p>
      </div>
    </footer>
  )
}

export default Footer;