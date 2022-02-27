import { createSlice } from '@reduxjs/toolkit' 

const initialState = [
    {
        productID: 101254,
        group: "Soap",
        name: "Rose",
        description: "Rose flavour 5'' x 6'' x 2''",
        price: 30,
        instock: 100,
        image: "/assets/Products/soap_1.jpg"
    },
    {
        productID: 451284,
        group: "Soap",
        name: "Sandoor",
        description: "Sandoor flavour 6'' x 7'' x 3''",
        price: 30,
        instock: 100,
        image: "../../../assets/Products/soap_2.jpg"
    }
]

const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        addProducts(state, action){
            state.push(action.payload)
        },
        removeProducts(state, action){
            state.filter((s)=>{
                return s.productID !== action.payload
            })
        },
        updateProducts(state, action){
            state.filter((s)=>{
                return s.productID !== action.payload.productID
            })
            state.push(action.payload)
        }
    }
})

export const { addProducts, removeProducts, updateProducts } = productSlice.actions;

export default productSlice.reducer;

    // {
    //     productID: 451284,
    //     group: "Soap",
    //     name: "Sandoor",
    //     description: "Sandoor flavour 6'' x 7'' x 3''",
    //     price: 30,
    //     instock: 100,
    //     image: "../../../assets/Products/soap_2.jpg"
    // },
    // {
    //     productID: 659843,
    //     group: "Cream",
    //     name: "Honey",
    //     description: "Honey Flavoured Hair Cream 5ml",
    //     price: 30,
    //     instock: 100,
    //     image: "../../../assets/Products/hair_cream.jpg"
    // },