import { Box, Button, Grid, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';

import "./forgotPwd.scss";

const COMP_CONSTANTS = {
    SIGN_IN: "Sign-In",
    SIGN_UP: "Sign-Up",
    FORGOT_PASSWORD: "Forgot-Password"
}

const ForgotPasswordComp = ({callBack})=>{

    const [emailState, setEmailState] = useState("")
    const [emailValidState, setEmailValidState] = useState(true)
    const [helperTextState, setHelperTextState] = useState("")
    const [resendEmailState, setResendEmailState] = useState("")
    const [resendEmailColorState, setResendEmailColorState] = useState("green")
    const [resendButtonState, setResendButtonState] = useState(false);
    const [timeState, setTimeState] = useState(30);

    let timer;

    useEffect(()=>{
        return ()=>{
            clearInterval(timer)
        }
    }, [])

    const checkValidity = (value)=>{
        if(value.length <= 0){
            setHelperTextState("Email ID cannot be empty");
            setEmailValidState(false)
        } else {
            setHelperTextState("");
            setEmailValidState(true)
        }
    }

    const callback = (_, data)=>{
        if(data === "Error"){
            setResendEmailState("Something went wrong. Please try again later");
            setResendEmailColorState("red");
            clearInterval(timer);
            setResendButtonState(false);

        } else if(data === "Invalid email"){
            setHelperTextState("Invalid email");
            setEmailValidState(false);
            clearInterval(timer);
            setResendButtonState(false);
        }
         else {
            setResendEmailState("Password reset email is sent");
            setResendEmailColorState("green");
        }
    }

    const onSendHandler = ()=>{
        if(emailState.length <= 0){
            setEmailValidState(false);
            setHelperTextState("Email ID cannot be empty");
        } else if (emailValidState) {
            startTimer()
            electronApi.firebaseAuthForgPwd(emailState, callback);
        }
    }

    const startTimer = ()=>{
        console.log("starting timer");
        let timer_sec = 30;
        setResendButtonState(true);
        timer = setInterval(() => {
            timer_sec--;
            updateState(timer_sec);
            if (timer_sec <= 0){
                setResendButtonState(false);
                clearInterval(timer)
            }
            console.log(timer_sec);
        }, 1000);
    }

    const updateState = (time)=>{
        setTimeState(time)
    }

    return (
        <Box 
        className='ForgotPwdCompClass'
        sx={{ flexGrow: 1 ,     
                    position: "absolute",
                    top: "20%",
                    left: "51.5vw"
                    }}>
           <Grid container rowSpacing={1} columnSpacing={0} sx={{background: "#F0F0F0", borderRadius: "5px", height: "60vh", paddingLeft: "10%", width: "48vw"}}>
                <Grid item lg ={12}>

                </Grid>
                <Grid item lg={12}>
                <TextField
                        style = {{width: "90%"}}
                        id="outlined-required"
                        label="Enter Email Address"
                        type={'email'}
                        
                        value ={emailState}
                        onChange={(e)=>{
                            setEmailState(e.target.value)
                            checkValidity(e.target.value)
                        }}
                        error = {!emailValidState}
                        helperText = {helperTextState}
                        />
                </Grid>
                <Grid item lg ={9}>
                    <Button variant="contained" color='success' style = {{width: "90%", fontSize: "1.2em"}} disabled={resendButtonState} onClick={()=>{onSendHandler()}}>
                        {!resendButtonState ? "SEND RESET EMAIL" : "RESEND in " + timeState + " secs..."}
                    </Button>
                </Grid>
                <Grid item lg={6}>
                    <div style={{display: "flex", flexDirection: "column", fontSize: "1.2em", fontFamily: "fantasy", textAlign: "center", justifyContent: "center", alignContent: "center", height: "40%"}}>
                        <span className='textSpan' style={{textTransorm: "lowercase"}}>Already have an account?</span>
                    </div>
                </Grid>
                <Grid item lg ={4} sx={{display: "flex"}}>
                    <Button variant="contained" color='info' style = {{width: "60%", fontSize: "1em"}} onClick={()=>{callBack(COMP_CONSTANTS.SIGN_IN)}}>
                        SIGN-IN
                    </Button>
                </Grid>
                <Grid item lg={10}>
                    <div style={{display: "flex", flexDirection: "column", fontSize: "1.2em", fontFamily: "fantasy", textAlign: "center", justifyContent: "center", alignContent: "center", height: "40%"}}>
                        <span className='textSpan' style={{textTransorm: "lowercase", color: resendEmailColorState}}>{resendEmailState}</span>
                    </div>
                </Grid>
            </Grid>      
        </Box>
    )
}

export default ForgotPasswordComp;