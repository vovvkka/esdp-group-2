import {createSlice} from "@reduxjs/toolkit";

const name = 'orders';

export const initialState = {
    orders: [],
    order: null,
    loading: false,
    createError: null,
};
const orderSlice = createSlice({
    name,
    initialState,
    reducers: {
        addOrderRequest(state) {
            state.loading = true;
            state.error = null;
        },
        addOrderSuccess(state) {
            state.loading = false;
        },
        addOrderFailure(state, action) {
            state.loading = false;
            state.createError = action.payload;
        },

        getOrdersRequest(state) {
            state.loading = true;
            state.error = null;
        },
        getOrdersSuccess(state, action) {
            state.loading = false;
            state.error = null;
            state.orders = action.payload;
        },
        getOrdersFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },

        getOneOrdersRequest(state) {
            state.loading = true;
            state.error = null;
        },
        getOneOrdersSuccess(state, action) {
            state.loading = false;
            state.error = null;
            state.order = action.payload;
        },
        getOneOrdersFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },

        collectOrderRequest(state) {
            state.loading = true;
            state.error = null;
        },
        collectOrderSuccess(state) {
            state.loading = false;
            state.error = null;
        },
        collectOrderFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },

        closeOrderRequest(state) {
            state.loading = true;
            state.error = null;
        },
        closeOrderSuccess(state) {
            state.loading = false;
            state.error = null;
        },
        closeOrderFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },

        deleteOrderRequest(state) {
            state.loading = true;
            state.error = null;
        },
        deleteOrderSuccess(state) {
            state.loading = false;
            state.error = null;
        },
        deleteOrderFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
    }
});

export const {
    addOrderRequest,
    addOrderSuccess,
    addOrderFailure,
    getOrdersRequest,
    getOrdersSuccess,
    getOrdersFailure,
    getOneOrdersRequest,
    getOneOrdersSuccess,
    getOneOrdersFailure,
    collectOrderRequest,
    collectOrderSuccess,
    collectOrderFailure,
    closeOrderRequest,
    closeOrderSuccess,
    closeOrderFailure,
    deleteOrderRequest,
    deleteOrderSuccess,
    deleteOrderFailure,
} = orderSlice.actions;

export default orderSlice;