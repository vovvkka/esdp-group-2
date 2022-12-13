import React, {useEffect, useState} from 'react';
import {Button, Grid, IconButton, Paper, TextField, Typography} from "@mui/material";
import FormElement from "../UI/Form/FormElement/FormElement";
import FormSelect from "../UI/Form/FormSelect/FormSelect";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import {useDispatch, useSelector} from "react-redux";
import {
    addProductToCashbox,
    cancelAllCashbox,
    changeDiscount, decreaseProduct,
    deleteProductFromCashbox, increaseProduct, setCustomer
} from "../../store/slices/cashboxSlice";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import {fetchClients} from "../../store/actions/clientsActions";

const CashierAddProduct = () => {
    const addedProducts = useSelector(state => state.cashbox.products);
    const products = useSelector(state => state.products.products.docs);
    const total = useSelector(state => state.cashbox.total);
    const totalWithDiscount = useSelector(state => state.cashbox.totalWithDiscount);
    const user = useSelector(state => state.users.user);
    const customers = useSelector(state => state.clients.clients.docs);
    const dispatch = useDispatch();

    const [state, setState] = useState({customer: '', barcode: ''});
    const [clientsOptions, setClientsOptions] = useState([]);

    useEffect(() => {
        dispatch(fetchClients());
    }, [dispatch]);

    useEffect(() => {
        if (customers) {
            setClientsOptions(customers);
        }
    }, [customers]);

    useEffect(() => {
        if (products && products.length) {
            const product = products.find(product => product.barcode === state.barcode);

            if (product) {
                dispatch(addProductToCashbox(product));
                setState(prev => ({
                    ...prev,
                    barcode: '',
                }));
            }
        }
    }, [dispatch, products, state.barcode]);

    const stateChange = (name, value) => {
        if (name === 'customer') {
            dispatch(setCustomer(value));
        }
        setState(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const deleteHandler = (id) => {
        if (user.role === 'cashier') {
            dispatch(deleteProductFromCashbox(id));
        }
    };

    const cancelHandler = () => {
        if (user.role === 'cashier') {
            dispatch(cancelAllCashbox());
        }
    };

    return (
        <Grid>
            <Grid container justifyContent='space-between' alignItems='center' sx={{padding: '10px 20px'}}>
                <FormElement
                    name='barcode'
                    label='Штрихкод'
                    xs={3}
                    onChange={(e) => stateChange(e.target.name, e.target.value)}
                    value={state.barcode}
                />
                <FormSelect
                    name='customer'
                    label='Покупатель'
                    options={clientsOptions}
                    xs={3}
                    onChange={(e) => stateChange(e.target.name, e.target.value)}
                    value={state.customer}
                    customerSelect
                />
            </Grid>
            <Grid>
                <TableContainer component={Paper} sx={{height: '55vh', overflow: 'auto',  boxShadow: 'none !important'}}>
                    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="right">Номер</TableCell>
                                <TableCell>Наименование</TableCell>
                                <TableCell align="center">Кол-во</TableCell>
                                <TableCell align="right">Цена</TableCell>
                                <TableCell align="right">Сумма</TableCell>
                                <TableCell align="right">Скидка (%)</TableCell>
                                <TableCell align="right">Итого</TableCell>
                                <TableCell align="right"></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                                {addedProducts.map((product, index) => (
                                        <TableRow
                                            key={index}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell align='center'>{index + 1}</TableCell>
                                            <TableCell component="th" scope="row">
                                                {product.title}
                                            </TableCell>
                                            <TableCell align="center">
                                                <IconButton color="secondary" onClick={() => dispatch(decreaseProduct(product._id))}>
                                                    <RemoveCircleOutlineIcon />
                                                </IconButton>
                                                {product.quantity}
                                                <IconButton color="secondary" onClick={() => dispatch(increaseProduct(product._id))}>
                                                    <AddCircleOutlineIcon />
                                                </IconButton>
                                            </TableCell>
                                            <TableCell align="right">{product.price}</TableCell>
                                            <TableCell align="right">{product.price * product.quantity}</TableCell>
                                            <TableCell align="right">
                                                <TextField
                                                    type="number"
                                                    size="small"
                                                    sx={{width: '70px', padding: 0, border: 'none !important'}}
                                                    onChange={(e) =>  dispatch(changeDiscount({value: e.target.value, index}))}
                                                    value={product.discount}
                                                    InputProps={{ inputProps: { min: 0, max: 100 } }}
                                                />
                                            </TableCell>
                                            <TableCell align="right">{Math.round(product.price * product.quantity - (product.price * product.quantity * (product.discount / 100)))}</TableCell>
                                            <TableCell align="right"><Button size='small' variant='contained' onClick={() => deleteHandler(product._id)}>Удалить</Button></TableCell>
                                        </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                {addedProducts.length ?
                    <Grid>
                        <Grid container justifyContent='space-around' sx={{margin: '20px 0'}}>
                            <Typography variant='h5'>Сумма: <b>{total}</b> сом</Typography>
                            <Typography variant='h5'>Скидка: <b>{Math.round(total - totalWithDiscount)}</b> сом</Typography>
                            <Typography variant='h5'>Итого: <b>{totalWithDiscount} </b> сом</Typography>
                        </Grid>
                        <Grid container spacing={2} justifyContent='center'>
                            <Grid item>
                                <Button variant='contained'>Дублировать</Button>
                            </Grid>
                            <Grid item>
                                <Button variant='contained' onClick={cancelHandler}>Отмена</Button>
                            </Grid>
                            <Grid item>
                                <Button variant='contained'>Получить</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                   : null
                }
            </Grid>
        </Grid>
    );
};

export default CashierAddProduct;