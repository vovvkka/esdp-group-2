import React from 'react';
import {Container, CssBaseline} from "@mui/material";
import AppToolbar from "../AppToolBar/AppToolBar";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {makeStyles} from "tss-react/mui";
import Footer from "../../Footer/Footer";
import AppDrawer from "../../Drawer/Drawer";

const useStyles = makeStyles()(theme => ({
    main: {
        minHeight: "56.2vh",
        display: "flex",
        flexDirection: "column"
    }
}));

const Layout = ({children}) => {
    const {classes} = useStyles();

    return (
        <>
            <ToastContainer toastStyle={{backgroundColor: "#dde6ff"}}/>
            <CssBaseline/>
            <AppToolbar/>
            <main className={classes.main}>
                <Container maxWidth="100%">
                    {children}
                </Container>
            </main>
            <Footer/>
            <AppDrawer/>
        </>
    );
};

export default Layout;