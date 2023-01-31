import {createSlice} from "@reduxjs/toolkit";

const name = 'admin';

export const initialState = {
    adminProfile: null,
    error: null,
    loading: false
};

const adminSlice = createSlice({
    name,
    initialState,
    reducers: {
        fetchAdminProfileRequest(state) {
            state.loading = true;
            state.error = null;
        },
        fetchAdminProfileSuccess(state, action) {
            state.adminProfile = action.payload;
            state.loading = false;
        },
        fetchAdminProfileFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        editAdminProfileRequest(state) {
            state.loading = true;
            state.error = null;
        },
        editAdminProfileSuccess(state) {
            state.loading = false;
        },
        editAdminProfileFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        changePasswordRequest(state) {
            state.loading = true;
            state.error = null;
        },
        changePasswordSuccess(state) {
            state.loading = true;
        },
        changePasswordFailure(state, action) {
            state.loading = true;
            state.error = action.payload;
        }
    }
});

export const {
    fetchAdminProfileRequest,
    fetchAdminProfileSuccess,
    fetchAdminProfileFailure,
    editAdminProfileRequest,
    editAdminProfileSuccess,
    editAdminProfileFailure,
    changePasswordRequest,
    changePasswordSuccess,
    changePasswordFailure
} = adminSlice.actions;

export default adminSlice;