import React, { useState } from 'react';

import SignInComp from './SignInComp/signIn';
import SignUpComp from './SignUpComp/signUp';
import ForgotPasswordComp from './ForgotPwd/forgotPwd';

import Logo from '../../assets/Logo.png'
import "./homepage.scss";

const COMP_CONSTANTS = {
    SIGN_IN: "Sign-In",
    SIGN_UP: "Sign-Up",
    FORGOT_PASSWORD: "Forgot-Password"
}

export default function HomePage(){

    const [compState, setCompState] = useState(COMP_CONSTANTS.SIGN_IN);

    const setCompStateFunc = (type)=>{
        setCompState(type)
    }

    // electronApi.firebaseAuthSigIn("sharankumaraero@gmail.com", "HelloWorld");
    //electronApi.firebaseAuthSigUp("sharankumaraero@gmail.com", "HelloWorld123");

    return (
        <>
            <div className='logoContainer' >
                <img src={Logo} />
            </div>
            <div className='credentialContainer'>
                {
                    compState === COMP_CONSTANTS.SIGN_IN ? <SignInComp callBack={setCompStateFunc}/> : compState ===  COMP_CONSTANTS.SIGN_UP ? <SignUpComp callBack={setCompStateFunc}/> : <ForgotPasswordComp callBack={setCompStateFunc} />
                }
            </div>
            
        </>
    )
}