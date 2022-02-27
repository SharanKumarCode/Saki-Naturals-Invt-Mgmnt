import { createStore } from '@reduxjs/toolkit';
import productsReducer from './Reducers/productsReducer';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import rootReducer from './Reducers/reducer';

// const composeEnhancers = composeWithDevTools({})
// export default createStore({
//     reducer: {
//         products: productsReducer
//     },
//     enhancers: composeEnhancers,
//     preloadedState: undefined,
// devTools: true})

const store = createStore(rootReducer);
export default store;