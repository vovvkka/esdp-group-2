import React, {useEffect, useState} from 'react';
import {Link, useLocation} from "react-router-dom";
import {makeStyles} from "tss-react/mui";
import {AppBar, Box, Button, Container, Grid, Toolbar, Typography} from "@mui/material";
import {useSelector} from "react-redux";
import UserMenu from "./Menu/UserMenu";
import logo from '../../../assets/logo.png';

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
        backgroundColor: `${theme.palette.grey["700"]} !important`,
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

    if (isUser) {
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
                                                width: 130,
                                            }}
                                            alt="Tay Tay logo"
                                            src={logo}
                                        />
                                    </Link>
                                </Typography>

                                {
                                    user?.role === 'admin' || user?.role === 'cashier' ?
                                        <Button component={Link} to={'/' + user?.role} variant="contained">
                                            Войти в личный кабинет
                                        </Button> : null
                                }

                            </Grid>
                        </Toolbar>
                    </Container>
                </AppBar>
                <Toolbar className={classes.staticToolbar}/>
            </>
        );
    } else {
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
                                                width: 130,
                                            }}
                                            alt="Tay Tay logo"
                                            src={logo}
                                        />
                                    </Link>
                                </Typography>

                                <UserMenu user={user}/>
                            </Grid>
                        </Toolbar>
                    </Container>
                </AppBar>
                <Toolbar className={classes.staticToolbar}/>
            </>

        )
    }


};

export default AppToolbar;