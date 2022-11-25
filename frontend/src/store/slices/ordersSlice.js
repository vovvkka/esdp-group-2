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

        changeStatusRequest(state) {
            state.loading = true;
            state.error = null;
        },
        changeStatusSuccess(state, action) {
            state.loading = false;
            const idx = state.orders.findIndex(order => order._id === action.payload._id);
            state.orders[idx].status = action.payload.status;
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
    getOrdersRequest,
    getOrdersSuccess,
    getOrdersFailure,
    changeStatusRequest,
    changeStatusSuccess,
    changeStatusFailure
} = ordersSlice.actions;

export default ordersSlice;