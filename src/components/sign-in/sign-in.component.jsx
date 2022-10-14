import { 
        auth,
        signInWithGooglePopup, 
        signInWithGoogleRedirect,
        createUserDocumentFromAuth 
} from "../../utils/firebase/firebase.utils"; 

import { useEffect } from "react";
import { getRedirectResult } from "firebase/auth"; 
import { async } from "@firebase/util";
import Button from '../button/button.component';

const SignIn = () =>{

    useEffect (()=>{
        async function tempFunct (){
            const response = await getRedirectResult(auth);
            console.log(response);
            if (response){
                const userDocRef = await createUserDocumentFromAuth(response.user)
            }
        }
        tempFunct();
    },[]);

    const logGoogleUser = async () =>{
        const {user} = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user)
    }

    return(
        <div className="sign-in">
            <h1>Sign in component</h1>
            <button onClick={logGoogleUser}>
                Sign in with Google Pop up
            </button>
            <button onClick={signInWithGoogleRedirect}>
                Sign in with Google Redirect
            </button>
        </div>
    );
}

export default SignIn;