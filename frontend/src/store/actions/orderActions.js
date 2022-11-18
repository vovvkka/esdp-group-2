import axiosApi from "../../axiosApi";
import {historyPush} from "./historyActions";
import {addOrderFailure, addOrderRequest, addOrderSuccess} from "../slices/orderSlice";
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