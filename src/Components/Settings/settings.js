import { Avatar, Box, Button, Card, CardActions, CardContent, Divider, Typography, CircularProgress } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { FaSignOutAlt, FaEdit, FaLinkedin, FaGithubSquare } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import DevImage from "../../../assets/dev_image.jpg";

const aboutCard = (
    <>
        <CardContent sx={{
                display: "grid",
                gridTemplateColumns: "40% 1fr 1fr",
                gap: "50px"
            }}>
                <Box 
                    sx={{
                        display: "block"
                    }}>
                    <Typography sx={{ fontSize: 14, mb: 5 }} color="text.secondary" gutterBottom>
                        ABOUT
                    </Typography>               
                    <Typography  variant="h5" color="text.primary" component="div">
                        App Version
                    </Typography>
                    <Typography sx={{ mb: 5 }} variant="h6" component="div">
                        1.0
                    </Typography>
                    <Typography variant="h5" component="div">
                        Developed by
                    </Typography>
                    <Typography variant="h6" component="div">
                        Sharan Kumar
                    </Typography>
                </Box>
                <Divider variant='middle' orientation='vertical' flexItem/>
                <Box                
                    sx={{
                        display: "grid",
                        gridTemplateColumns: "0.3fr 0.7fr",
                        gridTemplateRows: "auto auto auto",
                        gap: "20px 20px",
                        marginTop: "10%"
                    }}>
                    <Avatar alt="Developer Image" src={DevImage} 
                        sx={{ 
                            width: 56, 
                            height: 56,
                            position: "absolute",
                            left: "87%" }}/>
                    <FaLinkedin style={{
                        width: 45,
                        height: 45,
                        gridRow: "1 / 1",
                        gridColumn: "1 / 1"
                    }}/>
                    <FaGithubSquare style={{
                        width: 45,
                        height: 45,
                        gridRow: "2 / 2",
                        gridColumn: "1 / 1"
                    }}/>
                    <MdEmail style={{
                        width: 45,
                        height: 45,
                        gridRow: "3 / 3",
                        gridColumn: "1 / 1"
                    }}/>
                    <Typography sx={{ display: "block", fontSize: 14, mb: 5, gridRow: "1 / 1", gridColumn: "2 / 2", marginTop: "10px" }} color="text.secondary" gutterBottom>
                        www.linkedin.com/sharan-kumars
                    </Typography>
                    <Typography sx={{ display: "block", fontSize: 14, mb: 5, gridRow: "2 / 2", gridColumn: "2 / 2", marginTop: "10px" }} color="text.secondary" gutterBottom>
                        www.github.com/SharanKumarCode
                    </Typography>
                    <Typography sx={{ display: "block", fontSize: 14, mb: 5, gridRow: "3 / 3", gridColumn: "2 / 2", marginTop: "10px" }} color="text.secondary" gutterBottom>
                        sharankumaraero@gmail.com
                    </Typography>
                </Box>                
                
            </CardContent>
    </>
)


export default function settings(){

    const userData = useSelector(state=>state.user.user);
    const dispatch = useDispatch();

    useEffect(()=>{
        console.log(userData);
        return ()=>{
            setProgressState(PROGRESS_CONST.DISABLE);
        }
    }, [])

    const PROGRESS_CONST = {
        DISABLE: "disable",
        ENABLE: "enable",
        ERROR: "error"
    }
    const [progressState, setProgressState] = useState(PROGRESS_CONST.DISABLE);

    const reduxCallback = (_, data)=>{
        setProgressState(PROGRESS_CONST.DISABLE);

        if (data=== "success"){
            dispatch({type: 'user/logoutUser', payload:null})
        } else {
            setProgressState(PROGRESS_CONST.ERROR);
        }
    }

    const signOutHandler = ()=>{
        onSignOutClick()
        electronApi.firebaseAuthSignOut(reduxCallback)
    }

    const onSignOutClick = ()=>{
        setProgressState(PROGRESS_CONST.ENABLE);
    }

    const profileCard = (
        <>
            <CardContent sx={{
                    display: "block",
                }}>
                    <Typography sx={{ fontSize: 14, mb: 5 }} color="text.secondary" gutterBottom>
                        PROFILE
                    </Typography>
                    <Typography  variant="h5" color="text.primary" component="div">
                        EMAIL
                    </Typography>
                    <Typography sx={{ mb: 5 }} variant="h6" component="div">
                        {userData.email}
                    </Typography>
                    <Typography variant="h5" component="div">
                        USERNAME
                    </Typography>
                    <Typography variant="h6" component="div">
                        {userData.name}
                    </Typography>
                </CardContent>
                <CardActions sx={{
                    display: "grid",
                    gridTemplateColumns: "1fr",
                    gridTemplateRows: "1fr 1fr"
                }}>
                    <Button sx={{
                        width: "85%",
                        background: "#233043"
                    }} variant='contained' size="medium" startIcon={<FaEdit 
                        style={{
                            position: "absolute",
                            top: "36%",
                            left: "10%",
                        }}
                        />}>                        
                            <Typography variant={"button"} style={{
                            position: "absolute",
                            top: "36%",
                            left: "26%",
                        }}>
                                Edit Username
                            </Typography>
                        </Button>
                    <Button sx={{
                        width: "79%",
                        color: "red",
                        background: "#F0F0F0"
                    }} variant='text' size="medium" startIcon={<FaSignOutAlt style={{
                        position: "absolute",
                        top: "36%",
                        left: "15%"
                    }} />}
                    onClick = {()=>{signOutHandler()}}
                    >SIGN-OUT</Button>
                </CardActions>
        </>
    )

    return (
        <>
        <Box sx={{ minWidth: 275 }}>
            <Card variant="outlined" sx={{ 
                position: "relative", 
                left: "8vw", 
                top: "4vh", 
                width: "40vw",
                
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gridTemplateRows: "auto",
                gap: "50px",
                background: "#F0F0F0"}}>
                {profileCard}
            </Card>

            <Card variant="outlined" sx={{ 
                position: "absolute", 
                left: "50vw", 
                top: "4vh", 
                width: "48vw",
                
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gridTemplateRows: "auto",
                gap: "50px",
                background: "#F0F0F0"}}>
                {aboutCard}
            </Card>
            {
                progressState===PROGRESS_CONST.ENABLE ? <CircularProgress  color="error" style={{marginLeft: "25%", marginTop: "15%"}}/> 
                                                      : progressState===PROGRESS_CONST.DISABLE ? null 
                                                      : <Typography component="div" variant="h8" style={{
                                                            position: "absolute",
                                                            top: "36%",
                                                            left: "15%",
                                                            color: "red",
                                                            textTransform: "unset"
                                                        }}>Something went wrong.. Please try again later</Typography>
            }                
        </Box>                   
        </>
    )
}