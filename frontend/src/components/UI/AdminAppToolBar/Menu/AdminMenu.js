import React, {useState} from 'react';
import {Button, Menu, MenuItem} from "@mui/material";
import {Link} from "react-router-dom";

const AdminMenu = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };


    return (
        <>
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
};

export default AdminMenu;