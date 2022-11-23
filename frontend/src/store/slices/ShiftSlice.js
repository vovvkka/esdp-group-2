import {createSlice} from "@reduxjs/toolkit";

const name = 'shifts';

export const initialState = {
    shifts: [],
    shift: null,
    loading: false,
    error: null,
};
const shiftsSlice = createSlice({
    name,
    initialState,
    reducers: {
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
        },
        closeShiftFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
    }
});

export const {
    openShiftRequest,
    openShiftSuccess,
    openShiftFailure,
    closeShiftRequest,
    closeShiftSuccess,
    closeShiftFailure,
} = shiftsSlice.actions;

export default shiftsSlice;