import {createSlice} from "@reduxjs/toolkit";

const name = 'news';

export const initialState = {
    news: [],
    loading: false,
    error: null,
};

const newsSlice = createSlice({
    name,
    initialState,
    reducers: {
        getNewsRequest(state) {
            state.loading = true;
            state.error = null;
        },
        getNewsSuccess(state, action) {
            state.loading = false;
            state.news = action.payload;
        },
        getNewsFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
    }
});

export const {
    getNewsRequest,
    getNewsSuccess,
    getNewsFailure,
} = newsSlice.actions;

export default newsSlice;