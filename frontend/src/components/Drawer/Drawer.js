import {Drawer, List, ListItemButton, ListItemText,} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {setDrawerClosed} from "../../store/slices/appSLice";

const AppDrawer = () => {
    const dispatch = useDispatch();
    const drawerOpen = useSelector(state => state.app.drawerOpen);

    return (
        <>
            <Drawer open={drawerOpen} onClose={() => dispatch(setDrawerClosed())}>
                <List>
                    <ListItemButton>
                        <ListItemText>Главная</ListItemText>
                    </ListItemButton>
                    <ListItemButton>
                        <ListItemText>Категории</ListItemText>
                    </ListItemButton>
                    <ListItemButton>
                        <ListItemText>Новости</ListItemText>
                    </ListItemButton>
                    <ListItemButton>
                        <ListItemText>Контакты</ListItemText>
                    </ListItemButton>
                </List>
            </Drawer>
        </>
    );
};

export default AppDrawer;
