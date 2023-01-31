import {createSlice} from "@reduxjs/toolkit";

const name = 'cash';

export const initialState = {
    cash: null,
    loading: false,
    error: null,
};
const cashSlice = createSlice({
    name,
    initialState,
    reducers: {
        insertCashRequest(state) {
            state.loading = true;
            state.error = null;
        },
        insertCashSuccess(state,action) {
            state.cash = state.cash + (+action.payload);
            state.loading = false;
        },
        insertCashFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        withdrawCashRequest(state) {
            state.loading = true;
            state.error = null;
        },
        withdrawCashSuccess(state,action) {
            state.cash = state.cash - (+action.payload);
            state.loading = false;
        },
        withdrawCashFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        getCashRequest(state) {
            state.loading = true;
            state.error = null;
        },
        getCashSuccess(state, action) {
            state.cash = action.payload;
            state.loading = false;
            state.orders = action.payload;
        },
        getCashFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        clearCash(state) {
            state.loading = false;
            state.error = null;
            state.cash = null;
        },
        purchaseRequest(state) {
            state.loading = true;
            state.error = null;
        },
        purchaseSuccess(state, action) {
            state.cash = state.cash + (+action.payload);
            state.loading = false;
        },
        purchaseFailure(state, {payload: error}) {
            state.loading = false;
            state.error = error;
        },
        returnRequest(state) {
            state.loading = true;
            state.error = null;
        },
        returnSuccess(state, action) {
            state.cash = state.cash - (+action.payload);
            state.loading = false;
        },
        returnFailure(state, {payload: error}) {
            state.loading = false;
            state.error = error;
        }
    }
});

export const {
    clearCash,
    getCashRequest,
    getCashSuccess,
    getCashFailure,
    insertCashRequest,
    insertCashSuccess,
    insertCashFailure,
    withdrawCashRequest,
    withdrawCashSuccess,
    withdrawCashFailure,
    purchaseRequest,
    purchaseSuccess,
    purchaseFailure,
    returnRequest,
    returnSuccess,
    returnFailure
} = cashSlice.actions;

export default cashSlice;