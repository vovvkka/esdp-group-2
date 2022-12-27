import * as React from 'react';
import {styled, alpha} from '@mui/material/styles';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import {Fab} from "@mui/material";
import {ArrowDownward, ArrowUpward, Restore, Update} from "@mui/icons-material";

const StyledMenu = styled((props) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        {...props}
    />
))(({theme}) => ({
    '& .MuiPaper-root': {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        minWidth: 180,
        boxShadow:
            'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        '& .MuiMenu-list': {
            padding: '4px 0',
        },
        '& .MuiMenuItem-root': {
            '& .MuiSvgIcon-root': {
                fontSize: 18,
                color: theme.palette.text.secondary,
                marginRight: theme.spacing(1.5),
            },
            '&:active': {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    theme.palette.action.selectedOpacity,
                ),
            },
        },
    },
}));

export default function Filter({filterByDate,filterByPrice}) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <Fab
                id="demo-customized-button"
                aria-controls={open ? 'demo-customized-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                variant="contained"
                disableelevation={'true'}
                onClick={handleClick}
                sx={{marginLeft: '15px', marginTop: '10px', marginBottom: '5px'}}
            >
                <FilterAltIcon/>
            </Fab>
            <StyledMenu
                id="demo-customized-menu"
                MenuListProps={{
                    'aria-labelledby': 'demo-customized-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                <MenuItem onClick={() => {
                    filterByPrice('asc')
                    handleClose();
                }} disableRipple>
                    <ArrowUpward/>
                    Цена по возрастанию
                </MenuItem>
                <MenuItem onClick={() => {
                    filterByPrice('desc')
                    handleClose();
                }} disableRipple>
                    <ArrowDownward/>
                    Цена по убыванию
                </MenuItem>
                <MenuItem onClick={() => {
                    filterByDate('desc')
                    handleClose();
                }} disableRipple>
                    <Update/>
                    Сначала новые
                </MenuItem>
                <MenuItem onClick={() => {
                    filterByDate('asc')
                    handleClose();
                }} disableRipple>
                    <Restore/>
                    Сначала старые
                </MenuItem>
            </StyledMenu>
        </>
    );
}