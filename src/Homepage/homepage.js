import React, { useState } from 'react';
import "./homepage.scss";


export default function HomePage(){

    const [recvData, setRecvData] = useState("No data received");

    return (
        <>
            <div id='homepageContainer'>
                <div className='homepageButtons'><img style={{"width": "10vw"}} src="E:\Electron\Saki_Naturals\assets\Sales.png" alt='Sales image'/><span>Sales</span></div>
                <div className='homepageButtons' style={{"margin-top": "5%"}}><img style={{"width": "11vw"}} src="E:\Electron\Saki_Naturals\assets\Products.png" alt='Products image'/><span>Products</span></div>
                <div className='homepageButtons' style={{"margin-top": "10%"}}><img style={{"width": "11vw"}} src="E:\Electron\Saki_Naturals\assets\Dashboard.png" alt='Dashboard image'/><span>Dashboard</span></div>
                <div className='homepageButtons' style={{"margin-top": "5%"}}><img style={{"width": "10vw"}} src="E:\Electron\Saki_Naturals\assets\Bills.png" alt='Bills image'/><span>Bills</span></div>
                <div className='homepageButtons'><img style={{"width": "10vw"}} src="E:\Electron\Saki_Naturals\assets\Settings.png" alt='Settings image'/><span>Settings</span></div>
            </div>
        </>
    )
}