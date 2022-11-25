import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {changeStatus, getOrders} from "../../store/actions/ordersActions";
import {Box, Button, Container, Grid, Modal, Typography} from "@mui/material";
import Spinner from "../../components/UI/Spinner/Spinner";
import TableAdmin from "../../components/UI/Table/Table";
import FormSelect from "../../components/UI/Form/FormSelect/FormSelect";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    maxHeight: 600,
    background: '#fff',
    border: 'none !important',
    boxShadow: 24,
    p: 4,
};


const AdminOrders = () => {
    const rowsHead = ['№', 'Имя', 'Телефон', 'Статус', 'Дата'];

    const orders = useSelector(state => state.orders.orders);
    const loading = useSelector(state => state.orders.error);
    const dispatch = useDispatch();

    const [openModal, setOpenModal] = useState(false);
    const [status, setStatus] = useState('');
    const [order, setOrder] = useState(null);

    useEffect(() => {
        dispatch(getOrders());
    }, [dispatch]);

    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    const openOrderModal = row => {
        setOrder(row);
        handleOpenModal();
    };

    const onChangeStatus = e => setStatus(e.target.value);

    const onSubmitStatus = () => {
        dispatch(changeStatus(order._id, status));
        handleCloseModal();
    };

    return (
        <>
            <Modal
                open={openModal}
                onClose={handleCloseModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
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
                </Box>
            </Modal>

            <Container>
                <Grid display='flex' justifyContent='space-between' alignItems='center' marginY='30px'>
                    <Typography variant='h5'>Заказы</Typography>
                </Grid>

                {loading ? <Spinner/> :
                    <Box>
                        {orders?.length > 0 ? <TableAdmin rowsHead={rowsHead} rows={orders} orders='Заказы'
                                                          onOpenOrderModal={openOrderModal}/> :
                            <Typography variant='h6'>Cashiers not found</Typography>}
                    </Box>
                }
            </Container>
        </>
    );
};

export default AdminOrders;