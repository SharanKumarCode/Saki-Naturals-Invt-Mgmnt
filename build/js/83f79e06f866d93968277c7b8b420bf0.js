import React from 'react';
import reactDom from 'react-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import HomePage from './Homepage/homepage';
import MainPage from "./MainPage/mainpage";
reactDom.render( /*#__PURE__*/React.createElement(Provider, {
  store: store
}, /*#__PURE__*/React.createElement(MainPage, null)), document.getElementById('root'));