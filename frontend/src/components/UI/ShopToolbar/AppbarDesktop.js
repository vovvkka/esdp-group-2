import {
    alpha,
    AppBar,
    Box,
    Container,
    Grid,
    InputBase,
    ListItemButton,
    ListItemText,
    styled,
    Toolbar,
    Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Actions from "./Actions";
import logo from "../../../assets/logo.png";
import {Link} from "react-router-dom";
import React from "react";
import {makeStyles} from "tss-react/mui";

const Search = styled('div')(({theme}) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',

}));

const SearchIconWrapper = styled('div')(({theme}) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({theme}) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
    },
}));

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
        backgroundColor: `#fff !important`,
        padding: '10px 0',
        boxShadow: "0px 5px 15px -5px gray !important",
    },
    buttonLink: {
        color: '#000 !important',
        textTransform: 'none !important',
        fontWeight: 'normal !important',
        fontSize: '16px !important',
        textAlign: 'left !important',
        '&:last-child': {
            marginRight: '0 !important'
        },
        '&:hover': {
            color: '#147E2EFF !important',
        },
    }
}));

const AppbarDesktop = ({matches}) => {
    const {classes} = useStyles();

    return (
        <>
            <AppBar position="fixed" className={classes.toolbar}>
                <Container sx={{maxWidth: '95% !important'}}>
                    <Toolbar>
                        <Grid container display="flex" justifyContent="space-between" alignItems="center">
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

                            <Grid item display="flex" alignItems="center">
                                <ListItemButton component={Link} to='/' className={classes.buttonLink}>
                                    <ListItemText primary="Главная"/>
                                </ListItemButton>
                                <ListItemButton component={Link} to='/news' className={classes.buttonLink}>
                                    <ListItemText primary="Новости"/>
                                </ListItemButton>
                                <ListItemButton component={Link} to='/contacts' className={classes.buttonLink}>
                                    <ListItemText primary="Контакты"/>
                                </ListItemButton>
                            </Grid>

                            <Grid item display="flex" alignItems="center" sx={{width: '300px !important'}}>
                                <Search sx={{border: '1px solid black'}}>
                                    <SearchIconWrapper>
                                        <SearchIcon/>
                                    </SearchIconWrapper>
                                    <StyledInputBase
                                        placeholder="Поиск…"
                                        inputProps={{'aria-label': 'search'}}
                                    />
                                </Search>

                                <Actions matches={matches}/>
                            </Grid>
                        </Grid>
                    </Toolbar>
                </Container>
            </AppBar>
            <Toolbar className={classes.staticToolbar} sx={{marginBottom: '90px'}}/>
        </>
    );
};

export default AppbarDesktop;
