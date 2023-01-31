import React from 'react';
import {CssBaseline} from "@mui/material";
import AppToolbar from "../AppToolBar/AppToolBar";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Footer from "../../Footer/Footer";
import {useLocation} from "react-router-dom";

const Layout = ({children}) => {
    const location = useLocation();

    return (
        <div className="wrapper">
            <ToastContainer toastStyle={{backgroundColor: "#dde6ff", color: '#000', width: '510px'}}/>
            <CssBaseline/>
            <AppToolbar/>
            {location.pathname.includes('cashier') || location.pathname.includes('admin') ?
                <div style={{padding:'15px 0'}}>{children}</div> :
                <div className='main'>
                    <div className="container">
                        {children}
                    </div>
                </div>
            }
            <Footer/>
        </div>
    );
};

export default Layout;