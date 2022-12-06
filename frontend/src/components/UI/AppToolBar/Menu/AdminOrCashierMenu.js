import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import {Box, Button, Grid, Menu, Typography} from "@mui/material";
import {logoutUser} from "../../../../store/actions/usersActions";
import {closeShift} from "../../../../store/actions/shiftsActions";
import {setModalClosed, setModalOpen} from "../../../../store/slices/appSLice";
import CustomModal from "../../Modal/Modal";
import FormElement from "../../Form/FormElement/FormElement";
import {insertCash, withdrawCash} from "../../../../store/actions/cashActions";


const AdminOrCashierMenu = ({user}) => {
    const dispatch = useDispatch();
    const shift = useSelector(state => state.shifts.shift);
    const cash = useSelector(state => state.cash.cash);
    const modalOpen = useSelector(state => state.app.modalOpen);

    const [anchorEl, setAnchorEl] = useState(null);
    const [anchorEl2, setAnchorEl2] = useState(null);

    const [wantToLogout, setWantToLogout] = useState(false);
    const [wantToInsertCash, setWantToInsertCash] = useState(false);
    const [wantToWithdrawCash, setWantToWithdrawCash] = useState(false);
    const [wantToCloseShift, setWantToCloseShift] = useState(false);
    const [state, setState] = useState({
        amountOfMoney:''
    });

    const open = Boolean(anchorEl);
    const open2 = Boolean(anchorEl2);

    const handleClick = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    const handleClick2 = (event) => setAnchorEl2(event.currentTarget);
    const handleClose2 = () => setAnchorEl2(null);

    const inputChangeHandler = e => {
        const {name, value} = e.target;

        setState(prevState => {
            return {...prevState, [name]: value};
        });
    };

    let modalChildren;
    if(wantToLogout){
        modalChildren=<Box width='100%'>
            <Typography variant='h6'>
                Вы уверены что хотите закрыть смену?
            </Typography>
            <Typography variant='h6'>
                Наличных в кассе: {cash&&cash}            </Typography>
            <Box display='flex' justifyContent='flex-end'>
                <Button autoFocus onClick={() => {
                    dispatch(setModalClosed());
                    setWantToLogout(false);
                }}>
                    НЕТ
                </Button>
                <Button onClick={() => {
                    dispatch(setModalClosed());
                    shiftCloseHandler(shift._id);
                }} autoFocus>
                    ДА
                </Button>
            </Box>
        </Box>;
    }else if(wantToCloseShift){
        modalChildren=<Box width='100%'>
            <Typography variant='h6'>
                Вы уверены что хотите закрыть смену?
            </Typography>
            <Typography variant='h6'>
                Наличных в кассе: {cash&&cash}            </Typography>
            <Box display='flex' justifyContent='flex-end'>
                <Button autoFocus onClick={() => {
                    dispatch(setModalClosed());
                    setWantToCloseShift(false);
                }}>
                    НЕТ
                </Button>
                <Button onClick={() => {
                    dispatch(setModalClosed());
                    shiftCloseHandler(shift._id);
                }} autoFocus>
                    ДА
                </Button>
            </Box>
        </Box>;
    }else if(wantToInsertCash){
        modalChildren=<Box width='100%'>
            <Typography variant='h6'>
                Внесение наличных
            </Typography>
            <Typography variant='h6'>
                Наличных в кассе: {cash&&cash}            </Typography>
            <FormElement label="Сумма"
                         onChange={inputChangeHandler}
                         value={state.amountOfMoney}
                         name="amountOfMoney"
                         required={true}
                         fullWidth={false}/>
            <Box display='flex' justifyContent='flex-end'>
                <Button onClick={() => {
                    dispatch(setModalClosed());
                    cashOperation();
                }} autoFocus>
                    Внести
                </Button>
                <Button autoFocus onClick={() => {
                    dispatch(setModalClosed());
                    setWantToInsertCash(false);
                    setState({amountOfMoney:''});
                }}>
                    Отмена
                </Button>
            </Box>
        </Box>;
    }else if(wantToWithdrawCash){
        modalChildren=<Box width='100%'>
            <Typography variant='h6'>
                Изъятие наличных
            </Typography>
            <Typography variant='h6'>
                Наличных в кассе: {cash&&cash}
            </Typography>
            <FormElement label="Сумма"
                         onChange={inputChangeHandler}
                         value={state.amountOfMoney}
                         name="amountOfMoney"
                         required={true}
                         fullWidth={false}/>
            <Box display='flex' justifyContent='flex-end'>
                <Button onClick={() => {
                    dispatch(setModalClosed());
                    cashOperation();
                }} autoFocus>
                    Изъять
                </Button>
                <Button autoFocus onClick={() => {
                    dispatch(setModalClosed());
                    setWantToWithdrawCash(false);
                    setState({amountOfMoney:''});
                }}>
                    Отмена
                </Button>
            </Box>
        </Box>;
    }
    const cashOperation = () =>{
        if(wantToInsertCash) {
            dispatch(insertCash({shiftId:shift._id,amountOfMoney: state.amountOfMoney}));
            setWantToInsertCash(false);
            setState({amountOfMoney:''});
        }else if(wantToWithdrawCash) {
            dispatch(withdrawCash({shiftId:shift._id,amountOfMoney: state.amountOfMoney}));
            setWantToWithdrawCash(false);
            setState({amountOfMoney:''});
        }
    };
    const shiftCloseHandler = async (id) => {
        if (wantToLogout) {
            await dispatch(closeShift(id));
            await dispatch(logoutUser());
            setWantToLogout(false);
        } else {
            dispatch(closeShift(shift._id));
        }
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
                    <MenuItem onClick={handleClose} component={Link} to={"/admin/clients"}>Клиенты</MenuItem>
                </Menu>
            </>
        );
    }

    if (user?.role === 'cashier') {
        return (
            <>
                <Grid item display="flex" alignItems="center">
                    {shift ?
                        [
                            <Button key={0} color="inherit" sx={{marginRight: '5px'}} onClick={handleClick}>Операции</Button>,
                            <Menu
                                key={1}
                                id="basic-menu"
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                MenuListProps={{
                                    'aria-labelledby': 'basic-button',
                                }}
                            >
                                <MenuItem onClick={handleClose} component={Link} to={"/cashier"}>Продажа</MenuItem>
                                <MenuItem  onClick={() => {
                                    handleClose();
                                    setWantToInsertCash(true);
                                    dispatch(setModalOpen());
                                }} >Внесение
                                    наличных</MenuItem>
                                <MenuItem  onClick={() => {
                                    handleClose();
                                    setWantToWithdrawCash(true);
                                    dispatch(setModalOpen());
                                }} >Изъятие
                                    наличных</MenuItem>
                                <MenuItem onClick={handleClose} component={Link} to={"/cashier"}>Возврат
                                    продажи</MenuItem>
                                <MenuItem onClick={handleClose} component={Link} to={"/cashier"}>X-отчет</MenuItem>
                                <MenuItem
                                    onClick={() => {
                                        handleClose();
                                        setWantToCloseShift(true);
                                        dispatch(setModalOpen());
                                    }}
                                >
                                    Закрытие смены
                                </MenuItem>
                            </Menu>]: null}

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
                            [
                                <MenuItem key={0} onClick={handleClose}>Z-отчет</MenuItem>,
                                <MenuItem key={1} onClick={handleClose}>Отчет</MenuItem>
                            ]
                            : null}
                    </Menu>
                </Grid>

                <Grid item display="flex" flexDirection="column">
                    <Typography sx={{textTransform: 'UpperCase'}}>Кассир: {user.username}</Typography>
                    {shift ? <>
                        <Typography sx={{textTransform: 'UpperCase'}}>Номер смены: {shift.shiftNumber}</Typography>
                        <Typography sx={{textTransform: 'UpperCase'}}>Количество чеков: 3</Typography>
                        <Typography sx={{textTransform: 'UpperCase'}}>Наличка в кассе: {cash&&cash}</Typography></> : null}

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
                    handleClose={() => {
                        setWantToLogout(false);
                        setWantToInsertCash(false);
                        setWantToWithdrawCash(false);
                        setWantToCloseShift(false);
                        dispatch(setModalClosed());
                    }}
                >
                    {modalChildren}
                </CustomModal>
            </>
        );
    }
};

export default AdminOrCashierMenu;
