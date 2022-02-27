const initialState = {
    products: []
}

const productsReducer = (state = initialState, action)=>{
    switch (action.type) {
        case 'product/addProduct': {
            if(action.payload.length){
                const temp = []
                action.payload.forEach(d => {
                    if(!state.products.some(e=>{
                        return e.productID === d.productID
                        })
                    ){
                        temp.push(d)                
                    }            
                });
                return {
                    ...state,
                    products: [...state.products, ...temp]  
                  }
            }else{
                if(!state.products.some(e=>{
                    return e.productID === action.payload.productID
                    })
                ){
                    return {
                        ...state,
                        products: [...state.products, action.payload]  
                      }               
                }                
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

