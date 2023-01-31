import {createSlice} from "@reduxjs/toolkit";

const name = 'products';

export const initialState = {
    products: [],
    productsSearch: [],
    product: null,
    key: null,
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
        fetchProductsFailure(state, {payload: error}) {
            state.fetchLoading = false;
            state.fetchError = error;
        },fetchProductsSearchRequest(state) {
            state.fetchLoading = true;
            state.fetchError = null;
        },
        fetchProductsSearchSuccess(state, {payload: products}) {
            state.fetchLoading = false;
            state.productsSearch = products;
        },
        fetchProductsSearchFailure(state, {payload: error}) {
            state.fetchLoading = false;
            state.fetchError = error;
        },setKey(state, {payload: key}) {
            state.key = key;
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
            state.createProductError = null;
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
            state.products.docs = state.products.docs?.filter(product => product._id !== deletedProduct._id);
        },
        deleteProductFailure(state, {payload: error}) {
            state.fetchLoading = true;
            state.fetchError = error;
        },
        editProductRequest(state) {
            state.createProductLoading = true;
            state.createProductError = null;
        },
        editProductSuccess(state) {
            state.createProductLoading = false;
        },
        editProductFailure(state, action) {
            state.createProductLoading = false;
            state.createProductError = action.payload;
        },
        clearProduct(state) {
            state.product = null;
        },
        clearProducts(state) {
            state.productsSearch = [];
        }
    }
});
export const {
    fetchProductsRequest,
    fetchProductsSuccess,
    fetchProductsFailure,
    setKey,
    fetchProductsSearchRequest,
    fetchProductsSearchSuccess,
    fetchProductsSearchFailure,
    fetchOneProductRequest,
    fetchOneProductSuccess,
    fetchOneProductFailure,
    createProductRequest,
    createProductSuccess,
    createProductFailure,
    deleteProductRequest,
    deleteProductSuccess,
    deleteProductFailure,
    editProductRequest,
    editProductSuccess,
    editProductFailure,
    clearProduct,
    clearProducts,
} = productsSlice.actions

export default productsSlice;