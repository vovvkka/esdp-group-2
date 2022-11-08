import React from 'react';
import {Container, CssBaseline} from "@mui/material";
import AppToolbar from "../AppToolBar/AppToolBar";

const Layout = ({children}) => {
    return (
        <>
            <CssBaseline/>
            <AppToolbar/>
            <main>
                <Container maxWidth="xl" sx={{marginTop: '70px'}}>
                    {children}
                </Container>
            </main>
        </>
    );
};

export default Layout;