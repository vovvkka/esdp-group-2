import {Drawer, List, ListItemButton, ListItemText,} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {setDrawerClosed} from "../../store/slices/appSLice";

const AppDrawer = () => {
    const dispatch = useDispatch();
    const drawerOpen = useSelector(state => state.app.drawerOpen);

    return (
        <>
            <Drawer open={drawerOpen} onClose={() => dispatch(setDrawerClosed())}>
                <List>
                    <ListItemButton component={Link} to='/' onClick={() => dispatch(setDrawerClosed())}>
                        <ListItemText>Главная</ListItemText>
                    </ListItemButton>
                    <ListItemButton>
                        <ListItemText>Категории</ListItemText>
                    </ListItemButton>
                    <ListItemButton component={Link} to='/news' onClick={() => dispatch(setDrawerClosed())}>
                        <ListItemText>Новости</ListItemText>
                    </ListItemButton>
                    <ListItemButton component={Link} to='/contacts' onClick={() => dispatch(setDrawerClosed())}>
                        <ListItemText>Контакты</ListItemText>
                    </ListItemButton>
                </List>
            </Drawer>
        </>
    );
};

export default AppDrawer;
