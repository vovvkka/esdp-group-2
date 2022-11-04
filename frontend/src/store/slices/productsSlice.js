import {createSlice} from "@reduxjs/toolkit";

const name = 'products';

export const initialState = {
    products: [],
    fetchLoading: false,
    fetchError: null,
};
const productsSlice = createSlice({
    name,
    initialState,
    reducers: {
        fetchProductsRequest(state) {
            state.fetchLoading = true;
            state.loginError = null;
        },
        fetchProductsSuccess(state, {payload: products}) {
            state.fetchLoading = false;
            state.products = products;
        },
        fetchProductsFailure(state, {payload: error}) {
            state.fetchLoading = false;
            state.fetchError = error;
        },
    }
});
export const {
    fetchProductsRequest,
    fetchProductsSuccess,
    fetchProductsFailure,
} = productsSlice.actions

export default productsSlice;