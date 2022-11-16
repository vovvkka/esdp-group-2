import {createSlice} from "@reduxjs/toolkit";

const name = 'app';

export const initialState = {
    drawerOpen: false,
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
        }
    }
});

export const {
    setDrawerOpen,
    setDrawerClosed,
} = appSlice.actions;

export default appSlice;
