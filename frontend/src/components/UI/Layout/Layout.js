import React from 'react';
import {Container, CssBaseline} from "@mui/material";
import AppToolbar from "../AppToolBar/AppToolBar";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Layout = ({children}) => {
    return (
        <>
            <ToastContainer toastStyle={{backgroundColor: "#dde6ff"}}/>
            <CssBaseline/>
            <AppToolbar/>
            <main>
                <Container maxWidth="100%" sx={{marginTop: '175px'}}>
                    {children}
                </Container>
            </main>
        </>
    );
};

export default Layout;