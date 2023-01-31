import {createSlice} from "@reduxjs/toolkit";

const name = 'cashiers';

export const initialState = {
    cashiers: [],
    cashier: null,
    loading: false,
    error: null,
};

const cashiersSlice = createSlice({
    name,
    initialState,
    reducers: {
        getCashiersRequest(state) {
            state.loading = true;
            state.error = null;
        },
        getCashiersSuccess(state, action) {
            state.loading = false;
            state.cashiers = action.payload;
        },
        getCashiersFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        getCashierRequest(state) {
            state.loading = true;
            state.error = null;
        },
        getCashierSuccess(state, action) {
            state.loading = false;
            state.cashier = action.payload;
        },
        getCashierFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        addCashierRequest(state) {
            state.loading = true;
            state.error = null;
        },
        addCashierSuccess(state) {
            state.loading = false;
        },
        addCashierFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        editCashierRequest(state) {
            state.loading = true;
            state.error = null;
        },
        editCashierSuccess(state) {
            state.loading = false;
        },
        editCashierFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        deleteCashierRequest(state) {
            state.loading = true;
            state.error = null;
        },
        deleteCashierSuccess(state,action) {
            state.loading = false;
            state.cashiers = state.cashiers.filter(i => i._id !== action.payload);
        },
        deleteCashierFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
    }
});

export const {
    getCashiersRequest,
    getCashiersSuccess,
    getCashiersFailure,
    getCashierRequest,
    getCashierSuccess,
    getCashierFailure,
    addCashierRequest,
    addCashierSuccess,
    addCashierFailure,
    editCashierRequest,
    editCashierSuccess,
    editCashierFailure,
    deleteCashierRequest,
    deleteCashierSuccess,
    deleteCashierFailure
} = cashiersSlice.actions;


export default cashiersSlice;














