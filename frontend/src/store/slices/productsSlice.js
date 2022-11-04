import {createSlice} from "@reduxjs/toolkit";

const name = 'products';

export const initialState = {
    products: [],
    fetchLoading: false,
    fetchError: null,

    product: null,
    singleLoading: false,
    singleError: null,

    createProductLoading: false,
    createProductError: null,

    deleteLoading: false,
    deleteError: null,
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
        createProductRequest(state) {
            state.createProductLoading = true;
            state.createProductError = null;
        },
        createProductSuccess(state) {
            state.createProductLoading = false;
            state.createProductError = null;
        },
        createProductFailure(state, {payload: error}) {
            state.createProductLoading = false;
            state.createProductError = error;
        },
        fetchOneProductRequest(state) {
            state.singleLoading = true;
            state.singleError = null;
        },
        fetchOneProductSuccess(state,{payload: product}) {
            state.singleLoading = false;
            state.product = product;
        },
        fetchOneProductFailure(state, {payload: error}) {
            state.singleLoading = false;
            state.singleError = error;
        },
        deleteProductRequest(state) {
            state.deleteLoading = true;
            state.deleteError = null;
        },
        deleteProductSuccess(state) {
            state.deleteLoading = false;
        },
        deleteProductFailure(state, {payload: error}) {
            state.deleteLoading = false;
            state.deleteError = error;
        },

    }
});
export const {
    fetchProductsRequest,
    fetchProductsSuccess,
    fetchProductsFailure,
    fetchOneProductRequest,
    fetchOneProductSuccess,
    fetchOneProductFailure,
    createProductRequest,
    createProductSuccess,
    createProductFailure,
    deleteProductRequest,
    deleteProductSuccess,
    deleteProductFailure,
} = productsSlice.actions

export default productsSlice;