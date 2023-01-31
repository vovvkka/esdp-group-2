import {
    addCashierFailure,
    addCashierRequest,
    addCashierSuccess, deleteCashierFailure,
    deleteCashierRequest, deleteCashierSuccess,
    editCashierFailure,
    editCashierRequest,
    editCashierSuccess,
    getCashierFailure,
    getCashierRequest,
    getCashiersFailure,
    getCashiersRequest,
    getCashiersSuccess,
    getCashierSuccess
} from "../slices/cashiersSlice";
import axiosApi from "../../axiosApi";
import {historyPush} from "./historyActions";

export const addCashier = cashierData => {
    return async dispatch => {
        try {
            dispatch(addCashierRequest());
            await axiosApi.post('/users', cashierData);

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

export const editCashier = (id, cashierData) => {
    return async dispatch => {
        try {
            dispatch(editCashierRequest());
            await axiosApi.put('/cashiers/' + id, cashierData);

            dispatch(editCashierSuccess());
            dispatch(historyPush('/admin/cashiers'));
        } catch (e) {
            if (e.response && e.response.data) {
                dispatch(editCashierFailure(e.response.data));
            } else {
                dispatch(editCashierFailure({global: 'No internet'}));
            }
        }
    };
};

export const deleteCashier = id => {
    return async dispatch => {
        try {
            dispatch(deleteCashierRequest());
            await axiosApi.delete('/cashiers/' + id);

            dispatch(deleteCashierSuccess(id));
        } catch (e) {
            if (e.response && e.response.data) {
                dispatch(deleteCashierFailure(e.response.data));
            } else {
                dispatch(deleteCashierFailure({global: 'No internet'}));
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

export const getCashier = id => {
    return async dispatch => {
        try {
            dispatch(getCashierRequest());
            const response = await axiosApi('/cashiers/' + id);
            dispatch(getCashierSuccess(response.data));
        } catch (e) {
            dispatch(getCashierFailure(e));
        }
    };
};