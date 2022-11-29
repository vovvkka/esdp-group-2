import React from 'react';
import {Container, CssBaseline} from "@mui/material";
import AppToolbar from "../AppToolBar/AppToolBar";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {makeStyles} from "tss-react/mui";
import Footer from "../../NewShop/Footer/Footer";
import AppDrawer from "../../Drawer/Drawer";

const useStyles = makeStyles()(() => ({
    main: {
        minHeight: "60.8vh",
        display: "flex",
        flexDirection: "column"
    }
}));

const Layout = ({children}) => {
    const {classes} = useStyles();

    return (
        <div className="wrapper">
            <ToastContainer toastStyle={{backgroundColor: "#dde6ff", color: '#000'}}/>
            <CssBaseline/>
            <AppToolbar/>
            <main className={classes.main}>
                <Container maxWidth="100%">
                    {children}
                </Container>
            </main>
            <Footer/>
            <AppDrawer/>
        </div>
    );
};

export default Layout;