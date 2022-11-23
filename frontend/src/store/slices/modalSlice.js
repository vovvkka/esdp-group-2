import {createSlice} from "@reduxjs/toolkit";

const name = 'modal';

export const initialState = {
    modal: false,
};
const modalSlice = createSlice({
    name,
    initialState,
    reducers: {
        openModal(state) {
            state.modal = true;
        },
        closeModal(state) {
            state.modal = false;
        },
    }
});

export const {
    openModal,
    closeModal,
} = modalSlice.actions;

export default modalSlice;