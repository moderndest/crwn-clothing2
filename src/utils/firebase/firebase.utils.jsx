import { initializeApp } from 'firebase/app';
import { getAuth, 
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword
} from 'firebase/auth';

import {
    getFirestore,
    doc,
    getDoc,
    setDoc
} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCXdsYuX8sShOGz62awPB_Ove0ToQIwdQY",
    authDomain: "crwn-db-62afb.firebaseapp.com",
    projectId: "crwn-db-62afb",
    storageBucket: "crwn-db-62afb.appspot.com",
    messagingSenderId: "799772922490",
    appId: "1:799772922490:web:935a1d43ba2f0b8f2ba1c3",
    measurementId: "G-ZLRY002ETX"
  };
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);

  const googleProvider = new GoogleAuthProvider();
  googleProvider.setCustomParameters({
      prompt: "select_account"
  });

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup( auth, googleProvider);
  export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

  export const db = getFirestore();

  export const createUserDocumentFromAuth = async (
      userAuth, 
      additionalInformation = {}
      ) => {
      if(!userAuth) return;

      const userDocRef = doc(db, 'users', userAuth.uid );

      console.log(userDocRef);

      const userSnapshot = await getDoc(userDocRef);
      console.log(userSnapshot);
      console.log(userSnapshot.exists());

      if(!userSnapshot.exists()){
          const {displayName, email} = userAuth;
          const createdAt = new Date();

          try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation

            });
          } catch (error) {
            console.log('error creating the user', error.message);
          }
      }

      return userDocRef;
  };

  export const createAuthUserWithEmailAndPassword = async (email, password) =>{
    if(!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);
  };