import {auth, firestore,firebase, googleAuthProvider} from '../lib/firebase';
import { signInWithPopup, signOut } from 'firebase/auth'
import { useCallback, useContext, useEffect, useState } from "react";
import { Layout } from "../components/common";
import {UserContext} from '../lib/context'
import { Google, Refresh } from '../components/icons';
import toast from 'react-hot-toast';
import debounce from 'lodash.debounce';
import { Timestamp ,doc, getDoc, getFirestore, writeBatch } from 'firebase/firestore';
import { useRouter } from 'next/router';
import  Router  from 'next/router';
import Link from 'next/link';
const SignIn = () => {
  
  const {user, username} = useContext(UserContext);
  
  useEffect(()=> {
    if(username) {
      toast.success("Estas logeado")
      Router.replace("/")
    }

  }, [username]);
  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
    {
      user ? !username ? 
      <CompleteProfile /> : 
      <LogOutProfile /> :
      <SignInProviders />

    }
    </div>
  )

}

const LogOutProfile = () => {
  return (
    <div className=' flex h-screen align-middle justify-center items-center'>

      <button 
      onClick={()=> {
        signOut(auth)
      }}
      className=' bg-red p-2 rounded-sm text-sm font-medium drop-shadow-md'>
        Cerrar sesion
      </button>
    </div>
  )
}

function SignInProviders() {
  const signInWithGoogle = async () => {
    try {
        await signInWithPopup(auth, googleAuthProvider)
    } catch (error) {
      console.error("Google provider Error: ",error.message)
      toast.error('Ups! Parece que algo anda mal.')
    }
  };

  return (
    <div className='flex flex-col h-screen items-center justify-center align-middle'>
      <h2 className='p-4 text-2xl font-semibold text-grey'>Inicia sesión o registrate</h2>
      <br />
      <div className=''>

      <div className='text-secondary font-medium justify-center flex'>
        <button 
        onClick={signInWithGoogle}
        className='rounded-sm flex items-center font-medium bg-secondary hover:opacity-90 p-2'>
          
          <Google className="w-6 h-6 text-secondary m-1" />
          <span className='m-1'>Sign in with Google</span>
        </button>
      </div>
      <br />
        <p className='text-center text-grey text-sm'>
          Por favor, lea los
          {' '}
          <Link href={'/terms'}>
            <a className='text-green'>
            <strong>Terminos y Condiciones</strong>
            </a>
          </Link> y nuestra
          {' '} 
          <Link href={'/privacy'}>
            <a className='text-green'>
            <strong>Politica de Privacidad</strong>
            </a>
          </Link> antes de acceder y usar la pagina web.
        </p>
      </div>
    </div>
  );
}

function CompleteProfile() {
  const [value, setValue] = useState('');
  const [validUser, setValidUser] = useState(false);
  const [loading, setLoading] = useState('false');
  const router = useRouter();
  const { user, username } = useContext(UserContext);


  const onSubmit = async (e) => {
    e.preventDefault();

    toast.promise(
      createUser(),
      {
        loading: 'Creando...',
        success: <b>Usuario creado!</b>,
        error: <b>No se ha podido crear usuario.</b>
      }
    )
    router.push('/');
  };

  async function  createUser () {
     //create ref for users and usernames.
     const userDoc = doc(getFirestore(), 'users', user.uid);
     const usernameDoc = doc(getFirestore(), 'usernames', value);
 
     //commit docs together as a batch write.
     const batch = writeBatch(getFirestore());
     batch.set(userDoc, {
       username: value, 
       photoURL: null,
       fullname: user.displayName,
       createdAt: Timestamp.fromMillis(user.metadata.createdAt)
     });
     batch.set(usernameDoc, {uid: user.uid});
 
     await batch.commit();
  }

  const onChange = (e) => {
    const val = e.target.value.toLowerCase();
    const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

    if (val.length < 3) {
      setValue(val);
      setLoading(false);
      setValidUser(false);
    }

    if (re.test(val)) {
      setValue(val);
      setLoading(true);
      setValidUser(false);
    }
  }

  useEffect(()=> {
    checkUsername(value);

  }, [checkUsername, value]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const checkUsername = useCallback (
    debounce( async(username) => {
      if (username.length >= 3) {
        const ref = doc(getFirestore(), 'usernames', username)
        const snap = await getDoc(ref);
        console.log("Firetore read executed");
        setValidUser(!snap.exists());
        setLoading(false)
      }
    }, 500), []
  )
  
  return (
   !username && (
    <div className=' flex flex-col h-screen items-center justify-center'>
    <h3 className='text-2xl font-bold mb-4' >Registrar nombre de usuario</h3>
    <form className='w-96'
      onSubmit={onSubmit}
    >
      <input 
      className='
      placeholder:font-medium
      appearance-none
      focus:outline-none
      block
      w-full
      p-2 m-2 rounded-sm font-medium text-center bg-primary-2
      placeholder:text-grey ring-0 focus:ring-0'
      name='username' 
      placeholder='username' 
      required
      autoComplete='off'
      value={value}
      onChange={onChange}
      />
      <button
      className={validUser ? 
        'bg-green justify-center  w-full flex p-2 m-2 rounded-sm hover:bg-green-100 uppercase font-bold' : 
        'justify-center bg-red flex w-full p-2 m-2 rounded-sm  uppercase font-bold'}
      type='submit'
      disabled ={!validUser}
      >
      <DisplayMessage 
        username={value}
        isValid={validUser}
        loading={loading}
        />
    </button>
    </form>
    </div>
   )
  )
}
function DisplayMessage({username, isValid, loading}) {
  if(loading) {
    return (
        <Refresh className="animate-spin w-6 h-6" />
    )
  }else if (isValid){
    return "Nombre disponible"
  }else if (username && !isValid) {
    return "Usuario no disponible"
  } else {
    return "validar"
  }
}


SignIn.Layout = Layout;

export default SignIn;