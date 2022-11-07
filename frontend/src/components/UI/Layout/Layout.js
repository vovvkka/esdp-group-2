import React from 'react';
import {AppBar, Container, Grid, Toolbar, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import Admin from './Menu/Admin';

const Layout = ({children}) => {
    const user = useSelector(state => state.users.user);

    return (
        <>
            <AppBar sx={{padding: '10px 15px'}}>
                <Container>
                    <Grid
                        container
                        justifyContent='space-between'
                        alignItems='center'
                    >
                        <Grid item sx={{marginBottom: {sm: '0px', xs: '15px'}}}>
                            <Typography
                                component={Link}
                                to='/'
                                sx={{textDecoration: 'none', color: '#fff'}}
                                variant='h4'
                            >
                                Tai-Tai
                            </Typography>
                        </Grid>
                        <Grid item>
                            {user ? <Admin user={user}/> : null}
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
