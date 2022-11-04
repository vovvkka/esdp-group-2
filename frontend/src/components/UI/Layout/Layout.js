import React from 'react';
import {AppBar, Container, Grid, Toolbar} from "@mui/material";

const Layout = ({children}) => {
    return (
        <>
            <AppBar sx={{padding: '10px 15px'}}>
                <Container>
                    <Grid
                        container
                        justifyContent='space-between'
                        alignItems='center'
                    >
                        <Grid item>
                            Tai-Tai
                        </Grid>
                    </Grid>
                </Container>
            </AppBar>
            <Toolbar sx={{marginBottom: '50px'}}/>
            <Container maxWidth="xl">
                {children}
            </Container>
        </>
    );
};

export default Layout;