import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './Reducers/productsSlicer';

export default configureStore({
    reducer: {
        products: productsReducer
    },
})
