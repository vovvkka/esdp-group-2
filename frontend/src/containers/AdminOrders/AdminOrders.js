import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {closeOrder, collectOrder, deleteOrder, getOneOrders, getOrders} from "../../store/actions/orderActions";
import OrderCard from "../../components/OrderCard/OrderCard";
import {Box} from "@mui/material";
import Modal from "../../components/UI/Modal/Modal";
import {modalClose, modalOpen} from "../../store/actions/modalActions";

const AdminOrders = () => {
    const orders = useSelector(state => state.orders.orders);
    const order = useSelector(state => state.orders.order);
    const modal = useSelector(state => state.modal.modal);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getOrders());
    }, [dispatch]);

    const closeModal = async () => {
        await dispatch(modalClose())
        dispatch(getOrders());
    };

    const openModal = async (id) => {
        await dispatch(modalOpen())
        dispatch(getOneOrders(id));
    };

    const onSubmit = async (data) => {
        if (data.status === 'собран') {
            await dispatch(collectOrder(data.order));
            await dispatch(getOrders());
            await dispatch(modalClose())
        } else if (data.status === 'закрыт') {
            await dispatch(closeOrder(data.order));
            await dispatch(getOrders());
            await dispatch(modalClose())
        }
    };

    const deleteOrders = async (id) => {
        dispatch(deleteOrder(id));
        await dispatch(getOrders());
        dispatch(modalClose());
    };

    return (
        <>
            {modal ? <Modal
                show={modal}
                closed={() => closeModal()}
                order={order}
                onSubmit={(data) => onSubmit(data)}
                deleteOrder={(id) => deleteOrders(id)}
            /> : null}
            <Box sx={{display: 'flex', flexWrap: 'wrap'}}>
                {orders && orders.map(order => (
                    <OrderCard
                        key={order._id}
                        id={order._id}
                        status={order.status}
                        phone={order.phone}
                        customer={order.customer}
                        order={order.order}
                        address={order.address}
                        click={() => {openModal(order._id)}}
                        createdAt={order.createdAt}
                    />
                ))}
            </Box>
        </>
    );
};

export default AdminOrders;