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
            const itemInCart = state.products.find((item) => item._id === action.payload._id);
            if (itemInCart) {
                if(itemInCart.amount>=itemInCart.quantity) {
                    itemInCart.quantity++;
                }
            } else {
                state.products.push({ ...action.payload, quantity: 1 });
            }
        },
        reduceProduct(state,action) {
            const itemInCart = state.products.find((item) => item._id === action.payload);
            if(itemInCart.quantity===1){
                state.products = state.products.filter(product => product._id !== action.payload);
            }else{
                itemInCart.quantity--;
            }
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
        clearCart(state) {
            state.products = [];
        }
    }
});

export const {
    addProduct,
    reduceProduct,
    deleteProduct,
    clearCart,
} = cartSlice.actions;

export default cartSlice;