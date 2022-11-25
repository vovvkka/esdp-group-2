import React from 'react';
import {Box, Typography, useMediaQuery} from "@mui/material";
import OrderForm from "../../components/OrderForm/OrderForm";
import {useDispatch, useSelector} from "react-redux";
import {addOrder} from "../../store/actions/ordersActions";
import theme from "../../theme";

const AddOrderProduct = () => {
    const errors = useSelector(state => state.orders.createError);
    const products = useSelector(state => state.cart.products);
    const matches = useMediaQuery(theme.breakpoints.down('md'));
    const dispatch = useDispatch();

    const addOrderData = async customerData => {
        const order = products.map(product => ({product: product._id, quantity: product.quantity}));
        const orderObj = {...customerData, order};
        await dispatch(addOrder(orderObj));
    };
    return (
        <Box marginTop={matches ? "180px" : 0} marginBottom={matches ? "50px" : 0}>
            <Typography
                textAlign="center"
                marginBottom="20px"
                variant="h4"
            >
                Оформление заказа
            </Typography>
            <OrderForm
                error={errors}
                onSubmit={addOrderData}
            />
        </Box>
    );
};

export default AddOrderProduct;