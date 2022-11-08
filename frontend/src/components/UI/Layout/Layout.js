import React from 'react';
import {Container, CssBaseline} from "@mui/material";
import AdminAppToolbar from "../AdminAppToolBar/AdminAppToolBar";

const Layout = ({children}) => {
    return (
        <>
            <CssBaseline/>
            <AdminAppToolbar/>
            <main>
                <Container maxWidth="xl" sx={{marginTop: '70px'}}>
                    {children}
                </Container>
            </main>
        </>
    );
};

export default Layout;