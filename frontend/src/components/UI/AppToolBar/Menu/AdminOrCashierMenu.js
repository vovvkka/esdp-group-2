import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import {Box, Button, Grid, Menu, Typography} from "@mui/material";
import {logoutUser} from "../../../../store/actions/usersActions";
import {closeShift} from "../../../../store/actions/shiftsActions";
import CustomModal from "../../Modal/Modal";
import FormElement from "../../Form/FormElement/FormElement";
import {insertCash, returnOperation, withdrawCash,} from "../../../../store/actions/cashActions";
import axiosApi from "../../../../axiosApi";
import {addNotification} from "../../../../store/actions/notifierActions";
import Receipt from "../../../Receipt/Receipt";

const AdminOrCashierMenu = ({user}) => {
    const dispatch = useDispatch();
    const shift = useSelector((state) => state.shifts.shift);
    const receipts = useSelector(state => state.shifts.receipts);
    const cash = useSelector((state) => state.cash.cash);

    const [anchorEl, setAnchorEl] = useState(null);
    const [anchorEl2, setAnchorEl2] = useState(null);

    const [wantToLogout, setWantToLogout] = useState(false);
    const [wantToInsertCash, setWantToInsertCash] = useState(false);
    const [wantToWithdrawCash, setWantToWithdrawCash] = useState(false);
    const [wantToCloseShift, setWantToCloseShift] = useState(false);
    const [wantToReturnAProduct, setWantToReturnAProduct] = useState(false);
    const [wantXReport, setWantXReport] = useState(false);
    const [showXReport, setShowXReport] = useState(false);

    const [state, setState] = useState({
        amountOfMoney: "",
        comment: ''
    });

    const [productReturn, setProductReturn] = useState({
        checkNumber: "",
        barcode: "",
        quantity: "",
        total: null,
    });

    const open = Boolean(anchorEl);
    const open2 = Boolean(anchorEl2);

    const handleClick = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    const handleClick2 = (event) => setAnchorEl2(event.currentTarget);
    const handleClose2 = () => setAnchorEl2(null);

    const inputChangeHandler = (e) => {
        const {name, value} = e.target;

        setState((prevState) => {
            return {...prevState, [name]: value};
        });
    };


    const inputChangeHandlerToReturn = (e) => {
        const {name, value} = e.target;

        setProductReturn((prevState) => {
            return {...prevState, [name]: value};
        });
    };


    const cashOperation = e => {
        e.preventDefault();
        if (wantToInsertCash) {
            dispatch(
                insertCash({
                    shiftId: shift._id,
                    amountOfMoney: state.amountOfMoney,
                    comment: state.comment
                })
            );
            setWantToInsertCash(false);
            setState({amountOfMoney: "", comment: ''});
        } else if (wantToWithdrawCash) {
            dispatch(
                withdrawCash({
                    shiftId: shift._id,
                    amountOfMoney: state.amountOfMoney,
                    comment: state.comment
                })
            );
            setWantToWithdrawCash(false);
            setState({amountOfMoney: "", comment: ''});
        }
    };
    const shiftCloseHandler = async (id) => {
        if (wantToLogout) {
            await dispatch(closeShift(id));
            await dispatch(logoutUser());
            setWantToLogout(false);
        } else {
            dispatch(closeShift(shift._id));
            setWantToCloseShift(false);
        }
    };

    let modalChildren;
    if (wantToLogout) {
        modalChildren = (
            <Box width="100%">
                <Typography variant="h6">
                    Вы уверены что хотите закрыть смену?
                </Typography>
                <Typography variant="h6">
                    Наличных в кассе: {cash && cash}{" "}
                </Typography>
                <Box display="flex" justifyContent="flex-end">
                    <Button
                        autoFocus
                        onClick={() => {
                            setWantToLogout(false);
                        }}
                    >
                        НЕТ
                    </Button>
                    <Button
                        onClick={() => {
                            shiftCloseHandler(shift._id);
                        }}
                        autoFocus
                    >
                        ДА
                    </Button>
                </Box>
            </Box>
        );
    } else if (wantToCloseShift) {
        modalChildren = (
            <Box width="100%">
                <Typography variant="h6">
                    Вы уверены что хотите закрыть смену?
                </Typography>
                <Typography variant="h6">
                    Наличных в кассе: {cash && cash}{" "}
                </Typography>
                <Box display="flex" justifyContent="flex-end">
                    <Button
                        autoFocus
                        onClick={() => {
                            setWantToCloseShift(false);
                        }}
                    >
                        НЕТ
                    </Button>
                    <Button
                        onClick={() => {
                            shiftCloseHandler(shift._id);
                        }}
                        autoFocus
                    >
                        ДА
                    </Button>
                </Box>
            </Box>
        );
    } else if (wantToInsertCash) {
        modalChildren = (
            <Box width="100%">
                <Typography variant="h6">Внесение наличных</Typography>
                <Typography variant="h6">
                    Наличных в кассе: {cash && cash}{" "}
                </Typography>

                <form onSubmit={cashOperation}>
                    <FormElement
                        label="Сумма"
                        onChange={inputChangeHandler}
                        value={state.amountOfMoney}
                        name="amountOfMoney"
                        required={true}
                        fullWidth={false}
                    />
                    <FormElement
                        label="Комментарий"
                        onChange={inputChangeHandler}
                        value={state.comment}
                        name="comment"
                        fullWidth={false}
                    />
                    <Box display="flex" justifyContent="flex-end">
                        <Button
                            type='submit'
                            autoFocus
                        >
                            Внести
                        </Button>
                        <Button
                            autoFocus
                            type='button'
                            onClick={() => {
                                setWantToInsertCash(false);
                                setState({amountOfMoney: "", comment: ''});
                            }}
                        >
                            Отмена
                        </Button>
                    </Box>
                </form>
            </Box>
        );
    } else if (wantToWithdrawCash) {
        modalChildren = (
            <Box width="100%">
                <Typography variant="h6">Изъятие наличных</Typography>
                <Typography variant="h6">
                    Наличных в кассе: {cash && cash}
                </Typography>
                <form onSubmit={cashOperation}>
                    <FormElement
                        label="Сумма"
                        onChange={inputChangeHandler}
                        value={state.amountOfMoney}
                        name="amountOfMoney"
                        required={true}
                        fullWidth={false}
                    />
                    <FormElement
                        label="Комментарий"
                        onChange={inputChangeHandler}
                        value={state.comment}
                        name="comment"
                        fullWidth={false}
                    />
                    <Box display="flex" justifyContent="flex-end">
                        <Button
                            type='submit'
                            autoFocus
                        >
                            Изъять
                        </Button>
                        <Button
                            type='button'
                            autoFocus
                            onClick={() => {
                                setWantToWithdrawCash(false);
                                setState({amountOfMoney: "", comment: ''});
                            }}
                        >
                            Отмена
                        </Button>
                    </Box>
                </form>
            </Box>
        );
    } else if (wantToReturnAProduct) {
        modalChildren = (
            <Box width="100%">
                <Typography variant="h6">Возврат продажи</Typography>
                <FormElement
                    InputProps={productReturn.total ? {
                        readOnly: true,
                    } : null}
                    label="Номер чека"
                    onChange={inputChangeHandlerToReturn}
                    value={productReturn.checkNumber}
                    name="checkNumber"
                    required={true}
                    fullWidth={false}
                />
                <FormElement
                    InputProps={productReturn.total ? {
                        readOnly: true,
                    } : null}
                    label="Штрих-код"
                    onChange={inputChangeHandlerToReturn}
                    value={productReturn.barcode}
                    name="barcode"
                    required={true}
                    fullWidth={false}
                />
                <FormElement
                    InputProps={productReturn.total ? {
                        readOnly: true,
                    } : null}
                    label="Кол-во"
                    onChange={inputChangeHandlerToReturn}
                    value={productReturn.quantity}
                    name="quantity"
                    required={true}
                    fullWidth={false}
                />
                {productReturn.total ? <Typography variant="h6">
                    Сумма к выдаче: {productReturn.total}
                </Typography> : null}
                <Box display="flex" justifyContent="flex-end">
                    {productReturn.total ? <Button
                        onClick={async () => {
                            try {
                                await dispatch(returnOperation({shiftId: shift._id, ...productReturn}));
                                setWantToReturnAProduct(false);
                                setProductReturn({
                                    checkNumber: "",
                                    barcode: "",
                                    quantity: "",
                                    total: null,
                                });
                            } catch {
                                dispatch(addNotification('Неверные данные!', 'error'));
                            }
                        }}
                        autoFocus
                    >
                        Вернуть
                    </Button> : <Button
                        onClick={async () => {
                            try {
                                const res = await axiosApi.post('/operations', {
                                    ...productReturn,
                                    shiftId: shift._id,
                                    title: 'returnPurchaseCheck'
                                });
                                if (res.data) {
                                    setProductReturn(prevState => {
                                        return {...prevState, total: res.data.total}
                                    });
                                }
                            } catch {
                                dispatch(addNotification('Неверные данные!', 'error'));
                            }
                        }}
                        autoFocus
                    >
                        Проверить
                    </Button>
                    }
                </Box>
            </Box>
        );
    } else if (wantXReport) {
        modalChildren = (
            <Box width="100%">
                <Typography variant="body1">X-отчет</Typography>
                <hr style={{margin: '10px 0'}}/>
                <Typography variant="h6">
                    Наличные в кассе: {cash && cash} сом
                </Typography>
                <hr style={{margin: '10px 0'}}/>
                <Grid container justifyContent='space-between' style={{marginTop: '15px'}}>
                    <Button onClick={() => {
                        setShowXReport(true);
                        setWantXReport(false);
                    }}>X-отчет</Button>
                    <Button onClick={() => setWantXReport(false)}>Отмена</Button>
                </Grid>
            </Box>
        );
    }


    if (user?.role === "admin") {
        return (
            <>
                <Grid item display="flex" alignItems="center">
                    <Button
                        id="basic-button"
                        color="inherit"
                        aria-controls={open ? "basic-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                        onClick={handleClick}
                        sx={{marginRight: "5px", color: "#fff !important"}}
                    >
                        Администрирование
                    </Button>
                    <Button
                        id="basic-button"
                        color="inherit"
                        aria-controls={open2 ? "basic-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open2 ? "true" : undefined}
                        onClick={handleClick2}
                        sx={{marginRight: "5px"}}
                    >
                        Журнал
                    </Button>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl2}
                        open={open2}
                        onClose={handleClose2}
                        MenuListProps={{
                            "aria-labelledby": "basic-button",
                        }}
                    >
                        <MenuItem onClick={handleClose2} component={Link} to={`/admin/journal`}>Все записи</MenuItem>
                        <MenuItem onClick={handleClose2} component={Link} to={'/admin/purchases'}>Продажи</MenuItem>
                        <MenuItem onClick={handleClose2} component={Link} to={'/admin/report-z'}>
                            Z-отчет
                        </MenuItem>
                        <MenuItem onClick={handleClose2} component={Link} to={'/admin/reports'}>
     
                            Отчет
                        </MenuItem>
                    </Menu>
                    <Button component={Link} to={`/admin/orders`} sx={{color: "#fff !important"}}>
                        Заказы
                    </Button>
                </Grid>

                <Grid item display="flex" flexDirection="column">
                    <Typography sx={{textTransform: "UpperCase"}} color="white">
                        Администратор
                    </Typography>
                    <Button
                        onClick={() => dispatch(logoutUser())}
                        variant="contained"
                        sx={{
                            marginTop: "5px",
                            color: "#fff !important",
                            background: "#116ffb5e",
                            ":hover": {background: "#6592d55e"}
                        }}
                    >
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
                    <MenuItem onClick={handleClose} component={Link} to={"/admin/news"}>Новости</MenuItem>
                    <MenuItem onClick={handleClose} component={Link} to={"/admin/settings"}>Настройки</MenuItem>
                </Menu>
            </>
        );
    }

    if (user?.role === "cashier") {
        return (
            <>
                <Grid item display="flex" alignItems="center">
                    {shift
                        ? [
                            <Button
                                key={0}
                                color="inherit"
                                sx={{marginRight: "5px"}}
                                onClick={handleClick}
                            >
                                Операции
                            </Button>,
                            <Menu
                                key={1}
                                id="basic-menu"
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                MenuListProps={{
                                    "aria-labelledby": "basic-button",
                                }}
                            >
                                <MenuItem
                                    onClick={handleClose}
                                    component={Link}
                                    to={"/cashier"}
                                >
                                    Продажа
                                </MenuItem>
                                <MenuItem
                                    onClick={() => {
                                        handleClose();
                                        setWantToInsertCash(true);
                                    }}
                                >
                                    Внесение наличных
                                </MenuItem>
                                <MenuItem
                                    onClick={() => {
                                        handleClose();
                                        setWantToWithdrawCash(true);
                                    }}
                                >
                                    Изъятие наличных
                                </MenuItem>
                                <MenuItem
                                    onClick={() => {
                                        handleClose();
                                        setWantToReturnAProduct(true);
                                    }}
                                >
                                    Возврат продажи
                                </MenuItem>
                                <MenuItem
                                    onClick={() => {
                                        handleClose();
                                        setWantXReport(true);
                                    }}
                                >
                                    X-отчет
                                </MenuItem>
                                <MenuItem
                                    onClick={() => {
                                        handleClose();
                                        setWantToCloseShift(true);
                                    }}
                                >
                                    Закрытие смены
                                </MenuItem>
                            </Menu>,
                        ]
                        : <Button component={Link} to={`/cashier/open-shift`} sx={{color: "#fff !important"}}>
                            Смена
                        </Button>}

                    <Button
                        id="basic-button"
                        color="inherit"
                        aria-controls={open2 ? "basic-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open2 ? "true" : undefined}
                        onClick={handleClick2}
                        sx={{marginRight: "5px"}}
                    >
                        Журнал
                    </Button>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl2}
                        open={open2}
                        onClose={handleClose2}
                        MenuListProps={{
                            "aria-labelledby": "basic-button",
                        }}
                    >
                        <MenuItem onClick={handleClose2} component={Link} to={`/admin/journal`}>Все записи</MenuItem>
                        <MenuItem onClick={handleClose2}  component={Link} to={`/admin/purchases`}>Продажи</MenuItem>
                        {!shift
                            ? [
                                <MenuItem key={0} onClick={handleClose2} component={Link} to={'/admin/report-z'}>
                                    Z-отчет
                                </MenuItem>,
                                <MenuItem key={1} onClick={handleClose2} component={Link} to={'/admin/reports'}>
                                    Отчет
                                </MenuItem>,
                            ]
                            : null}
                    </Menu>
                </Grid>
                <Box sx={{display: 'flex'}}>
                    <Grid item display="flex" flexDirection="column">
                        <Typography sx={{textTransform: "UpperCase", color: 'inherit'}}>
                            Кассир: {user.username}
                        </Typography>
                        {shift ? (
                            <>
                                <Typography sx={{textTransform: "UpperCase", color: 'inherit'}}>
                                    Номер смены: {shift.shiftNumber}
                                </Typography>
                                <Typography sx={{textTransform: "UpperCase", color: 'inherit'}}>
                                    Количество чеков: {receipts}
                                </Typography>
                                <Typography sx={{textTransform: "UpperCase", color: 'inherit'}}>
                                    Наличка в кассе: {cash && cash}
                                </Typography>
                            </>
                        ) : null}

                        <Button
                            onClick={() => {
                                if (user.role === "cashier" && shift) {
                                    setWantToLogout(true);
                                } else {
                                    dispatch(logoutUser());
                                }
                            }}
                            color="primary"
                            variant="contained"
                            sx={{
                                marginTop: "5px",
                                color: "#fff !important",
                                background: "#116ffb5e",
                                ":hover": {background: "#6592d55e"}
                            }}
                        >
                            Выйти
                        </Button>
                    </Grid>

                    {
                        (wantToInsertCash || wantToCloseShift || wantToWithdrawCash || wantToLogout || wantToReturnAProduct || wantXReport) && (
                            <CustomModal
                                isOpen={wantToInsertCash || wantToCloseShift || wantToWithdrawCash || wantToLogout || wantToReturnAProduct || wantXReport}
                                handleClose={() => {
                                    setWantToLogout(false);
                                    setWantToInsertCash(false);
                                    setWantToWithdrawCash(false);
                                    setWantToCloseShift(false);
                                    setWantToReturnAProduct(false);
                                    setWantXReport(false);
                                    setProductReturn({
                                        checkNumber: "",
                                        barcode: "",
                                        quantity: "",
                                        total: null,
                                    });
                                    setState({amountOfMoney: "", comment: ''});
                                }}
                            >
                                {modalChildren}
                            </CustomModal>
                        )
                    }
                    {
                        showXReport && (
                            <CustomModal
                                isOpen={showXReport}
                                handleClose={() => setShowXReport(false)}
                            >
                                <Receipt
                                    handleClose={() => setShowXReport(false)}
                                    xReport
                                />
                            </CustomModal>
                        )
                    }
                </Box>

            </>
        );
    }
};

export default AdminOrCashierMenu;
