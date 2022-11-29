import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import {Box, Button, Grid, Menu, Typography} from "@mui/material";
import {logoutUser} from "../../../../store/actions/usersActions";
import {closeShift} from "../../../../store/actions/shiftsActions";
import {setModalClosed, setModalOpen} from "../../../../store/slices/appSLice";
import CustomModal from "../../Modal/Modal";


const AdminOrCashierMenu = ({user}) => {
    const dispatch = useDispatch();
    const shift = useSelector(state => state.shifts.shift);
    const modalOpen = useSelector(state => state.app.modalOpen);

    const [anchorEl, setAnchorEl] = useState(null);
    const [anchorEl2, setAnchorEl2] = useState(null);

    const [wantToLogout, setWantToLogout] = useState(false);


    const open = Boolean(anchorEl);
    const open2 = Boolean(anchorEl2);

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
                            {shift ?
                                <>
                                    <MenuItem onClick={handleClose} component={Link} to={"/cashier"}>Продажа</MenuItem>
                                    <MenuItem onClick={handleClose} component={Link} to={"/cashier"}>Внесение наличных</MenuItem>
                                    <MenuItem onClick={handleClose} component={Link} to={"/cashier"}>Изъятие наличных</MenuItem>
                                    <MenuItem onClick={handleClose} component={Link} to={"/cashier"}>Возврат продажи</MenuItem>
                                    <MenuItem onClick={handleClose} component={Link} to={"/cashier"}>X-отчет</MenuItem>
                                    <MenuItem
                                        onClick={() => {
                                            handleClose();
                                            dispatch(setModalOpen());
                                        }}
                                    >
                                        Закрытие смены
                                    </MenuItem>
                                </>
                                :
                                <MenuItem onClick={handleClose} component={Link} to={"/cashier/open-shift"}>Открытие смены</MenuItem>
                            }


                        </Menu>
                    </>

                    <Button color="inherit" onClick={handleClick2} sx={{marginRight: '5px'}}>Журнал</Button>
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
                            dispatch(setModalOpen());
                        } else {
                            dispatch(logoutUser());
                        }
                    }} color="primary" variant="contained"
                            sx={{marginTop: '5px'}}>
                        Выйти
                    </Button>
                </Grid>
                <CustomModal
                    isOpen={modalOpen}
                    handleClose={() => dispatch(setModalClosed())}
                >
                    <Box width='100%'>
                        <Typography variant='h6'>
                            Вы уверены что хотите закрыть смену?
                        </Typography>

                        <Box display='flex' justifyContent='flex-end'>
                            <Button autoFocus onClick={() => dispatch(setModalClosed())}>
                                НЕТ
                            </Button>
                            <Button onClick={() => {
                                dispatch(setModalClosed());
                                shiftCloseHandler(shift._id);
                            }} autoFocus>
                                ДА
                            </Button>
                        </Box>
                    </Box>
                </CustomModal>
            </>
        );
    }
};

export default AdminOrCashierMenu;
