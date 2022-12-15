import {createSlice} from "@reduxjs/toolkit";

const name = 'shifts';

export const initialState = {
    shifts: [],
    shift: null,
    receipts: 0,
    fetchLoading: false,
    fetchError: null,
};

const shiftsSlice = createSlice({
    name,
    initialState,
    reducers: {
        fetchShiftsRequest(state) {
            state.fetchLoading = true;
            state.fetchError = null;
        },
        fetchShiftsSuccess(state, {payload: shifts}) {
            state.fetchLoading = false;
            state.shifts = shifts;
        },
        fetchShiftsFailure(state, {payload: error}) {
            state.fetchLoading = false;
            state.fetchError = error;
        },
        openShiftRequest(state) {
            state.loading = true;
            state.error = null;
        },
        openShiftSuccess(state, action) {
            state.loading = false;
            state.shift = action.payload;
        },
        openShiftFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        closeShiftRequest(state) {
            state.loading = true;
            state.error = null;
        },
        closeShiftSuccess(state) {
            state.loading = false;
            state.shift=null;
            state.receipts=0;
        },
        closeShiftFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        purchaseReceipt(state) {
            state.receipts++;
        }
    }
});

export const {
    fetchShiftsRequest,
    fetchShiftsSuccess,
    fetchShiftsFailure,
    openShiftRequest,
    openShiftSuccess,
    openShiftFailure,
    closeShiftRequest,
    closeShiftSuccess,
    closeShiftFailure,
    purchaseReceipt,
} = shiftsSlice.actions

export default shiftsSlice;