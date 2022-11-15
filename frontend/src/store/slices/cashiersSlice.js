import {createSlice} from "@reduxjs/toolkit";

const name = 'cashiers';

export const initialState = {
    cashiers: [],
    loading: false,
    error: null,
};

const cashiersSlice = createSlice({
    name,
    initialState,
    reducers: {
        getCashiersRequest(state) {
            state.loading = true;
            state.error = null;
        },
        getCashiersSuccess(state, action) {
            state.loading = false;
            state.error = null;
            state.cashiers = action.payload;
        },
        getCashiersFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
    }
});

export const {
    getCashiersRequest,
    getCashiersSuccess,
    getCashiersFailure,
} = cashiersSlice.actions;

export default cashiersSlice;















