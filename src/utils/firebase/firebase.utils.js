import {initializeApp} from 'firebase/app';
import { getAuth,
        signInWithRedirect,
        signInWithPopup,
        createUserWithEmailAndPassword,
        GoogleAuthProvider } from 'firebase/auth';
import {
    getFirestore,
    doc,
    getDoc,
    setDoc
} from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyClUiNxac_SO8Qx6wDTLkZwZQEbtM6H0zw",
    authDomain: "crown-clothing-db-807f4.firebaseapp.com",
    projectId: "crown-clothing-db-807f4",
    storageBucket: "crown-clothing-db-807f4.appspot.com",
    messagingSenderId: "271805379811",
    appId: "1:271805379811:web:42263da847aac609c541d6"
  };
  
  // Initialize Firebase
  const firebaseapp = initializeApp(firebaseConfig);

  const googleProvider = new GoogleAuthProvider();

  googleProvider.setCustomParameters({
    prompt: "select_account"
  });

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth,googleProvider);
  export const signInWithGoogleRedirect = () => signInWithRedirect(auth,googleProvider);

  export const db = getFirestore();

  export const createUserDocumentFromAuth = async (
    userAuth,
    additionalInformation={}) =>{
    const userDocRef = doc(db,'users',userAuth.uid);
    console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot.exists());

    if(!userSnapshot.exists()){
        const {displayName,email} = userAuth;
        const ceratedAt = new Date();

        try{
            await setDoc(userDocRef,{
                displayName,
                email,
                ceratedAt,
                ...additionalInformation,
            });
        }
        catch(error){
            console.log('error cerating the user ', error.message);

        }
    }

    return userDocRef;

  };


  export const createAuthUserWithEmailAndPassword = async (email,password) =>{

    if(!email || !password) return;

    return await createUserWithEmailAndPassword(auth,email,password);

  }


