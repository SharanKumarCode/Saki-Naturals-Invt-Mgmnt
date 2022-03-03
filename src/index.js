import React from 'react';
import reactDom from 'react-dom';
import { Provider } from 'react-redux';
import store from './store/store';

import MainApp from './mainApp';

reactDom.render(
    <Provider store={store}>
        <MainApp />
    </Provider>, 
    document.getElementById('root'))