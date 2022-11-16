import {AppbarContainer, AppbarHeader} from "../../../styles/Appbar/styledAppbar";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import Actions from "./Actions";
import {Box, IconButton} from "@mui/material";
import logo from "../../../assets/logo.png";
import {Link} from "react-router-dom";
import React from "react";
import {useDispatch} from "react-redux";
import {setDrawerOpen} from "../../../store/slices/appSLice";

const AppbarMobile = ({matches}) => {
    const dispatch = useDispatch();

    return (
        <AppbarContainer>
            <IconButton onClick={() => dispatch(setDrawerOpen())}>
                <MenuIcon/>
            </IconButton>
            <AppbarHeader textAlign={"center"} variant="h4">
                <Link to="/">
                    <Box
                        component="img"
                        sx={{
                            height: 'auto',
                            width: 200,
                        }}
                        alt="Tay Tay logo"
                        src={logo}
                    />
                </Link>
            </AppbarHeader>
            <IconButton>
                <SearchIcon/>
            </IconButton>
            <Actions matches={matches}/>
        </AppbarContainer>
    );
};

export default AppbarMobile;
