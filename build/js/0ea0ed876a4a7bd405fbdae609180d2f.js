import React from 'react';
import reactDom from 'react-dom';
import { Provider } from 'react-redux';
import store from './store/store';

import HomePage from './Homepage/homepage';
import MainPage from "./MainPage/mainpage";

reactDom.render(
    <Provider store={store}>
        <MainPage />
    </Provider>, 
    document.getElementById('root'))