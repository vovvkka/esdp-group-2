import React from 'react';
import {Container, CssBaseline} from "@mui/material";
import AppToolbar from "../AppToolBar/AppToolBar";

const Layout = ({children}) => {
    return (
        <>
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