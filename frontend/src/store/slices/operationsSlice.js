import {createSlice} from "@reduxjs/toolkit";

const name = 'operations';

export const initialState = {
    operations: {},
    receipt: {},
    loading: false,
    error: null,
};

const operationsSlice = createSlice({
    name,
    initialState,
    reducers: {
        fetchOperationsRequest(state) {
            state.loading = true;
            state.error = null;
        },
        fetchOperationsSuccess(state, {payload: operations}) {
            state.loading = false;
            state.operations = operations;
        },
        fetchOperationsFailure(state, {payload: error}) {
            state.loading = false;
            state.error = error;
        },
        fetchReceipt(state, action) {
            state.receipt = action.payload;
        }
    }
});

export const {
    fetchOperationsRequest,
    fetchOperationsSuccess,
    fetchOperationsFailure,
    fetchReceipt,
} = operationsSlice.actions;

export default operationsSlice;