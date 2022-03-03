import { Box, Button, Grid, TextField, CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './signIn.scss';

const COMP_CONSTANTS = {
    SIGN_IN: "Sign-In",
    SIGN_UP: "Sign-Up",
    FORGOT_PASSWORD: "Forgot-Password"
}

const SignInComp = ({callBack})=>{

    const dispatch = useDispatch();
    const userData = useSelector(state=>state.user.user)

    useEffect(()=>{
        return ()=>{
            setProgressState(false);
        }
    }, [])

    const [progressState, setProgressState] = useState(false)
    const [formState, setFormState] = useState({
        email: "",
        password: ""
    })
    const [formValidState, setFormValidState] = useState({
        emailIsValid: true,
        passwordIsValid: true
    })
    const [helperTextState, setHelperTextState] = useState({
        email: "",
        password: ""
    })

    const TEXTFIELD_CONST = {
        EMAIL: "email",
        PWD: "password"
    }

    const checkValidity = (type, value)=>{
        switch (type) {
            case TEXTFIELD_CONST.EMAIL:
                if(value.length <= 0){
                    setHelperTextState({
                        ...helperTextState,
                        email: "Email Address cannot be empty"
                    });
                    setFormValidState({
                        ...formValidState,
                        emailIsValid: false
                    })
                } else {
                    setFormValidState({
                        ...formValidState,
                        emailIsValid: true
                    });
                    setHelperTextState({
                        ...helperTextState,
                        email: ""
                    });
                }
                break;
                
            case TEXTFIELD_CONST.PWD:
                if(value.length < 8){
                    setFormValidState({
                        ...formValidState,
                        passwordIsValid: false
                    })
                    setHelperTextState({
                        ...helperTextState,
                        password: "Password should be atleast 8 characters in length"
                    });
                } else if (!(/\d/.test(value))){
                    setFormValidState({
                        ...formValidState,
                        passwordIsValid: false
                    })
                    setHelperTextState({
                        ...helperTextState,
                        password: "Password should have atleast one number"
                    });
                } else {
                    setFormValidState({
                        ...formValidState,
                        passwordIsValid: true
                    })
                    setHelperTextState({
                        ...helperTextState,
                        password: ""
                    });
                }
                break;
            default:
                break;
        }
    }

    const onChangeHandler = (type, value)=>{
        checkValidity(type, value)
        switch (type) {
            case TEXTFIELD_CONST.EMAIL:
                setFormState({
                    ...formState,
                    email: value
                })                
                break;
            
            case TEXTFIELD_CONST.PWD:
                setFormState({
                    ...formState,
                    password: value
                })
                break;
        
            default:
                break;
        }
    }

    //Fetching user-data and updating redux on submit

    const updateUserDataRedux = (_, data)=>{

        setProgressState(false);

        if(!data.type){
            dispatch({type: 'user/loginUser', payload:data});
        } else if(data.type === "email") {
            setFormValidState({
                ...formValidState,
                emailIsValid: false
            })
            setHelperTextState({
                ...helperTextState,
                email: data.message
            });
        } else if(data.type === "password") {
            setFormValidState({
                ...formValidState,
                passwordIsValid: false
            })
            setHelperTextState({
                ...helperTextState,
                password: data.message
            });
        } else if(data.type === "both") {
            setFormValidState({
                ...formValidState,
                passwordIsValid: false,
                emailIsValid: false
            })
            setHelperTextState({
                ...helperTextState,
                password: data.message,
                email: data.message
            });
        }       
        
    }

    const onSubmitHadler = ()=>{
        if(formState.email.length <= 0 && formState.password.length <= 0){
            setFormValidState({
                ...formValidState,
                passwordIsValid: false,
                emailIsValid: false
            })
            setHelperTextState({
                ...helperTextState,
                password: "Password should be atleast 8 characters in length",
                email: "Email Address cannot be empty"
            });
        } else if (formValidState.emailIsValid && formValidState.passwordIsValid){
            electronApi.firebaseAuthSigIn(formState.email, formState.password, updateUserDataRedux);
            onSignInClick();
        }
        
    }

    const onSignInClick = ()=>{
        setProgressState(true);
    }

    return (
        <Box 
        className='SignInCompClass'
        sx={{ flexGrow: 1 ,     
                    position: "absolute",
                    top: "20%",
                    left: "51.5vw"
                    }}>
           <Grid container rowSpacing={1} columnSpacing={1} sx={{background: "#F0F0F0", borderRadius: "5px", height: "60vh", paddingLeft: "10%", width: "48vw"}}>
                <Grid item lg ={12}>

                </Grid>
                <Grid item lg={12}>
                <TextField
                        style = {{width: "90%"}}
                        id="outlined-required"
                        label="Enter Email Address"
                        type={'email'}
                        value ={formState.email}
                        onChange={(e)=>{
                            onChangeHandler(TEXTFIELD_CONST.EMAIL, e.target.value)
                        }}
                        error = {!formValidState.emailIsValid}
                        helperText = {helperTextState.email}
                        />
                </Grid>
                <Grid item lg ={12}>
                <TextField
                        style = {{width: "90%"}}
                        id="outlined-required"
                        label="Enter Password"
                        type={'password'}
                        value ={formState.password}
                        onChange={(e)=>{
                            onChangeHandler(TEXTFIELD_CONST.PWD, e.target.value)
                        }}
                        error = {!formValidState.passwordIsValid}
                        helperText = {helperTextState.password}
                        />
                </Grid>
                <Grid item lg ={7}>
                    <Button variant="contained" color='success' style = {{width: "90%", fontSize: "1.2em"}} onClick={()=>{onSubmitHadler()}}>
                        SIGN IN
                    </Button>
                </Grid>
                <Grid item lg ={4}>
                <Button variant="text" color='error' style = {{width: "100%", height: "30%", fontSize: "1em"}} onClick={()=>{callBack(COMP_CONSTANTS.FORGOT_PASSWORD)}}>
                        <span className='textSpan' style={{textTransorm: "lowercase"}}>Forgot Password?</span>
                    </Button>
                </Grid>
                <Grid item lg={7}>
                    <div style={{display: "flex", flexDirection: "column", fontSize: "1.2em", fontFamily: "fantasy", textAlign: "center", justifyContent: "center", alignContent: "center", height: "40%"}}>
                        <span className='textSpan' style={{textTransorm: "lowercase", marginLeft: "20%"}}>Don't have an account?</span>
                    </div>
                </Grid>
                <Grid item lg ={5} sx={{display: "flex"}}>
                    <Button variant="contained" color='info' style = {{width: "60%", height:"50%", fontSize: "0.8em"}} onClick={()=>{callBack(COMP_CONSTANTS.SIGN_UP)}} >
                        CREATE ACCOUNT
                    </Button>
                </Grid>
                <Grid item lg ={12}>
                    {
                        progressState ? <CircularProgress  color="success" style={{marginLeft: "40%"}}/> : ""
                    }                    
                </Grid>    
            </Grid>
            
        </Box>
    )
}

export default SignInComp;