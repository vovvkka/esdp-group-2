import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {changeStatus, getClosedOrders, getNewOrders} from "../../store/actions/ordersActions";
import {Box, Button, Container, Grid, Typography} from "@mui/material";
import Spinner from "../../components/UI/Spinner/Spinner";
import TableAdmin from "../../components/UI/Table/Table";
import FormSelect from "../../components/UI/Form/FormSelect/FormSelect";
import CustomModal from "../../components/UI/Modal/Modal";
import {setModalClosed, setModalOpen} from "../../store/slices/appSLice";
import {Link, useLocation} from "react-router-dom";


const AdminOrders = () => {
    const rowsHead = ['№', 'Имя', 'Телефон', 'Статус', 'Дата'];

    const orders = useSelector(state => state.orders.orders);
    const loading = useSelector(state => state.orders.loading);
    const modalOpen = useSelector(state => state.app.modalOpen);
    const dispatch = useDispatch();

    console.log(orders);

    let location = useLocation();
    const [status, setStatus] = useState('');
    const [order, setOrder] = useState(null);

    useEffect(() => {
        if (location.pathname === '/admin/orders/archive') {
            dispatch(getClosedOrders());
        } else if (location.pathname === '/admin/orders') {
            dispatch(getNewOrders());
        }
    }, [dispatch, location.pathname]);

    const openOrderModal = async (row) => {
        await setOrder(row);
        dispatch(setModalOpen());
    };

    const onChangeStatus = e => setStatus(e.target.value);

    const onSubmitStatus = () => {
        dispatch(changeStatus(order._id, status));
        dispatch(setModalClosed());
    };

    return (
        <>
            <CustomModal
                isOpen={modalOpen}
                handleClose={() => dispatch(setModalClosed())}
            >
                <Box width='550px'>
                    <Grid sx={{maxHeight: 400, overflowY: 'scroll', marginBottom: '30px'}}>
                        <Typography textAlign="center" variant="h4" gutterBottom><b>Информация о заказе</b></Typography>

                        <Typography variant="h5"><b>Контакты:</b></Typography>
                        <Typography><b>Заказчик:</b> {order && order.customer}</Typography>
                        <Typography><b>Телефон:</b> {order && order.phone}</Typography>
                        <Typography><b>Адрес:</b> {order && order.address}</Typography>

                        <Typography variant="h5" sx={{marginTop: '20px'}} gutterBottom><b>Заказ:</b></Typography>
                        {order && order.order.map(order => (
                            <Typography key={order._id}>{order.product.title} <b>x{order.quantity}</b></Typography>
                        ))}
                    </Grid>

                    {order && order.status !== 'Закрыт' && (
                        <Grid>
                            <FormSelect
                                options={["Новый", "Собран", "Закрыт"]}
                                label="Статус"
                                onChange={onChangeStatus}
                                value={status}
                                name="status"
                            />

                            <Button
                                variant="contained"
                                sx={{color: '#fff !important', marginTop: '10px'}}
                                onClick={onSubmitStatus}
                            >
                                Сохранить
                            </Button>
                        </Grid>
                    )}
                </Box>
            </CustomModal>

            <Container>
                <Grid display='flex' justifyContent='space-between' alignItems='center' marginY='30px'>
                    <Typography variant='h5'>Заказы</Typography>
                    <Button
                        variant="contained"
                        sx={{color: '#fff'}}
                        component={Link}
                        to={location.pathname.includes('archive') ? "/admin/orders" : "/admin/orders/archive"}
                    >
                        {location.pathname.includes('archive') ? 'Назад' : 'Архив'}
                    </Button>
                </Grid>

                {loading ? <Spinner/> :
                    <Box>
                        {orders?.length > 0 ?
                            <TableAdmin rowsHead={rowsHead} rows={orders} orders='Заказы'
                                        onOpenOrderModal={openOrderModal}/> : 'Новых заказов нет.'}
                    </Box>
                }
            </Container>
        </>
    );
};

export default AdminOrders;