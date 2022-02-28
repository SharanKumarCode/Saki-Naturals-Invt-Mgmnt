import React , { useState } from 'react';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material';

import './addEditProductsComponent.scss';
import { useSelector, useDispatch } from 'react-redux';

const CustomAddButton = styled(Button)({
    width: "90%",
    height: "70%"
})

const AddEditProductDialog = ({callBack}) => {
    const [formState, setFormState] = useState({
        productID: null,
        group: "Soap",
        name: "",
        description: "",
        price: 0,
        instock: 0,
    })

    const [isFormValid, setIsFormValid] = useState({
        isNameValid: true,
        isDescriptionValid: true,
        isPriceValid: true,
        isInStockValid: true
    })

    const [btnState, setBtnState] = useState(true)

    const productsData = useSelector(state=>state.products.products);
    const dispatch = useDispatch();

    const generateRandomProductID = ()=>{
        let randomID = Math.floor(Math.floor(Math.random() * (999999 - 111111) + 111111));
        const temp = productsData.filter(e=>{
            return e.productID == randomID
        })
        if(temp.length > 0){
            generateRandomProductID()
        } else {
            return randomID;
        }
    }

    const checkFormValidity = (type, value)=>{
        switch (type) {
            case "name":
                if(value.length <= 3){
                    setIsFormValid({
                    ...isFormValid,
                    isNameValid: false
                    })
                } else {
                    setIsFormValid({
                        ...isFormValid,
                        isNameValid: true
                    })
                }
                break;
        
            case "description":
                if(value.length <= 3){
                    setIsFormValid({
                        ...isFormValid,
                        isDescriptionValid: false
                    })
                } else {
                    setIsFormValid({
                        ...isFormValid,
                        isDescriptionValid: true
                        })
                }
                break;
            
            
            case "price":
                if(value <= 0){
                    setIsFormValid({
                        ...isFormValid,
                        isPriceValid: false
                    })
                } else {
                    setIsFormValid({
                        ...isFormValid,
                        isPriceValid: true
                        })
                }
                break;

            case "instock":
                if(value < 0){
                    setIsFormValid({
                        ...isFormValid,
                        isInStockValid: false
                    })
                } else {
                    setIsFormValid({
                        ...isFormValid,
                        isInStockValid: true
                        })
                }
                break;
            default:
                break;
        }
    }

    const handleFormChange = (event, type)=>{
        checkFormValidity(type, event.target.value)
        switch (type) {
            case "group":
                setFormState({
                    ...formState,
                    group: event.target.value
                })
                break;
            
            case "name":
                setFormState({
                    ...formState,
                    name: event.target.value
                })
                break;
        
            case "description":
                setFormState({
                    ...formState,
                    description: event.target.value
                })
                break;
            
            case "price":
                setFormState({
                    ...formState,
                    price: parseInt(event.target.value)
                })
                break;
            
            case "instock":
                setFormState({
                    ...formState,
                    instock: parseInt(event.target.value)
                })
                break;

            default:
                break;
        }
    }

    const addProductsToRedux = (_, data) => {
        console.log("recv data");
        console.log(data);
        dispatch({type:"product/addProduct", payload:data});        
        console.log("productsData");
        console.log(productsData);
    }

    const onSubmitHandler = ()=>{
        
        if((formState.name !== "") && (formState.description !== "") && (formState.price > 0) && (formState.instock >= 0)){

            let randomProdID = generateRandomProductID();
            const productData = {
                ...formState,
                productID: randomProdID
            }

            console.log("All data Valid");
            console.log(productData)

            electronApi.addProductToFirestore(productData, addProductsToRedux);
        } else {
            setIsFormValid({
                isNameValid: !(formState.name === ""),
                isDescriptionValid: !(formState.description === ""),
                isPriceValid: (formState.price > 0),
                isInStockValid: (formState.instock >= 0)
            })
        }
    }

    return (
        <>
            <Box
                className={btnState ? "addEditProductDialog-in" : "addEditProductDialog-out"}
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
                        value={formState.group}
                        onChange={(e)=>handleFormChange(e, "group")}
                        style = {{height: "70%"}}
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
                    value={formState.name}
                    onChange={(e)=>handleFormChange(e, "name")}
                    id="outlined-required"
                    label="Name"
                    error={!isFormValid.isNameValid}
                    helperText={isFormValid.isNameValid ? "": "Name must be atleast 4 characters long"}
                    
                    />
                <TextField
                    style = {{width: "90%"}}
                    value={formState.description}
                    onChange={(e)=>handleFormChange(e, "description")}
                    id="outlined-required"
                    label="Description"

                    error={!isFormValid.isDescriptionValid}
                    helperText={isFormValid.isDescriptionValid ? "": "Description must be atleast 4 characters long"}
                    />
                <TextField
                    style = {{width: "90%"}}
                    value={formState.price}
                    onChange={(e)=>handleFormChange(e, "price")}
                    id="outlined-number"
                    label="Net Price"
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    InputProps={{
                        startAdornment: <InputAdornment position="start">&#8377;</InputAdornment>,
                    }}
                    error={!isFormValid.isPriceValid}
                    helperText={isFormValid.isPriceValid ? "": "Price must not be 0"}
                    />
                <TextField
                    style = {{width: "90%"}}
                    value={formState.instock}
                    onChange={(e)=>handleFormChange(e, "instock")}
                    id="outlined-number"
                    label="In-Stock"
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}

                    error={!isFormValid.isInStockValid}
                    helperText={isFormValid.isInStockValid ? "": "Stock must not be less than 0"}                    
                    />
                <CustomAddButton variant="contained" color="success" onClick={()=>{
                    //callBack()
                    onSubmitHandler()
                    }}>ADD PRODUCT</CustomAddButton>
                
                <IconButton aria-label="close" 
                    style= {{gridColumn: "span 2"}}
                    onClick={()=>{
                        setBtnState(false);
                        setTimeout(() => {
                            callBack()
                        }, 300);
                        }}>
                    <CloseIcon sx={{ fontSize: 40 }} />
                </IconButton>
            </Box>
        </>
    )
}

const AddEditProductsComponent = ({btnFlag, callBack})=>{

    if(!btnFlag){
        return (
            <button onClick={()=>{
                callBack()
                }}>
                <span style={{display: "inline", fontSize:"2em"}}>+</span> &emsp; &emsp; <span style={{display: "inline", fontSize:"1.5em"}}>ADD PRODUCTS</span>
            </button>)
    } else {
        return(
            <AddEditProductDialog callBack={callBack}/>
        )
    }
}

export default AddEditProductsComponent;