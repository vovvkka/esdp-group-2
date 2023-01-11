import {createSlice} from "@reduxjs/toolkit";

const name = 'operations';

export const initialState = {
    operations: {},
    receipt: {},
    xReport: null,
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
        },
        fetchXReportRequest(state) {
            state.loading = true;
        },
        fetchXReportSuccess(state, {payload: report}) {
            state.loading = false;
            state.xReport = report;
        },
        fetchXReportFailure(state, {payload}) {
            state.loading = false;
            state.error = payload;
        }
    }
});

export const {
    fetchOperationsRequest,
    fetchOperationsSuccess,
    fetchOperationsFailure,
    fetchReceipt,
    fetchXReportRequest,
    fetchXReportSuccess,
    fetchXReportFailure
} = operationsSlice.actions;

export default operationsSlice;