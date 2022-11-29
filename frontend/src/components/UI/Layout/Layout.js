import React from 'react';
import {CssBaseline} from "@mui/material";
import AppToolbar from "../AppToolBar/AppToolBar";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Footer from "../../NewShop/Footer/Footer";

const Layout = ({children}) => {
    return (
        <div className="wrapper">
            <ToastContainer toastStyle={{backgroundColor: "#dde6ff", color: '#000'}}/>
            <CssBaseline/>
            <AppToolbar/>
            <div className='main'>
                <div className="container">
                    {children}
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default Layout;