import {createSlice} from "@reduxjs/toolkit";

const name = 'operations';

export const initialState = {
    operations: {},
    receipt: {},
    xReport: null,
    zReport: null,
    reports: null,
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
        },
        fetchZReportRequest(state) {
            state.loading = true;
        },
        fetchZReportSuccess(state, {payload: report}) {
            state.loading = false;
            state.zReport = report;
        },
        fetchZReportFailure(state, {payload}) {
            state.loading = false;
            state.error = payload;
        },
        fetchReportsRequest(state) {
            state.loading = true;
        },
        fetchReportsSuccess(state, action) {
            state.loading = false;
            state.reports = action.payload;
        },
        fetchReportsFailure(state, {payload}) {
            state.loading = false;
            state.error = payload;
        },
        clearReport(state) {
            state.xReport = null;
            state.zReport = null;
        },
        clearOperations(state) {
            state.operations = {};
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
    fetchXReportFailure,
    fetchZReportRequest,
    fetchZReportSuccess,
    fetchZReportFailure,
    fetchReportsRequest,
    fetchReportsSuccess,
    fetchReportsFailure,

    clearReport,
    clearOperations
} = operationsSlice.actions;

export default operationsSlice;