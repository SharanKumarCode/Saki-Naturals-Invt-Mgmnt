const initialState = {
    user: {
        id: null,
        name: null,
        email: null
    }
}

const userReducer = (state = initialState, action)=>{
    switch (action.type) {
        case 'user/loginUser': {
            return {
                ...state,
                user: {
                    id: action.payload.id,
                    name: action.payload.name,
                    email: action.payload.email
                    }
            }            
        }

        case 'user/logoutUser': {
            return {
                ...state,
                user: {
                    id: null,
                    name: null,
                    email: null
                }
            }
            
        }
    
        default:
            return state;
    }
}

export default userReducer;

