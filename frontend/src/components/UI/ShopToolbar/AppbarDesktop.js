import {Box, ListItemButton, ListItemIcon, ListItemText,} from "@mui/material";
import {AppbarContainer, AppbarHeader, MyList,} from "../../../styles/appbar/styledAppbar";
import SearchIcon from "@mui/icons-material/Search";
import Actions from "./Actions";
import {useUIContext} from "../../../context/ui";
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
          <ListItemText primary="Главная"/>
          <ListItemText primary="Новости"/>
          <ListItemText primary="Контакты"/>
          <ListItemButton onClick={() => setShowSearchBox(true)}>
            <ListItemIcon>
              <SearchIcon/>
            </ListItemIcon>
          </ListItemButton>
        </MyList>
        <Actions matches={matches}/>
      </AppbarContainer>
  );
};

export default AppbarDesktop;
