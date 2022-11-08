import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {Link} from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import {Button, Grid, Menu, Typography} from "@mui/material";
import {logoutUser} from "../../../../store/actions/usersActions";


const UserMenu = ({user}) => {
    const dispatch = useDispatch();

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    if (user?.role === 'admin') {
        return (
            <>
                <Grid item display="flex" alignItems="center">
                    <Button
                        id="basic-button"
                        color="inherit"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                        sx={{marginRight: '5px'}}
                    >
                        Администрирование
                    </Button>
                    <Button color="inherit" sx={{marginRight: '5px'}}>Журнал</Button>
                    <Button color="inherit">Заказы</Button>
                </Grid>

                <Grid item display="flex" flexDirection="column">
                    <Typography sx={{textTransform: 'UpperCase'}}>Администратор</Typography>
                    <Button onClick={() => dispatch(logoutUser())} color="primary" variant="contained" sx={{marginTop: '5px'}}>
                        Выйти
                    </Button>
                </Grid>


                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >
                    <MenuItem onClick={handleClose} component={Link} to={"/admin/categories"}>Категории</MenuItem>
                    <MenuItem onClick={handleClose} component={Link} to={"/admin/products"}>Номенклатура</MenuItem>
                </Menu>
            </>
        );
    }

    if (user?.role === 'cashier') {
        return (
            <>
                <Grid item display="flex" alignItems="center">
                    <Button color="inherit" sx={{marginRight: '5px'}}>Операции</Button>
                    <Button color="inherit">Журнал</Button>
                </Grid>

                <Grid item display="flex" flexDirection="column">
                    <Typography sx={{textTransform: 'UpperCase'}}>Кассир: {user.username}</Typography>
                    <Typography sx={{textTransform: 'UpperCase'}}>Номер смены: 6</Typography>
                    <Typography sx={{textTransform: 'UpperCase'}}>Количество чеков: 3</Typography>
                    <Typography sx={{textTransform: 'UpperCase'}}>Наличка в кассе: 3684 сом</Typography>
                    <Button onClick={() => dispatch(logoutUser())} color="primary" variant="contained" sx={{marginTop: '5px'}}>
                        Выйти
                    </Button>
                </Grid>
            </>
        );
    }
};

export default UserMenu;