import {createSlice} from "@reduxjs/toolkit";

const name = 'cashbox';

export const initialState = {
    products: [],
    total: 0,
    totalWithDiscount: 0,
    customer: '',
};

const cashboxSlice = createSlice({
    name,
    initialState,
    reducers: {
        addProductToCashbox(state, action) {
            const product = state.products.find(item => item._id === action.payload._id);
            const index = state.products.findIndex(item => item._id === action.payload._id);

            if (!product) {
                if (state.customer) {
                    state.products = [{...action.payload, quantity: 1, discount: state.customer.discount}, ...state.products];
                } else {
                    state.products = [{...action.payload, quantity: 1, discount: 0}, ...state.products];
                }
            } else {
                if (state.customer) {
                    state.products[index] = {...state.products[index], quantity: product.quantity + 1, discount: state.customer.discount};
                } else {
                    state.products[index] = {...state.products[index], quantity: product.quantity + 1, discount: 0};
                }
            }

            state.total = state.products.reduce((acc, item) => acc + (item.price * item.quantity), 0);
            state.totalWithDiscount = Math.round(state.products.reduce((acc, item) => acc + (item.price * item.quantity - item.price * item.quantity * (item.discount / 100)), 0));
            },
        deleteProductFromCashbox(state, action) {
            state.products = state.products.filter(product => product._id !== action.payload);
            state.total = state.products.reduce((acc, item) => acc + (item.price * item.quantity), 0);
            state.totalWithDiscount = Math.round(state.products.reduce((acc, item) => acc + (item.price * item.quantity - item.price * item.quantity * (item.discount / 100)), 0));
            },
        cancelAllCashbox(state) {
            state.products = [];

            state.total = 0;
            state.totalWithDiscount = 0;
        },
        setCustomer(state, action) {
            const customer = action.payload;
            state.customer = customer;
            state.products = state.products.map(product => ({...product, discount: customer.discount}));

            state.total = state.products.reduce((acc, item) => acc + (item.price * item.quantity), 0);
            state.totalWithDiscount = Math.round(state.products.reduce((acc, item) => acc + (item.price * item.quantity - item.price * item.quantity * (item.discount / 100)), 0));        },
        changeDiscount(state, action) {
            const index = action.payload.index;
            let discount = action.payload.value;

            if (discount > 100) {
                discount = 100;
            }

            if (discount < 0) {
                discount = 0;
            }

            if (discount) {
                state.products[index].discount = Number(discount);
            } else {
                state.products[index].discount = '';
            }

            state.total = state.products.reduce((acc, item) => acc + (item.price * item.quantity), 0);
            state.totalWithDiscount = Math.round(state.products.reduce((acc, item) => acc + (item.price * item.quantity - item.price * item.quantity * (item.discount / 100)), 0));
        },
        changePrice(state, action) {
            const {index, value} = action.payload;

            if (value) {
                state.products[index].price = Number(value);
            } else {
                state.products[index].price = '';
            }

            state.total = state.products.reduce((acc, item) => acc + (item.price * item.quantity), 0);
            state.totalWithDiscount = Math.round(state.products.reduce((acc, item) => acc + (item.price * item.quantity - item.price * item.quantity * (item.discount / 100)), 0));
        },
        decreaseProduct(state, action) {
            const product = state.products.find(item => item._id === action.payload);
            const index = state.products.findIndex(item => item._id === action.payload);

            if (product.quantity > 1) {
                state.products[index] = {...state.products[index], quantity: product.quantity - 1};
            } else {
                state.products = state.products.filter(product => product._id !== action.payload);
            }

            state.total = state.products.reduce((acc, item) => acc + (item.price * item.quantity), 0);
            state.totalWithDiscount = Math.round(state.products.reduce((acc, item) => acc + (item.price * item.quantity - item.price * item.quantity * (item.discount / 100)), 0));
        },
        increaseProduct(state, action) {
            const product = state.products.find(item => item._id === action.payload);
            const index = state.products.findIndex(item => item._id === action.payload);

            state.products[index] = {...state.products[index], quantity: product.quantity + 1};

            state.total = state.products.reduce((acc, item) => acc + (item.price * item.quantity), 0);
            state.totalWithDiscount = Math.round(state.products.reduce((acc, item) => acc + (item.price * item.quantity - item.price * item.quantity * (item.discount / 100)), 0));
        },
        purchased(state) {
            state.total = 0;
            state.totalWithDiscount = 0;
            state.products = [];
            state.customer = '';
        }
    }
});

export const {
    addProductToCashbox,
    deleteProductFromCashbox,
    cancelAllCashbox,
    changeDiscount,
    changePrice,
    setCustomer,
    decreaseProduct,
    increaseProduct,
    purchased
} = cashboxSlice.actions;

export default cashboxSlice;