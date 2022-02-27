import React, { useState } from 'react';
import { Link } from "react-router-dom";
import "./navbar.scss";

import store from '../store/store';

 import { MdDashboard, MdPointOfSale, MdSettings } from "react-icons/md";
 import { BiRupee } from "react-icons/bi";
 import { FaBox } from "react-icons/fa";

 const COLORS = {
    MainBg: "#233043",
    ForeBg: "#f0f0f0"
}

const ICONSTYPE = {
    SALES: "Sales",
    PRODUCTS: "Products",
    DASHBOARD: "Dashboard",
    BILLS: "Bills",
    SETTINGS: "Settings"
}

 let iconColor = {
     SalesIconColor: COLORS.MainBg,
     ProductsIconColor: COLORS.MainBg,
     DashboardIconColor: COLORS.MainBg,
     BillsIconColor: COLORS.MainBg,
     SettingsIconColor: COLORS.MainBg,
 }

export default function navbar(){

    const [colorState, setColorState] = useState(iconColor);

    const onHoverHandler = (icontype)=>{
        switch (icontype) {
            case ICONSTYPE.SALES:
                setColorState({...iconColor, SalesIconColor:COLORS.ForeBg})
                break;

            case ICONSTYPE.PRODUCTS:
                setColorState({...iconColor, ProductsIconColor:COLORS.ForeBg})
                break;
            
            case ICONSTYPE.DASHBOARD:
                setColorState({...iconColor, DashboardIconColor:COLORS.ForeBg})
                break;

            case ICONSTYPE.BILLS:
                setColorState({...iconColor, BillsIconColor:COLORS.ForeBg})
                break;
        
            case ICONSTYPE.SETTINGS:
                setColorState({...iconColor, SettingsIconColor:COLORS.ForeBg})
                break;

            case "Leave":
                setColorState({...iconColor,
                    SalesIconColor: COLORS.MainBg,
                    ProductsIconColor: COLORS.MainBg,
                    DashboardIconColor: COLORS.MainBg,
                    BillsIconColor: COLORS.MainBg,
                    SettingsIconColor: COLORS.MainBg,
                })
                break;
        
            default:                
                break;
        }
    }

    return (
        <ul id='navBarContainer'>
                <li>
                    <Link to = "/Sales" style={{textDecoration: "none"}}>
                        <div className='nav-item'
                            onMouseEnter={()=>{onHoverHandler(ICONSTYPE.SALES)}} 
                            onMouseLeave={()=>{onHoverHandler("Leave")}}>
                                <MdPointOfSale size={"4.5em"} color={colorState.SalesIconColor}/>
                                <span style={{"color":colorState.SalesIconColor}}>SALES</span>
                        </div>
                    </Link>
                </li>
                <li>
                    <Link to = "/Products" style={{textDecoration: "none"}}>
                    <div className='nav-item' 
                            onMouseEnter={()=>{onHoverHandler(ICONSTYPE.PRODUCTS)}} 
                            onMouseLeave={()=>{onHoverHandler("Leave")}}>
                                <FaBox size={"4.5em"} color={colorState.ProductsIconColor}/>
                                <span style={{"color":colorState.ProductsIconColor}}>PRODUCTS</span>
                        </div>
                    </Link>
                </li>
                <li>
                    <Link to = "/" style={{textDecoration: "none"}}>
                    <div className='nav-item' 
                            onMouseEnter={()=>{onHoverHandler(ICONSTYPE.DASHBOARD)}} 
                            onMouseLeave={()=>{onHoverHandler("Leave")}}>
                                <MdDashboard size={"4.5em"} color={colorState.DashboardIconColor}/>
                                <span style={{"color":colorState.DashboardIconColor}}>DASHBOARD</span>
                        </div>
                    </Link>
                </li>
                <li>
                    <Link to = "/Bills" style={{textDecoration: "none"}}>
                    <div className='nav-item' 
                            onMouseEnter={()=>{onHoverHandler(ICONSTYPE.BILLS)}} 
                            onMouseLeave={()=>{onHoverHandler("Leave")}}>
                                <BiRupee size={"4.5em"} color={colorState.BillsIconColor}/>
                                <span style={{"color":colorState.BillsIconColor}}>BILLS</span>
                        </div>
                    </Link>
                </li>
                <li>
                    <Link to = "/Settings" style={{textDecoration: "none"}}>
                    <div className='nav-item' 
                            onMouseEnter={()=>{onHoverHandler(ICONSTYPE.SETTINGS)}} 
                            onMouseLeave={()=>{onHoverHandler("Leave")}}>
                                <MdSettings size={"4.5em"} color={colorState.SettingsIconColor}/>
                                <span style={{"color":colorState.SettingsIconColor}}>SETTINGS</span>
                        </div>
                    </Link>
                </li>
            </ul>
    )
}