import {createSlice} from "@reduxjs/toolkit";

const name = 'app';

export const initialState = {
    drawerOpen: false,
    modalOpen: false,
};

const appSlice = createSlice({
    name,
    initialState,
    reducers: {
        setDrawerOpen(state) {
            state.drawerOpen = true;
        },
        setDrawerClosed(state) {
            state.drawerOpen = false;
        },
        setModalOpen(state) {
            state.modalOpen = true;
        },
        setModalClosed(state) {
            state.modalOpen = false;
        }
    }
});

export const {
    setDrawerOpen,
    setDrawerClosed,
    setModalOpen,
    setModalClosed,
} = appSlice.actions;

export default appSlice;
