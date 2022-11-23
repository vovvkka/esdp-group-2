import axiosApi from "../../axiosApi";
import {historyPush} from "./historyActions";
import {
    addOrderFailure,
    addOrderRequest,
    addOrderSuccess,
    closeOrderFailure,
    closeOrderRequest,
    closeOrderSuccess,
    collectOrderFailure,
    collectOrderRequest,
    collectOrderSuccess,
    deleteOrderFailure,
    deleteOrderRequest,
    deleteOrderSuccess,
    getOneOrdersFailure,
    getOneOrdersRequest,
    getOneOrdersSuccess,
    getOrdersFailure,
    getOrdersRequest,
    getOrdersSuccess
} from "../slices/orderSlice";
import {clearCart} from "../slices/cartSlice";


export const addOrder = orderData => {
    return async dispatch => {
        try {
            dispatch(addOrderRequest());
            await axiosApi.post('/orders', orderData);
            dispatch(addOrderSuccess());
            dispatch(historyPush('/'));
            dispatch(clearCart());
        } catch (e) {
            if (e.response && e.response.data) {
                dispatch(addOrderFailure(e.response.data));
            } else {
                dispatch(addOrderFailure({global: 'No internet'}));
            }
        }
    };
};

export const getOrders = () => {
    return async dispatch => {
        try {
            dispatch(getOrdersRequest());
            const response = await axiosApi(`/orders`);
            dispatch(getOrdersSuccess(response.data));
        } catch (e) {
            if (e.response && e.response.data) {
                dispatch(getOrdersFailure(e.response.data));
            } else {
                dispatch(getOrdersFailure({global: 'No internet'}));
            }
        }
    };
};

export const getOneOrders = (id) => {
    return async dispatch => {
        try {
            dispatch(getOneOrdersRequest());
            const response = await axiosApi(`/orders/${id}`);
            dispatch(getOneOrdersSuccess(response.data));
        } catch (e) {
            if (e.response && e.response.data) {
                dispatch(getOneOrdersFailure(e.response.data));
            } else {
                dispatch(getOneOrdersFailure({global: 'No internet'}));
            }
        }
    };
};

export const collectOrder = (id) => {
    return async dispatch => {
        try {
            dispatch(collectOrderRequest());
            await axiosApi.put(`/orders/${id}/collect`);
            dispatch(collectOrderSuccess());
        } catch (e) {
            if (e.response && e.response.data) {
                dispatch(collectOrderFailure(e.response.data));
            } else {
                dispatch(collectOrderFailure({global: 'No internet'}));
            }
        }
    };
};

export const closeOrder = (id) => {
    return async dispatch => {
        try {
            dispatch(closeOrderRequest());
            await axiosApi.put(`/orders/${id}/close`);
            dispatch(closeOrderSuccess());
        } catch (e) {
            if (e.response && e.response.data) {
                dispatch(closeOrderFailure(e.response.data));
            } else {
                dispatch(closeOrderFailure({global: 'No internet'}));
            }
        }
    };
};

export const deleteOrder = (id) => {
    return async dispatch => {
        try {
            dispatch(deleteOrderRequest());
            await axiosApi.delete(`/orders/${id}`);
            dispatch(deleteOrderSuccess());
        } catch (e) {
            if (e.response && e.response.data) {
                dispatch(deleteOrderFailure(e.response.data));
            } else {
                dispatch(deleteOrderFailure({global: 'No internet'}));
            }
        }
    };
};