import {Divider, ListItemButton, ListItemIcon} from "@mui/material";
import {ActionIconsContainerDesktop, ActionIconsContainerMobile, MyList} from "../../../styles/Appbar/styledAppbar";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {Colors} from "../../../theme";
import UserMenu from "../AppToolBar/Menu/UserMenu";
import {useSelector} from "react-redux";

const Actions = ({matches}) => {
    const user = useSelector(state => state.users.user);
    const Component = matches ? ActionIconsContainerMobile : ActionIconsContainerDesktop;

    return (
        <Component>
            <MyList type="row">
                <ListItemButton
                    sx={{
                        justifyContent: "center",
                    }}
                >
                    <ListItemIcon
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            color: matches && Colors.secondary,
                        }}
                    >
                        <ShoppingCartIcon/>
                    </ListItemIcon>
                </ListItemButton>
                {user?.role === 'admin' || user?.role === 'cashier' ?
                    <>
                        <Divider orientation="vertical" flexItem/>
                        <ListItemButton
                            sx={{
                                justifyContent: "center",
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    color: matches && Colors.secondary,
                                }}
                            >
                                <UserMenu user={user}/>
                            </ListItemIcon>
                        </ListItemButton>
                        <Divider orientation="vertical" flexItem/>
                    </>
                    : null
                }
            </MyList>
        </Component>
    );
};

export default Actions;
