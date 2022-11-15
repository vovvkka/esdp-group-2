import {AppbarContainer, AppbarHeader} from "../../../styles/appbar/styledAppbar";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import Actions from "./Actions";
import {Box, IconButton} from "@mui/material";
import {useUIContext} from "../../../context/ui";
import logo from "../../../assets/logo.png";
import {Link} from "react-router-dom";
import React from "react";

const AppbarMobile = ({matches}) => {
    const {setDrawerOpen, setShowSearchBox} = useUIContext();

    return (
        <AppbarContainer>
            <IconButton onClick={() => setDrawerOpen(true)}>
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
            <IconButton onClick={() => setShowSearchBox(true)}>
                <SearchIcon/>
            </IconButton>
            <Actions matches={matches}/>
        </AppbarContainer>
    );
};

export default AppbarMobile;
