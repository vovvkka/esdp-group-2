import {createSlice} from "@reduxjs/toolkit";

const name = 'cart';

export const initialState = {
    products: [],
    loading: false,
    error: null,
};

const cartSlice = createSlice({
    name,
    initialState,
    reducers: {
        addProduct(state,action) {
            state.products = state.products.map(product => {
                if(product._id === action.payload){
                    product.quantity? product.quantity++ : product.quantity=1
                }
            })
        },
        reduceProduct(state,action) {
            state.products = state.products.filter(product => {
                if(product.quantity===1){
                    return state.products = state.products.filter(product => product._id !== action.payload);
                }
                if(product._id === action.payload){
                    product.quantity--;
                }
            })
        },
        deleteProduct(state, action) {
            state.products = state.products.filter(product => product._id !== action.payload);
        },
        createOrderRequest(state) {
            state.loading = true;
            state.error = null;
        },
        createOrderSuccess(state) {
            state.loading = false;
        },
        createOrderFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
    }
});

export const {
    addProduct,
    reduceProduct,
    deleteProduct,
    createOrderRequest,
    createOrderSuccess,
    createOrderFailure,
} = cartSlice.actions;

export default cartSlice;