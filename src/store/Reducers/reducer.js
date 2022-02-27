import { combineReducers } from '@reduxjs/toolkit';
import productReducer from './productsReducer';

const rootReducer = combineReducers({
    products: productReducer
})

export default rootReducer;