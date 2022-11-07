import React from 'react';
import {Container, CssBaseline} from "@mui/material";
import AdminAppToolbar from "../AdminAppToolBar/AdminAppToolBar";

const Layout = ({children}) => {
    return (
        <>
            <CssBaseline/>
            <AdminAppToolbar/>
            <main>
                <Container maxWidth="xl">
                    {children}
                </Container>
            </main>
        </>
    );
};

export default Layout;