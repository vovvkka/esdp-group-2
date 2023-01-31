import {createSlice} from "@reduxjs/toolkit";

const name = 'users';

export const initialState = {
    user: null,
    loginLoading: false,
    loginError: null,
    logoutLoading: false,
    logoutError: null
};

const usersSlice = createSlice({
    name,
    initialState,
    reducers: {
        loginRequest(state) {
            state.loginLoading = true;
            state.loginError = null;
        },
        loginSuccess(state, action) {
            state.loginLoading = false;
            state.user = action.payload;
        },
        loginFailure(state, action) {
            state.loginLoading = false;
            state.loginError = action.payload;
        },
        logoutRequest(state) {
            state.logoutLoading = true;
            state.logoutError = null;
        },
        logoutSuccess(state) {
            state.logoutLoading = false;
            state.user = null;
        },
        logoutFailure(state, action) {
            state.logoutLoading = false;
            state.logoutError = action.payload;
        },
        forgotPasswordRequest(state) {
            state.loginLoading = true;
            state.loginError = null;
        },
        forgotPasswordSuccess(state) {
            state.loginLoading = false;
        },
        forgotPasswordFailure(state, action) {
            state.loginLoading = false;
            state.loginError = action.payload;
        },
        resetPasswordRequest(state) {
            state.loginLoading = true;
            state.loginError = null;
        },
        resetPasswordSuccess(state) {
            state.loginLoading = false;
        },
        resetPasswordFailure(state, action) {
            state.loginLoading = false;
            state.loginError = action.payload;
        },
    }
});

export const {
    loginRequest,
    loginSuccess,
    loginFailure,
    logoutRequest,
    logoutSuccess,
    logoutFailure,
    forgotPasswordRequest,
    forgotPasswordSuccess,
    forgotPasswordFailure,
    resetPasswordRequest,
    resetPasswordSuccess,
    resetPasswordFailure
} = usersSlice.actions;

export default usersSlice;















