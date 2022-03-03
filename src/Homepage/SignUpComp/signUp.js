import { Box, Button, Grid, TextField, CircularProgress } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import "./signUp.scss";

const COMP_CONSTANTS = {
    SIGN_IN: "Sign-In",
    SIGN_UP: "Sign-Up",
    FORGOT_PASSWORD: "Forgot-Password"
}

const SignUpComp = ({callBack})=>{

    const dispatch = useDispatch();

    const [progressState, setProgressState] = useState(false)
    const [formState, setFormState] = useState({
        email: "",
        name: "",
        password: "",
        rePassword: ""
    })
    const [formValidState, setFormValidState] = useState({
        emailIsValid: true,
        nameIsValid: true,
        passwordIsValid: true,
        rePasswordIsValid: true
    })
    const [helperTextState, setHelperTextState] = useState({
        email: "",
        name: "",
        password: "",
        rePassword: ""
    })

    useEffect(()=>{
        return ()=>{
            setProgressState(false);
        }
    }, [])

    const TEXTFIELD_CONST = {
        EMAIL: "email",
        NAME: "name",
        PWD: "password",
        REPWD: "re-enter-password"
    }

    const checkValidity = (type, value)=>{
        switch (type) {
            case TEXTFIELD_CONST.EMAIL:
                if(value.length <= 0){
                    setHelperTextState({
                        ...helperTextState,
                        email: "Email ID cannot be empty"
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
            
            case TEXTFIELD_CONST.NAME:
                if(value.length < 4){
                    setFormValidState({
                        ...formValidState,
                        nameIsValid: false
                    })
                    setHelperTextState({
                        ...helperTextState,
                        name: "Username should be atleast 4 characters in length"
                    });
                } else {
                    setFormValidState({
                        ...formValidState,
                        nameIsValid: true
                    })
                    setHelperTextState({
                        ...helperTextState,
                        name: ""
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
            
            case TEXTFIELD_CONST.REPWD:
                if(value !== formState.password){
                    setFormValidState({
                        ...formValidState,
                        rePasswordIsValid: false
                    })
                    setHelperTextState({
                        ...helperTextState,
                        rePassword: "Passwords are NOT matching"
                    });
                } else {
                    setFormValidState({
                        ...formValidState,
                        rePasswordIsValid: true
                    })
                    setHelperTextState({
                        ...helperTextState,
                        rePassword: "Passwords are matching"
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

            case TEXTFIELD_CONST.NAME:
                setFormState({
                    ...formState,
                    name: value
                })
                break;
            
            case TEXTFIELD_CONST.PWD:
                setFormState({
                    ...formState,
                    password: value
                })
                break;

            case TEXTFIELD_CONST.REPWD:
                setFormState({
                    ...formState,
                    rePassword: value
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
        } else if(data.type === "name") {
            setFormValidState({
                ...formValidState,
                nameIsValid: false
            })
            setHelperTextState({
                ...helperTextState,
                name: data.message
            });
        } else if(data.type === "all") {
            setFormValidState({
                ...formValidState,
                passwordIsValid: false,
                emailIsValid: false,
                nameIsValid: false
            })
            setHelperTextState({
                ...helperTextState,
                password: data.message,
                email: data.message,
                name: data.message,
            });
        }       
        
    }

    const onSubmitHadler = ()=>{
        if(formState.email.length <= 0 && formState.password.length <= 0 && formState.name.length <= 0){
            setFormValidState({
                ...formValidState,
                nameIsValid: false,
                passwordIsValid: false,
                emailIsValid: false
            })
            setHelperTextState({
                ...helperTextState,
                password: "Password should be atleast 8 characters in length",
                email: "Email Address cannot be empty",
                name: "Username should be atleast 4 characters in length"
            });

        } else if (formValidState.emailIsValid && formValidState.passwordIsValid && formValidState.nameIsValid && formValidState.rePasswordIsValid){
            electronApi.firebaseAuthSigUp(formState.email, formState.password, formState.name, updateUserDataRedux);
            onSignInClick();
        }
        
    }

    const onSignInClick = ()=>{
        setProgressState(true);
    }

    return (
        <Box 
        className='SignUpCompClass'
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

                        value ={formState.email}
                        onChange={(e)=>{
                            onChangeHandler(TEXTFIELD_CONST.EMAIL, e.target.value)
                        }}
                        error = {!formValidState.emailIsValid}
                        helperText = {helperTextState.email}
                        
                        />
                </Grid>
                <Grid item lg={12}>
                <TextField
                        style = {{width: "90%"}}
                        id="outlined-required"
                        label="Enter User name"

                        value ={formState.name}
                        onChange={(e)=>{
                            onChangeHandler(TEXTFIELD_CONST.NAME, e.target.value)
                        }}
                        error = {!formValidState.nameIsValid}
                        helperText = {helperTextState.name}
                        
                        />
                </Grid>
                <Grid item lg ={12}>
                <TextField
                        style = {{width: "90%"}}
                        id="outlined-required"
                        label="Create Password"
                        type={'password'}

                        value ={formState.password}
                        onChange={(e)=>{
                            onChangeHandler(TEXTFIELD_CONST.PWD, e.target.value)
                        }}
                        error = {!formValidState.passwordIsValid}
                        helperText = {helperTextState.password}
                        />
                </Grid>
                <Grid item lg ={12}>
                <TextField
                        style = {{width: "90%"}}
                        id="outlined-required"
                        label="Re-enter Password"
                        type={'password'}

                        value ={formState.rePassword}
                        onChange={(e)=>{
                            onChangeHandler(TEXTFIELD_CONST.REPWD, e.target.value)
                        }}
                        error = {!formValidState.rePasswordIsValid}
                        helperText = {helperTextState.rePassword}
                        />
                </Grid>
                <Grid item lg ={9}>
                    <Button variant="contained" color='success' style = {{width: "90%", fontSize: "1.2em"}} onClick={()=>{onSubmitHadler()}}>
                        CREATE ACCOUNT
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
                <Grid item lg ={12}>
                    {
                        progressState ? <CircularProgress  color="success" style={{marginLeft: "40%"}}/> : ""
                    }                    
                </Grid>   
            </Grid>      
        </Box>
    )
}

export default SignUpComp;