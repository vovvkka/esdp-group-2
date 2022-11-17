import axiosApi from "../../axiosApi";
import {createOrderFailure, createOrderRequest, createOrderSuccess} from "../slices/cartSlice";

export const createOrder = (orderData) => {
    return async dispatch => {
        try {
            dispatch(createOrderRequest());
            await axiosApi.post('/orders', orderData);
            dispatch(createOrderSuccess());
        } catch (e) {
            dispatch(createOrderFailure(e));
        }
    }
};

