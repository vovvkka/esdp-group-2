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
        }
    }
});

export const {
    fetchAdminProfileRequest,
    fetchAdminProfileSuccess,
    fetchAdminProfileFailure
} = adminSlice.actions;

export default adminSlice;