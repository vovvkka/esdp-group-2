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
            state.cashiers = action.payload;
        },
        getCashiersFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        addCashierRequest(state) {
            state.loading = true;
            state.error = null;
        },
        addCashierSuccess(state) {
            state.loading = false;
        },
        addCashierFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        }
    }
});

export const {
    getCashiersRequest,
    getCashiersSuccess,
    getCashiersFailure,
    addCashierRequest,
    addCashierSuccess,
    addCashierFailure
} = cashiersSlice.actions;

export default cashiersSlice;















