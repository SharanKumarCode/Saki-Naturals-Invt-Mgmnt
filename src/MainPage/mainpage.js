import React, { useState } from 'react';
import {HashRouter as Router, Route, Routes} from 'react-router-dom';
import Navbar from '../NavBar/navbar';
import Dashboard from '../Components/Dashboard/dashboard';
import Sales from '../Components/Sales/sales';
import Products from '../Components/Products/products';
import Production from '../Components/Production/production';
import Bills from '../Components/Bills/bills';
import Settings from '../Components/Settings/settings';

import "./mainpage.scss";


export default function Mainpage(){

    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path='/' element={<Dashboard />} />
                <Route path='/Sales' element={<Sales/>} />
                <Route path='/Products' element={<Products/>} />
                <Route path='/Production' element={<Production/>} />
                <Route path='/Bills' element={<Bills/>} />
                <Route path='/Settings' element={<Settings/>} />
            </Routes>
        </Router>
    )
}