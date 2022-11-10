import React from 'react';
import {Link} from "react-router-dom";
import {makeStyles} from "tss-react/mui";
import {AppBar, Box, Container, Grid, Toolbar, Typography} from "@mui/material";
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

                            {user ? <UserMenu user={user} />: null}
                        </Grid>
                    </Toolbar>
                </Container>
            </AppBar>
            <Toolbar className={classes.staticToolbar}/>
        </>
    );
};

export default AppToolbar;