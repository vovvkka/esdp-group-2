import React from 'react';
import {Link} from "react-router-dom";
import {makeStyles} from "tss-react/mui";
import {AppBar, Button, Container, Grid, Toolbar, Typography} from "@mui/material";
import {useDispatch} from "react-redux";
import AdminMenu from "./Menu/AdminMenu";
import {logoutUser} from "../../../store/actions/usersActions";

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
        padding: '20px 0'
    }
}));

const AppToolbar = () => {
    const dispatch = useDispatch();
    const {classes} = useStyles();

    return (
        <>
            <AppBar position="fixed" className={classes.toolbar}>
                <Container>
                    <Toolbar>
                        <Grid container justifyContent="space-between" alignItems="center">
                            <Typography variant="h6">
                                <Link to="/" className={classes.mainLink}>
                                    Tai-Tai
                                </Link>
                            </Typography>

                            <Grid item display="flex" alignItems="center">
                                <AdminMenu/>
                                <Button color="inherit" sx={{marginRight: '5px'}}>Журнал</Button>
                                <Button color="inherit">Заказы</Button>
                            </Grid>

                            <Grid item display="flex" flexDirection="column">
                                <Typography sx={{textTransform: 'UpperCase'}}>Администратор</Typography>
                                <Button onClick={() => dispatch(logoutUser())} color="primary" variant="contained" sx={{marginTop: '5px'}}>
                                    Выйти
                                </Button>
                            </Grid>

                        </Grid>
                    </Toolbar>
                </Container>
            </AppBar>
            <Toolbar className={classes.staticToolbar}/>
        </>
    );
};

export default AppToolbar;