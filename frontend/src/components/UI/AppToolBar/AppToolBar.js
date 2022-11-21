import React, {useEffect, useState} from 'react';
import {Link, useLocation} from "react-router-dom";
import {makeStyles} from "tss-react/mui";
import {AppBar, Box, Container, Grid, Toolbar, Typography} from "@mui/material";
import {useSelector} from "react-redux";
import AdminOrCashierMenu from "./Menu/AdminOrCashierMenu";
import logo from '../../../assets/logo.png';
import Appbar from "../ShopToolbar/ShopToolbar";

const useStyles = makeStyles()(theme => ({
    mainLink: {
        color: 'inherit',
        textDecoration: 'none',
        fontWeight: 'bold',
        '&:hover': {
            color: 'inherit',
        },
        fontSize: '30px'
    },
    staticToolbar: {
        marginBottom: theme.spacing(6),
    },
    toolbar: {
        backgroundColor: `${theme.palette.grey["600"]} !important`,
        padding: '10px 0'
    }
}));

const AppToolbar = () => {
    const user = useSelector(state => state.users.user);
    const {classes} = useStyles();

    const location = useLocation();
    const [isUser, setIsUser] = useState(true);


    useEffect(() => {
        if (location.pathname.includes('admin') || location.pathname.includes('cashier')) {
            setIsUser(false);
        } else {
            setIsUser(true);
        }
    }, [location.pathname]);

    if (!isUser) {
        return (
            <>
                <AppBar position="fixed" className={classes.toolbar}>
                    <Container>
                        <Toolbar>
                            <Grid container justifyContent="space-between" alignItems="center">
                                <Typography variant="h6">
                                    <Link to="/" className={classes.mainLink}>
                                        <Box
                                            component="img"
                                            sx={{
                                                height: 'auto',
                                                width: 100,
                                            }}
                                            alt="Tay Tay logo"
                                            src={logo}
                                        />
                                    </Link>
                                </Typography>

                                <AdminOrCashierMenu user={user}/>
                            </Grid>
                        </Toolbar>
                    </Container>
                </AppBar>
                <Toolbar className={classes.staticToolbar} sx={{marginBottom: '90px'}}/>
            </>
        );
    }

    if (isUser) {
        return (
            <>
                <Appbar/>
            </>
        );
    }
};

export default AppToolbar;