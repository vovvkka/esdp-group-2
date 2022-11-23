import {createSlice} from "@reduxjs/toolkit";

const name = 'shifts';

export const initialState = {
    shifts: [],
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
    }
});

export const {
    fetchShiftsRequest,
    fetchShiftsSuccess,
    fetchShiftsFailure,
} = shiftsSlice.actions

export default shiftsSlice;