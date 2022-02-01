import {initializeApp, getApp} from 'firebase/app';
import {getStorage} from 'firebase/storage';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import {collection, getDocs, getFirestore, query, where} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_FIREBASE_APP_ID
};


function createFirebaseApp(config) {
  try{
    return getApp()
  } catch {
    return initializeApp(config)
  }
}

const firebaseApp = createFirebaseApp(firebaseConfig);

//AUTH EXPORTS
export const auth = getAuth(firebaseApp);
export const googleAuthProvider = new GoogleAuthProvider();

//firestore
export const firestore = getFirestore(firebaseApp);

//storage
export const storage = getStorage(firebaseApp);

//helper functions
/**
 * 
 *  GETS user/{uid} document with username
 * 
 */

export async function getUserWithUsername(username) {
  const q = query(
    collection(getFirestore(), 'users'),
    where('username', '==' ,  username)
  )
  const userDoc = ( await getDocs(p)).docs[0];

  return userDoc;
}

/**
 * Convert a firestore document to JSON.
 */
export function postToJSON(doc) {
  const data = doc.data();

  return {
    ...data
  };
}

