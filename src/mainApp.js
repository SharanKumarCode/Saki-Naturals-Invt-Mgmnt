import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import HomePage from './Homepage/homepage';
import MainPage from "./MainPage/mainpage";

export default function MainApp(){

    const userData = useSelector(state=>state.user.user);
    const dispatch = useDispatch()

    useEffect(()=>{
            electronApi.firebaseAuthGetCurrentUser(data=>{
            if(data.id){
                console.log("user signed in")
                dispatch({type: 'user/loginUser', payload: data})
            } else {
                console.log("user Not signed in")
                dispatch({type: 'user/logoutUser', payload: null})
            }
        })
    }, []);    

    return (
        <>
            {userData.id === null ? <HomePage /> : <MainPage />}
        </>
    )
}