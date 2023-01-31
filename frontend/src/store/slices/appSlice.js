import {createSlice} from "@reduxjs/toolkit";

const name = 'app';

export const initialState = {
    sidebarOpen: false,
};

const appSlice = createSlice({
    name,
    initialState,
    reducers: {
        toggleSidebar(state) {
            state.sidebarOpen = !state.sidebarOpen;
        }
    }
});

export const {
    toggleSidebar
} = appSlice.actions;


export default appSlice;