import {createSlice} from "@reduxjs/toolkit";

const name = 'products';

export const initialState = {
    products: [],
    productsTable: [],
    product: null,
    fetchLoading: false,
    fetchError: null,
    createProductLoading: false,
    createProductError: null,
};

const productsSlice = createSlice({
    name,
    initialState,
    reducers: {
        fetchProductsRequest(state) {
            state.fetchLoading = true;
            state.fetchError = null;
        },
        fetchProductsSuccess(state, {payload: products}) {
            state.fetchLoading = false;
            state.products = products;
        },
        fetchProductsTableFailure(state, {payload: error}) {
            state.fetchLoading = false;
            state.fetchError = error;
        },
        fetchProductsTableRequest(state) {
            state.fetchLoading = true;
            state.fetchError = null;
        },
        fetchProductsTableSuccess(state, {payload: products}) {
            state.fetchLoading = false;
            state.productsTable = products;
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
            state.fetchLoading = true;
            state.fetchError = null;
        },
        fetchOneProductSuccess(state, {payload: product}) {
            state.fetchLoading = false;
            state.product = product;
        },
        fetchOneProductFailure(state, {payload: error}) {
            state.fetchLoading = false;
            state.fetchError = error;
        },
        deleteProductRequest(state) {
            state.fetchLoading = true;
            state.fetchError = null;
        },
        deleteProductSuccess(state, {payload: deletedProduct}) {
            state.fetchLoading = false;
            state.products = state.products.filter(product => product._id !== deletedProduct._id);
        },
        deleteProductFailure(state, {payload: error}) {
            state.fetchLoading = true;
            state.fetchError = error;
        },
    }
});
export const {
    fetchProductsRequest,
    fetchProductsSuccess,
    fetchProductsFailure,
    fetchProductsTableRequest,
    fetchProductsTableSuccess,
    fetchProductsTableFailure,
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