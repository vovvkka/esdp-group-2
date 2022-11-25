import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getOrders} from "../../store/actions/orderActions";
import {Box, Container, Grid, Typography} from "@mui/material";
import Spinner from "../../components/UI/Spinner/Spinner";
import TableAdmin from "../../components/UI/Table/Table";

const AdminOrders = () => {
    const orders = useSelector(state => state.orders.orders);
    const loading = useSelector(state => state.orders.error);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getOrders());
    }, [dispatch]);

    const rowsHead = ['№', 'Имя', 'Телефон', 'Статус', 'Дата'];

    return (
        <Container>
            <Grid display='flex' justifyContent='space-between' alignItems='center' marginY='30px'>
                <Typography variant='h5'>Заказы</Typography>
            </Grid>
            {loading ? <Spinner/> :
                <Box>
                    {orders?.length > 0 ? <TableAdmin rowsHead={rowsHead} rows={orders} orders='Заказы'/> :
                        <Typography variant='h6'>Cashiers not found</Typography>}
                </Box>
            }
        </Container>
    );
};

export default AdminOrders;