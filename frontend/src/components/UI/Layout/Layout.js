import React from 'react';
import {CssBaseline} from "@mui/material";
import AppToolbar from "../AppToolBar/AppToolBar";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Footer from "../../NewShop/Footer/Footer";
import {useLocation} from "react-router-dom";

const Layout = ({children}) => {
    const location = useLocation();

    return (
        <div className="wrapper">
            <ToastContainer toastStyle={{backgroundColor: "#dde6ff", color: '#000'}}/>
            <CssBaseline/>
            <AppToolbar/>
            <div className='main'>
                {location.pathname.includes('cashier') || location.pathname.includes('admin') ?
                        children :
                    <div className="container">
                        {children}
                    </div>
                }
            </div>
            <Footer/>
        </div>
    );
};

export default Layout;