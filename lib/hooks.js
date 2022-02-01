import {firestore, auth} from './firebase';
import {useAuthState} from 'react-firebase-hooks/auth'
import { useEffect, useState } from 'react';
import {doc, getFirestore, onSnapshot } from 'firebase/firestore';

//custom hook to read auth record and user profiles doc
export function useUserData() {
  const [user] = useAuthState(auth);
  const [username, setUsername] = useState(null);


  useEffect(()=>{

    //turn off realtime subs
    let unsubscribe;

    if(user) {
      const userRef = doc(getFirestore(), 'users', user.uid);
      unsubscribe = onSnapshot(userRef, (doc) => {
        setUsername(doc.data()?.username);
      });
    }else {
      setUsername(null)
    }

    return unsubscribe;
  }, [user]);
  return {user, username};
}