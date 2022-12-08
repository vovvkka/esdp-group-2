import {combineReducers} from "redux";
import {loadFromLocalStorage, saveToLocalStorage} from "./localStorage";
import axiosApi from "../axiosApi";
import {configureStore} from "@reduxjs/toolkit";
import usersSlice from "./slices/usersSlice";
import thunk from "redux-thunk";
import categoriesSlice from "./slices/categoriesSlice";
import productsSlice from "./slices/productsSlice";
import cashiersSlice from "./slices/cashiersSlice";
import appSlice from "./slices/appSLice";
import newsSlice from "./slices/newsSlice";
import ordersSlice from "./slices/ordersSlice";
import cartSlice from "./slices/cartSlice";
import shiftsSlice from "./slices/shiftsSlice";
import cashboxSlice from "./slices/cashboxSlice";
import cashSlice from "./slices/cashSlice";
import contactsSlice from "./slices/contactsSlice";
import adminSlice from "./slices/adminSlice";
import clientsSlice from "./slices/clientsSlice";

const rootReducer = combineReducers({
    users: usersSlice.reducer,
    categories: categoriesSlice.reducer,
    products: productsSlice.reducer,
    cashiers: cashiersSlice.reducer,
    app: appSlice.reducer,
    news: newsSlice.reducer,
    orders: ordersSlice.reducer,
    cart: cartSlice.reducer,
    shifts: shiftsSlice.reducer,
    cashbox: cashboxSlice.reducer,
    cash: cashSlice.reducer,
    contacts: contactsSlice.reducer,
    admin: adminSlice.reducer,
    clients: clientsSlice.reducer,
});

const persistedState = loadFromLocalStorage();
const middleware = [thunk];

const store = configureStore({
    reducer: rootReducer,
    middleware,
    devTools: true,
    preloadedState: persistedState,
});


store.subscribe(() => {
    saveToLocalStorage({
        users: {
            user: store.getState().users.user,
        },
        cart: {
            products: store.getState().cart.products,
        },
        shifts: {
            shift: store.getState().shifts.shift,
        },
        cash: {
            cash: store.getState().cash.cash,
        },
    })
});

axiosApi.interceptors.request.use(config => {
    try {
        config.headers['Authorization'] = store.getState().users.user.token;
    } catch (e) {}

    return config;
});

axiosApi.interceptors.response.use(res => res, e => {
    if (!e.response.data) {
        e.response = {data: {global: 'No internet!'}};
    }

    throw e;
});

export default store;