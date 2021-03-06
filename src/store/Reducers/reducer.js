import { combineReducers } from '@reduxjs/toolkit';
import productReducer from './productsReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
    products: productReducer,
    user: userReducer
})

export default rootReducer;