import React from 'react';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material';

const CustomAddButton = styled(Button)({
    width: "90%",
    height: "80%"
})

const AddEditProductDialog = ({callBack}) => {
    return (
        <>
            <Box
                component="form"
                sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
                backgroundColor: "#F0F0F0",
                width: "88vw",
                height: "40vh",
                position: "fixed",
                top: "4%",
                left: "8%",
                paddingLeft: "1%",
                paddingTop: "2%",

                display: "grid",
                gap: "10px 10px",
                gridTemplateColumns: "1fr 1fr",
                gridTemplateRows: "1fr 1fr 1fr 1fr",
                alignContent: "space-evenly",
                justifyContent: "space-around",

                borderRadius: "10px"
                }}
                noValidate
                autoComplete="off">
                <FormControl sx={{ m: 1, minWidth: 120, width: "90%"}}>
                    <InputLabel id="demo-simple-select-standard-label">Group</InputLabel>
                    <Select
                        style = {{height: "55%"}}
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        label="Group"
                        >
                        <MenuItem value={"Soap"}>Soap</MenuItem>
                        <MenuItem value={"Cream"}>Cream</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    style = {{width: "90%"}}
                    required
                    id="outlined-required"
                    label="Name"
                    defaultValue="Enter Name"
                    
                    />
                <TextField
                    style = {{width: "90%"}}
                    required
                    id="outlined-required"
                    label="Description"
                    defaultValue="Enter Description"
                    />
                <TextField
                    style = {{width: "90%"}}
                    id="outlined-number"
                    label="Number"
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    helperText="in Rupees"
                    />
                <TextField
                    style = {{width: "90%"}}
                    id="outlined-number"
                    label="In-Stock"
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    />
                <CustomAddButton variant="contained" color="success" onClick={()=>callBack()}>ADD PRODUCT</CustomAddButton>
                <IconButton aria-label="close" 
                    style= {{gridColumn: "span 2"}}
                    onClick={()=>callBack()}>
                    <CloseIcon sx={{ fontSize: 40 }} />
                </IconButton>
            </Box>
        </>
    )
}

const AddEditProductsComponent = ({btnFlag, callBack})=>{
    if(!btnFlag){
        return (
            <button onClick={()=>callBack()}>
                <span style={{display: "inline", fontSize:"2em"}}>+</span> &emsp; &emsp; <span style={{display: "inline", fontSize:"1.5em"}}>ADD PRODUCTS</span>
            </button>)
    } else {
        return(<AddEditProductDialog callBack={callBack} />)
    }
}

export default AddEditProductsComponent;