import React from 'react';
import {Typography} from "@mui/material";
import OrderForm from "../../components/OrderForm/OrderForm";
import {useDispatch, useSelector} from "react-redux";
import {addOrder} from "../../store/actions/orderActions";

const AddOrderProduct = () => {
    const errors = useSelector(state => state.orders.createError);
    const products = useSelector(state => state.cart.products);
    const dispatch = useDispatch();

    const addOrderData = async customerData => {
        const order = products.map(product => ({product: product._id, quantity: product.quantity}));
        const orderObj = {...customerData, order};
        await dispatch(addOrder(orderObj));
    };
    return (
        <>
            <Typography
                textAlign="center"
                marginTop="150px"
                marginBottom="20px"
                variant="h4"
            >
                Оформление заказа
            </Typography>
            <OrderForm
                error={errors}
                onSubmit={addOrderData}
            />
        </>
    );
};

export default AddOrderProduct;