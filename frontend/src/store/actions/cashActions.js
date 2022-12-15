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
    withdrawCashFailure,
    withdrawCashRequest,
    withdrawCashSuccess
} from "../slices/cashSlice";
import {purchased} from "../slices/cashboxSlice";
import {purchaseReceipt} from "../slices/shiftsSlice";
import {fetchProducts} from "./productsActions";

const WithdrawCash = 'Изъятие наличных';
const InsertCash = 'Внесение наличных';
const purchase = 'Продажа';
const returnPurchase = 'Возврат продажы';

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

            await axiosApi.post(`/operations`, operationData);

            dispatch(purchaseSuccess(operationData.total));
            dispatch(purchased());
            dispatch(purchaseReceipt());
            dispatch(fetchProducts());
        } catch (e) {
            dispatch(purchaseFailure(e));
        }
    };
};

