import { async } from "@firebase/util";
import { useState } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import './sign-up.styles.scss';
import Button from '../button/button.component';

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUpForm = () =>{

    const [formFields,setFormFields] = useState(defaultFormFields);
    const {displayName,email,password,confirmPassword} = formFields;

    const resetFormfields = ()=>{
        setFormFields(defaultFormFields);
    }
    const handleSubmit = async(event)=>{
        event.preventDefault();
    
        if (password !== confirmPassword){
            alert("passwords doesnt match");
            return;
        }

        try {
            const {user}  = await createAuthUserWithEmailAndPassword(email,password);
            await createUserDocumentFromAuth(user,{displayName})
            resetFormfields();
        } catch (error) {
            if(error.code === 'auth/email-already-in-use'){
                alert('Cannot create user, email already in use');
            }
        }
    };

    console.log(formFields);
    const handleChange = (event)=>{
        const {name, value} = event.target;

        setFormFields({...formFields,[name]:value})
    };

    return (
        <div className="sign-up-container">
            <h2>Don't have an account?</h2>
            <span>Sign up with your user and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput 
                label="Display Name"
                type="text" 
                required onChange={handleChange} 
                name="displayName" 
                value={displayName}/>


                <FormInput type="email" 
                label="Email"
                required 
                onChange={handleChange} 
                name="email" 
                value={email}/>

                <FormInput
                label="password"
                 type="password" 
                 required onChange={handleChange} 
                 name="password" 
                 value={password}/>

                <FormInput 
                label="Confirm Password"
                type="password" 
                required 
                onChange={handleChange} 
                name="confirmPassword" 
                value={confirmPassword}/>

                <Button
                type="submit"> Sign up</Button>
            </form>
        </div>
    );
}

export default SignUpForm;