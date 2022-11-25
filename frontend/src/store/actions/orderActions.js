import axiosApi from "../../axiosApi";
import {historyPush} from "./historyActions";
import {
    addOrderFailure,
    addOrderRequest,
    addOrderSuccess,
    getOrdersFailure,
    getOrdersRequest,
    getOrdersSuccess
} from "../slices/ordersSlice";
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

// export const collectOrder = (id) => {
//     return async dispatch => {
//         try {
//             dispatch(collectOrderRequest());
//             await axiosApi.put(`/orders/${id}/collect`);
//             dispatch(collectOrderSuccess());
//         } catch (e) {
//             if (e.response && e.response.data) {
//                 dispatch(collectOrderFailure(e.response.data));
//             } else {
//                 dispatch(collectOrderFailure({global: 'No internet'}));
//             }
//         }
//     };
// };