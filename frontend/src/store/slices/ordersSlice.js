import {createSlice} from "@reduxjs/toolkit";

const name = 'orders';

export const initialState = {
    orders: [],
    loading: false,
    error: null,
    createError: null,
};
const ordersSlice = createSlice({
    name,
    initialState,
    reducers: {
        addOrderRequest(state) {
            state.loading = true;
            state.createError = null;
        },
        addOrderSuccess(state) {
            state.loading = false;
        },
        addOrderFailure(state, action) {
            state.loading = false;
            state.createError = action.payload;
        },
        clearOrderError(state) {
            state.createError = null;
        },
        getOrdersRequest(state) {
            state.loading = true;
            state.error = null;
        },
        getOrdersSuccess(state, action) {
            state.loading = false;
            state.orders = action.payload;
        },
        getOrdersFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        changeStatusRequest(state) {
            state.loading = true;
            state.error = null;
        },
        changeStatusSuccess(state, action) {
            state.loading = false;

            if (action.payload.status === 'Закрыт') {
                state.orders.docs = [...state.orders.docs.filter(order => order._id !== action.payload._id)];
            } else {
                const idx = state.orders.docs.findIndex(order => order._id === action.payload._id);
                state.orders.docs[idx].status = action.payload.status;
            }
        },
        changeStatusFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
    }
});

export const {
    addOrderRequest,
    addOrderSuccess,
    addOrderFailure,
    clearOrderError,
    getOrdersRequest,
    getOrdersSuccess,
    getOrdersFailure,
    changeStatusRequest,
    changeStatusSuccess,
    changeStatusFailure
} = ordersSlice.actions;

export default ordersSlice;