import * as React from "react";
import {useState} from "react";
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import {Grid, MenuItem} from "@mui/material";
import {useDispatch} from "react-redux";
import {logoutUser} from "../../../../store/actions/usersActions";
import {Link} from "react-router-dom";

const Admin = ({user}) => {
    const dispatch = useDispatch();

    const [anchorEl, setAnchorEl] = useState(null);

    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Grid container alignItems='center' justifyContent='center'
                  sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexDirection: {xs: 'column', sm: 'row'}
                  }}
            >
                <Button
                    id="basic-button"
                    color="inherit"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                    size='large'
                    sx={{textTransform: 'capitalize'}}
                >
                    {user ? user.username : user}
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
                {user.role === 'admin' ? <>
                    <MenuItem component={Link} to='/'>Администрирование</MenuItem>
                    <MenuItem component={Link} to='/'>Журнал</MenuItem>
                    <MenuItem component={Link} to='/'>Заказы</MenuItem>
                </>: null}
                <MenuItem onClick={() => dispatch(logoutUser())}>Выйти</MenuItem>
            </Menu>
        </div>
    );
};

export default Admin;
