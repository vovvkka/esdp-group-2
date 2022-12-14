import {createSlice} from "@reduxjs/toolkit";

const name = 'operations';

export const initialState = {
    operations: {},
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
    }
});

export const {
    fetchOperationsRequest,
    fetchOperationsSuccess,
    fetchOperationsFailure,
} = operationsSlice.actions;

export default operationsSlice;