import {createSlice} from "@reduxjs/toolkit";

const name = 'cashbox';

export const initialState = {
    products: [],
    total: 0,
};

const cashboxSlice = createSlice({
    name,
    initialState,
    reducers: {
        addProductToCashbox(state, action) {
            const product = state.products.find(item => item._id === action.payload._id);
            const index = state.products.findIndex(item => item._id === action.payload._id);

            if (!product) {
                state.products = [...state.products, {...action.payload, quantity: 1}];
            } else {
                state.products[index] = {...state.products[index], quantity: product.quantity + 1};
            }

            state.total = state.products.reduce((acc, item) => acc + (item.price * item.quantity), 0);
        },
        deleteProductFromCashbox(state, action) {
            state.products = state.products.filter(product => product._id !== action.payload);
            state.total = state.products.reduce((acc, item) => acc + (item.price * item.quantity), 0);
        },
        cancelAllCashbox(state) {
            state.products = [];
        }
    }
});

export const {
    addProductToCashbox,
    deleteProductFromCashbox,
    cancelAllCashbox
} = cashboxSlice.actions;

export default cashboxSlice;