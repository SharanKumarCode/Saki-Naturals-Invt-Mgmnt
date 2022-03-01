import React , { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';

import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material';

import { useSelector, useDispatch } from 'react-redux';

import './update.scss';

export default function update(){

    const getTodayDate = ()=>{
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = today.getFullYear();

        return yyyy + '-' + mm + '-' + dd;
    }

    const [date, setDate] = useState(getTodayDate);

    const onChangeDateHandler = (e)=>{
        console.log(e.target.value);
        setDate(e.target.value)
    }
    console.log("Update");

    return (
        <>
        <Box sx={{ flexGrow: 1 }}>
           <Grid container rowSpacing={1} columnSpacing={1} sx={{background: "#F0F0F0", borderRadius: "5px", height: "60vh", paddingLeft: "1%", width: "92vw"}}>
               <Grid item xs={8} sm={12}>
                   <div style={{display: "inline", fontSize: "1.5em", position: "relative", left: "40%", top: "5%", color: "#233043", fontFamily: "Righteous"}}>PRODUCTION UPDATE</div>
               </Grid>
                <Grid item xs={8} sm={12}>
                <FormControl variant="filled" sx={{ m: 1, minWidth: 120, width: "95%"}}>
                    <InputLabel id="demo-simple-select-label">Select Product</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={"Soap"}
                        label="Product"
                    >
                        <MenuItem value={"Soap"}>Soap</MenuItem>
                        <MenuItem value={"Cream"}>Cream</MenuItem>
                    </Select>
                </FormControl>
                </Grid>
                <Grid item xs={4}>
                <TextField
                    style = {{width: "90%"}}
                    disabled
                    id="outlined"
                    label="Product ID"                    
                    />
                </Grid>
                <Grid item xs={4}>
                <TextField
                    style = {{width: "90%"}}
                    disabled
                    id="outlined"
                    label="Group"                    
                    />
                </Grid>
                <Grid item xs={4}>
                <TextField
                    style = {{width: "90%"}}
                    disabled
                    id="outlined"
                    label="Name"                  
                    />
                </Grid>
                <Grid item xs={4} sm={9}>
                <TextField
                    style = {{width: "95%"}}
                    disabled
                    id="outlined"
                    label="Description"                    
                    />
                </Grid>
                <Grid item xs={4} sm={3}>
                <TextField
                    style = {{width: "85%"}}
                    disabled
                    id="outlined"
                    label="Current In-Stock"
                    />
                </Grid>
                <Grid item xs={4} sm={4}>
                <TextField
                    style = {{width: "90%"}}
                    id="outlined-number"
                    label="Date"
                    type="date"
                    value={date}
                    onChange={onChangeDateHandler}
                    InputLabelProps={{
                        shrink: true,
                    }}               
                    />              
                </Grid>
                <Grid item xs={4} sm={4}>
                <TextField
                    style = {{width: "90%"}}
                    id="outlined-number"
                    label="Time"
                    type="time"
                    InputLabelProps={{
                        shrink: true,
                    }}               
                    />              
                </Grid>
                <Grid item xs={4} sm={4}>
                <TextField
                    style = {{width: "90%"}}
                    id="outlined-number"
                    label="Produced"
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}                   
                    />
                </Grid>
                <Grid item xs={4} sm={9}>
                    <Button style = {{width: "100%", fontSize: "1.2em"}} variant="contained">UPDATE</Button>
                </Grid>
                <Grid item xs={4} sm={3}>
                    <Button style = {{width: "100%", color: "red", fontSize: "1.5em"}} variant="text">RESET</Button>
                </Grid>
            </Grid>
        </Box>
        
        </>
    )
}