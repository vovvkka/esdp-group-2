import React, {useEffect, useState} from 'react';
import {Button, Grid, Paper, Typography} from "@mui/material";
import FormElement from "../UI/Form/FormElement/FormElement";
import FormSelect from "../UI/Form/FormSelect/FormSelect";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import {useDispatch, useSelector} from "react-redux";
import {addProductToCashbox, cancelAllCashbox, deleteProductFromCashbox} from "../../store/slices/cashboxSlice";

const CashierAddProduct = () => {
    const [state, setState] = useState({customer: '', barcode: ''});
    const addedProducts = useSelector(state => state.cashbox.products);
    const products = useSelector(state => state.products.products);
    const total = useSelector(state => state.cashbox.total);
    const user = useSelector(state => state.users.user);
    const dispatch = useDispatch();

    useEffect(() => {
        if (products.length) {
            const product = products.find(product => product.barcode === state.barcode);

            if (product && user.role === 'cashier') {
                dispatch(addProductToCashbox(product));
                setState(prev => ({
                    ...prev,
                    barcode: '',
                }));
            }
        }

    }, [state.barcode]);

    const stateChange = (name, value) => {
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
                    options={['Клиент', 'Постоянный клиент']}
                    xs={3}
                    onChange={(e) => stateChange(e.target.name, e.target.value)}
                    value={state.customer}
                />
            </Grid>
            <Grid>
                <TableContainer component={Paper} sx={{height: '55vh', overflow: 'auto'}}>
                    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="right">Номер</TableCell>
                                <TableCell>Наименование</TableCell>
                                <TableCell align="right">Кол-во</TableCell>
                                <TableCell align="right">Цена</TableCell>
                                <TableCell align="right">Сумма</TableCell>
                                <TableCell align="right">Скидка (%)</TableCell>
                                <TableCell align="right">Итого</TableCell>
                                <TableCell align="right"></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {addedProducts.map((product, index) => {
                                return <TableRow
                                    key={index}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell component="th" scope="row">
                                        {product.title}
                                    </TableCell>
                                    <TableCell align="right">{product.quantity}</TableCell>
                                    <TableCell align="right">{product.price}</TableCell>
                                    <TableCell align="right">{product.price * product.quantity}</TableCell>
                                    <TableCell align="right">{state.customer === 'Постоянный клиент' ? '5' : '0'}</TableCell>
                                    <TableCell align="right">{state.customer === 'Постоянный клиент' ? Math.round(product.price * product.quantity - (product.price * product.quantity) / 100 * 5) : product.price * product.quantity}</TableCell>
                                    <TableCell align="right"><Button size='small' variant='contained' onClick={() => deleteHandler(product._id)}>Удалить</Button></TableCell>
                                </TableRow>
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                {addedProducts.length ?
                    <Grid>
                        <Grid container justifyContent='space-around' sx={{margin: '20px 0'}}>
                            <Typography variant='h5'>Сумма: <b>{total}</b> сом</Typography>
                            <Typography variant='h5'>Скидка: <b>{state.customer === 'Постоянный клиент' ? Math.round(total / 100 * 5) : '0'}</b> сом</Typography>
                            <Typography variant='h5'>Итого: <b>{state.customer === 'Постоянный клиент' ? Math.round(total - total / 100 * 5) : total} </b> сом</Typography>
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