import {createSlice} from "@reduxjs/toolkit";

const name = 'operations';

export const initialState = {
    operations: {},
    fetchLoading: false,
    fetchError: null,
};

const operationsSlice = createSlice({
    name,
    initialState,
    reducers: {
        fetchOperationsRequest(state) {
            state.fetchLoading = true;
            state.fetchError = null;
        },
        fetchOperationsSuccess(state, {payload: operations}) {
            state.fetchLoading = false;
            state.operations = operations;
        },
        fetchOperationsFailure(state, {payload: error}) {
            state.fetchLoading = false;
            state.fetchError = error;
        },
    }
});

export const {
    fetchOperationsRequest,
    fetchOperationsSuccess,
    fetchOperationsFailure,
} = operationsSlice.actions;

export default operationsSlice;