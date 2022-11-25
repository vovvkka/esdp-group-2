import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import {Button, Dialog, DialogActions, DialogTitle, Grid, Menu, Typography, useMediaQuery} from "@mui/material";
import {logoutUser} from "../../../../store/actions/usersActions";
import {useTheme} from "@mui/material/styles";
import {closeShift} from "../../../../store/actions/shiftsActions";


const AdminOrCashierMenu = ({user}) => {
    const dispatch = useDispatch();
    const shift = useSelector(state => state.shifts.shift);

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));


    const [anchorEl, setAnchorEl] = useState(null);
    const [anchorEl2, setAnchorEl2] = useState(null);
    const [openDialog, setOpen] = useState(false);

    const [wantToLogout, setWantToLogout] = useState(false);


    const open = Boolean(anchorEl);
    const open2 = Boolean(anchorEl2);

    const handleClickOpenDialog = () => {
        setOpen(true);
    };

    const handleCloseDialog = () => {
        setOpen(false);
    };
    const handleClick = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    const handleClick2 = (event) => setAnchorEl2(event.currentTarget);
    const handleClose2 = () => setAnchorEl2(null);

    const shiftCloseHandler = async (id) => {
        if (wantToLogout) {
            await dispatch(closeShift(id));
            await dispatch(logoutUser());
            setWantToLogout(false);
        } else {
            dispatch(closeShift(shift._id));
        }
    }
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
                    <Button color="inherit" component={Link} to={`/admin/orders`}>Заказы</Button>
                </Grid>

                <Grid item display="flex" flexDirection="column">
                    <Typography sx={{textTransform: 'UpperCase'}}>Администратор</Typography>
                    <Button onClick={() => dispatch(logoutUser())} color="primary" variant="contained"
                            sx={{marginTop: '5px'}}>
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
                    <MenuItem onClick={handleClose} component={Link} to={"/admin"}>Главная</MenuItem>
                    <MenuItem onClick={handleClose} component={Link} to={"/admin/categories"}>Категории</MenuItem>
                    <MenuItem onClick={handleClose} component={Link} to={"/admin/products"}>Номенклатура</MenuItem>
                    <MenuItem onClick={handleClose} component={Link} to={"/admin/cashiers"}>Кассиры</MenuItem>
                </Menu>
            </>
        );
    }

    if (user?.role === 'cashier') {
        return (
            <>
                <Grid item display="flex" alignItems="center">
                    {shift ?
                        <>
                            <Button color="inherit" sx={{marginRight: '5px'}} onClick={handleClick}>Операции</Button>
                            <Menu
                                id="basic-menu"
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                MenuListProps={{
                                    'aria-labelledby': 'basic-button',
                                }}
                            >
                                <MenuItem onClick={handleClose} component={Link} to={"/cashier"}>Продажа</MenuItem>
                                <MenuItem onClick={handleClose} component={Link} to={"/cashier"}>Внесение
                                    наличных</MenuItem>
                                <MenuItem onClick={handleClose} component={Link} to={"/cashier"}>Изъятие
                                    наличных</MenuItem>
                                <MenuItem onClick={handleClose} component={Link} to={"/cashier"}>Возврат
                                    продажи</MenuItem>
                                <MenuItem onClick={handleClose} component={Link} to={"/cashier"}>X-отчет</MenuItem>
                                <MenuItem
                                    onClick={() => {
                                        handleClose();
                                        handleClickOpenDialog()
                                    }}
                                >
                                    Закрытие смены
                                </MenuItem>
                            </Menu>
                        </> : null}

                    <Button
                        id="basic-button"
                        color="inherit"
                        aria-controls={open2 ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open2 ? 'true' : undefined}
                        onClick={handleClick2}
                        sx={{marginRight: '5px'}}
                    >
                        Журнал
                    </Button>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl2}
                        open={open2}
                        onClose={handleClose2}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        <MenuItem onClick={handleClose}>Все записи</MenuItem>
                        <MenuItem onClick={handleClose}>Продажи</MenuItem>
                        {!shift ?
                            <>
                                <MenuItem onClick={handleClose}>Z-отчет</MenuItem>
                                <MenuItem onClick={handleClose}>Отчет</MenuItem>
                            </>
                            : null}
                    </Menu>
                </Grid>

                <Grid item display="flex" flexDirection="column">
                    <Typography sx={{textTransform: 'UpperCase'}}>Кассир: {user.username}</Typography>
                    {shift ? <>
                        <Typography sx={{textTransform: 'UpperCase'}}>Номер смены: {shift.shiftNumber}</Typography>
                        <Typography sx={{textTransform: 'UpperCase'}}>Количество чеков: 3</Typography>
                        <Typography sx={{textTransform: 'UpperCase'}}>Наличка в кассе: 3684 сом</Typography></> : null}

                    <Button onClick={() => {
                        if (user.role === 'cashier' && shift) {
                            setWantToLogout(true);
                            handleClickOpenDialog();
                        } else {
                            dispatch(logoutUser());
                        }
                    }} color="primary" variant="contained"
                            sx={{marginTop: '5px'}}>
                        Выйти
                    </Button>
                </Grid>
                <Dialog
                    fullScreen={fullScreen}
                    open={openDialog}
                    onClose={handleCloseDialog}
                    aria-labelledby="responsive-dialog-title"
                >
                    <DialogTitle id="responsive-dialog-title">
                        {"Вы уверены что хотите закрыть смену?"}
                    </DialogTitle>

                    <DialogActions>
                        <Button autoFocus onClick={handleCloseDialog}>
                            НЕТ
                        </Button>
                        <Button onClick={() => {
                            handleCloseDialog();
                            shiftCloseHandler(shift._id);
                        }} autoFocus>
                            ДА
                        </Button>
                    </DialogActions>
                </Dialog>
            </>
        );
    }
};

export default AdminOrCashierMenu;
