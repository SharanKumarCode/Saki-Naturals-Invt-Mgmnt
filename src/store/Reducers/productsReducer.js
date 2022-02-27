const initialState = {
    products: [
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
}

// const productReducer = createSlice({
//     name: "products",
//     initialState,
//     reducers: {
//         addProducts(state, action){
//             console.log(action);
//             // state.push(action.payload)
//             state.push({
//                 productID: 659843,
//                 group: "Cream",
//                 name: "Honey",
//                 description: "Honey Flavoured Hair Cream 5ml",
//                 price: 30,
//                 instock: 100,
//                 image: "../../../assets/Products/hair_cream.jpg"
//             })
//         },
//         removeProducts(state, action){
//             state.filter((s)=>{
//                 return s.productID !== action.payload
//             })
//         },
//         updateProducts(state, action){
//             state.filter((s)=>{
//                 return s.productID !== action.payload.productID
//             })
//             state.push(action.payload)
//         }
//     }
// })

const productsReducer = (state = initialState, action)=>{
    switch (action.type) {
        case 'product/addProduct': {
            return {
              ...state,
              products: [...state.products, action.payload]  
            }
        }

        case 'product/removeProduct':{
            const temp = state.products.filter((s)=>{
                return s.productID !== action.payload
            })
            return {
                ...state,
                products: [...temp]
            }
        }

        case 'product/updateProduct':{
            let temp_prod = state.products.filter((s)=>{
                return s.productID !== action.payload.productID
            })

            temp_prod.push(action.payload)

            return {
                ...state,
                products: [...temp_prod]
            }
        }
    
        default:
            return state;
    }
}

export default productsReducer;

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