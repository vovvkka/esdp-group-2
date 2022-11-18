import {combineReducers} from "redux";
import {loadFromLocalStorage, saveToLocalStorage} from "./localStorage";
import axiosApi from "../axiosApi";
import {configureStore} from "@reduxjs/toolkit";
import usersSlice, {initialState} from "./slices/usersSlice";
import thunk from "redux-thunk";
import categoriesSlice from "./slices/categoriesSlice";
import productsSlice from "./slices/productsSlice";
import cashiersSlice from "./slices/cashiersSlice";
import appSlice from "./slices/appSLice";
import newsSlice from "./slices/newsSlice";
import orderSlice from "./slices/orderSlice";
import cartSlice from "./slices/cartSlice";

const rootReducer = combineReducers({
    users: usersSlice.reducer,
    categories: categoriesSlice.reducer,
    products: productsSlice.reducer,
    cashiers: cashiersSlice.reducer,
    app: appSlice.reducer,
    news: newsSlice.reducer,
    orders: orderSlice.reducer,
    cart: cartSlice.reducer,
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
            ...initialState,
            user: store.getState().users.user,
        }
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