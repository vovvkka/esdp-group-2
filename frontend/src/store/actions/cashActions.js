import axiosApi from "../../axiosApi";
import {
    getCashFailure,
    getCashRequest,
    getCashSuccess,
    insertCashFailure,
    insertCashRequest,
    insertCashSuccess,
    purchaseFailure,
    purchaseRequest,
    purchaseSuccess,
    returnFailure,
    returnRequest,
    returnSuccess,
    withdrawCashFailure,
    withdrawCashRequest,
    withdrawCashSuccess
} from "../slices/cashSlice";
import {purchased} from "../slices/cashboxSlice";
import {purchaseReceipt} from "../slices/shiftsSlice";
import {fetchProducts} from "./productsActions";
import {fetchReceipt} from "../slices/operationsSlice";

const WithdrawCash = 'Изъятие наличных';
const InsertCash = 'Внесение наличных';
export const purchase = 'Продажа';
export const returnPurchase = 'Возврат продажи';

export const getCash = () => {
    return async (dispatch) => {
        try {
            dispatch(getCashRequest());
            const response = await axiosApi(`/cash`);
            dispatch(getCashSuccess(response.data.cash));
        } catch (e) {
            if (e.response && e.response.data) {
                dispatch(getCashFailure(e.response.data));
            } else {
                dispatch(getCashFailure({global: "No internet"}));
            }
        }
    };
};

export const insertCash = (operationData) => {
    return async (dispatch) => {
        try {
            operationData.title = InsertCash;
            dispatch(insertCashRequest());
            await axiosApi.put(`/cash`, operationData);
            dispatch(insertCashSuccess(operationData.amountOfMoney));
        } catch (e) {
            if (e.response && e.response.data) {
                dispatch(insertCashFailure(e.response.data));
            } else {
                dispatch(insertCashFailure({global: "No internet"}));
            }
        }
    };
};

export const withdrawCash = (operationData) => {
    return async (dispatch) => {
        try {
            operationData.title = WithdrawCash;
            dispatch(withdrawCashRequest());
            await axiosApi.put(`/cash`, operationData);
            dispatch(withdrawCashSuccess(operationData.amountOfMoney));
        } catch (e) {
            if (e.response && e.response.data) {
                dispatch(withdrawCashFailure(e.response.data));
            } else {
                dispatch(withdrawCashFailure({global: "No internet"}));
            }
        }
    };
};

export const purchaseOperation = (operationData) => {
    return async dispatch => {
        try {
            operationData.title = purchase;
            dispatch(purchaseRequest());

            const response = await axiosApi.post(`/operations`, operationData);

            dispatch(purchaseSuccess(operationData.total));
            dispatch(purchased());
            dispatch(purchaseReceipt());
            dispatch(fetchProducts('?perPage=8'));
            dispatch(fetchReceipt(response.data));
        } catch (e) {
            dispatch(purchaseFailure(e));
        }
    };
};

export const returnOperation = (operationData) => {
    return async dispatch => {
        try {
            operationData.title = returnPurchase;
            dispatch(returnRequest());

            await axiosApi.post(`/operations`, operationData);

            dispatch(returnSuccess(operationData.total));
            dispatch(fetchProducts());
        } catch (e) {
            dispatch(returnFailure(e));
        }
    };
};

