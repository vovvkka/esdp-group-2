import {Box, ListItemButton, ListItemIcon, ListItemText, Typography,} from "@mui/material";
import {AppbarContainer, AppbarHeader, MyList,} from "../../../styles/Appbar/styledAppbar";
import SearchIcon from "@mui/icons-material/Search";
import Actions from "./Actions";
import logo from "../../../assets/logo.png";
import {Link} from "react-router-dom";
import React from "react";

const AppbarDesktop = ({matches}) => {
    return (
        <AppbarContainer>
            <AppbarHeader textAlign={"center"} variant="h4">
                <Link to="/">
                    <Box
                        component="img"
                        sx={{
                            height: 'auto',
                            width: 150,
                        }}
                        alt="Tay Tay logo"
                        src={logo}
                    />
                </Link>
            </AppbarHeader>
            <MyList type="row">
                <ListItemButton component={Link} to='/'>
                    <ListItemText primary="Главная"/>
                </ListItemButton>
                <ListItemButton component={Link} to='/news'>
                    <ListItemText primary="Новости"/>
                </ListItemButton>
                <ListItemButton component={Link} to='/contacts'>
                    <ListItemText primary="Контакты"/>
                </ListItemButton>
                <ListItemButton sx={{border: '1px solid #B0B0B0FF'}}>
                    <ListItemIcon>
                        <SearchIcon sx={{marginRight: '10px'}}/>
                        <Typography>
                            Поиск
                        </Typography>
                    </ListItemIcon>
                </ListItemButton>
            </MyList>
            <Actions matches={matches}/>
        </AppbarContainer>
    );
};

export default AppbarDesktop;
