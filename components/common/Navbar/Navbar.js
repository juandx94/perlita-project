
import { Disclosure, Menu, Transition} from "@headlessui/react";
import {MenuIcon, XIcon} from '@heroicons/react/solid';
import {Logo} from '../../icons';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from "next/router";

//firebase
import { auth } from '../../../lib/firebase';
import {signOut} from 'firebase/auth';
import { useContext } from "react";
import { UserContext } from "../../../lib/context";

const navigation = [
  {name: 'Acerca de QuePerlita', href: '/about' },
  {name: 'Ultimos', href: '/' },
  //{name: 'Mejores', href: '/mejores' },
  {name: 'Subir Perlita', href: '/sendperla' },
  {name: 'Moderar', href: '/moderar'},
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}
const Navbar = () => {
  const {user, username} = useContext(UserContext);
  const router = useRouter();

  const _onSignOut = () => {
    signOut(auth);
    router.reload();
  }
 
  return (
    <Disclosure as={'nav'} className="sticky z-50 top-0 bg-primary">
      {({open}) => (
        <>
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 sticky top-0">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                <span className="sr-only">Open main menu</span>
                  {
                    open ? (
                      <XIcon className="block h-6 w-6" aria-hidden="true"/>
                    ): (
                      <MenuIcon className="block h-6 w-6" aria-hidden="true"/>
                    )
                  }
                </Disclosure.Button>
              </div>
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-between">
                <div className="flex-shrink-0 flex items-center">
                  {/* Logo */}
                  <Link href={'/'}>
                    <a>
                      <Logo className="block h-8 w-auto text-grey"/>
                    </a>
                  </Link>
                </div>
                <div className="hidden sm:block sm:ml-6">
                  <div className="flex text-center align-center justify-center text-sm font-medium">
                    {/* navigation links */}
                    {
                      navigation.map((item, id) => (
                        <Link
                          href={item.href}
                          key={id}
                          >
                          <a 
                          className={
                            classNames(router.pathname === item.href? 'p-2 bg-grey text-secondary' : 'p-2 hover:bg-primary-2 text-grey')
                          }
                          aria-current={router.pathname === item.href? 'page' : undefined}>
                            {item.name}
                          </a>
                        </Link>
                      ))
                    }
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {/* Profile dropdown */}
                    <Menu as= 'div' className="ml-3 relative">
                      <div>
                        <Menu.Button className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary focus:ring-primary-2">
                          <span className="sr-only">Open user menu</span>
                          <div className='relative w-8 h-8 rounded-full '>
                            <Image 
                              layout='fill'
                              alt='avatar'
                              src='/avocado.jpg'
                              className='rounded-full'
                              objectfit='cover'
                              
                              />

                          </div>
                        </Menu.Button>
                      </div>
                      <Transition 
                        as='div'
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className=" origin-top-right absolute right-0 mt-2 w-48 rounded-sm shadow-lg py-1 bg-grey text-secondary ring-1 ring-green ring-opacity-5 focus:outline-none">

                            {/**
                             * <Menu.Item>
                            {({ active }) => (

                                <Link href={'#'}>
                                  <a className={classNames(active ? 'bg-grey' : '', 'block px-4 py-2 text-sm text-secondary')}
                                  >
                                    Your Profile
                                  </a>
                                </Link>
                              )}
                            </Menu.Item>
                             */}                  
                            {/* if user is log */}
                            {user && (
                              <Menu.Item>
                                {({active}) => (
                                  
                                  <button onClick={_onSignOut}
                                    className={classNames(active ? 'bg-grey' : '', 'block w-full text-left px-4 py-2 text-sm text-secondary')}
                                  >
                                    Logout
                                    
                                  </button>
                                )} 
                              </Menu.Item>
                            )}
                            {!user && (
                               <Menu.Item>
                               {({active}) => (
                                 <Link href={'/signin'}>
                                 <a className={classNames(active ? 'bg-grey' : '', 'block w-full text-left px-4 py-2 text-sm text-secondary')}
                                 >
                                   Login
                                 </a>
                               </Link>
                               )} 
                             </Menu.Item>
                            )}
                        </Menu.Items>
                      </Transition>
                    </Menu>
              </div>
            </div>
          </div>
          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 bg-3 space-y-1 text-sm font-medium">
              {
                navigation.map((item, id) =>(
                  <Disclosure.Button
                    key={id}
                    as='div'
                  >
                    <Link href={item.href}>
                      <a 
                      className={
                        classNames(router.pathname === item.href ? 'p-2 bg-grey text-secondary' : 'p-2 hover:bg-primary-2 text-grey', 'block')
                      }
                      aria-current={router.pathname === item.href ? 'page' : undefined} >
                        {item.name}
                      </a>
                    </Link>
                    
                  </Disclosure.Button>
                ))
              }
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}

export default Navbar;