import {
    addCashierFailure,
    addCashierRequest,
    addCashierSuccess,
    getCashiersFailure,
    getCashiersRequest,
    getCashiersSuccess
} from "../slices/cashiersSlice";
import axiosApi from "../../axiosApi";
import {historyPush} from "./historyActions";

export const addCashier = cashierData => {
    return async dispatch => {
        try {
            dispatch(addCashierRequest());
            await axiosApi.post('/users', {...cashierData, role: 'cashier'});

            dispatch(addCashierSuccess());
            dispatch(historyPush('/admin/cashiers'));
        } catch (e) {
            if (e.response && e.response.data) {
                dispatch(addCashierFailure(e.response.data));
            } else {
                dispatch(addCashierFailure({global: 'No internet'}));
            }
        }
    };
};

export const getCashiers = () => {
    return async dispatch => {
        try {
            dispatch(getCashiersRequest());
            const response = await axiosApi('/cashiers');
            dispatch(getCashiersSuccess(response.data));
        } catch (e) {
            dispatch(getCashiersFailure(e));
        }
    };
};