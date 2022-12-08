import {createSlice} from "@reduxjs/toolkit";

const name = 'news';

export const initialState = {
    news: [],
    oneNews: null,
    loading: false,
    error: null,
    singleError: null,
    singleLoading: false,
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
        getOneNewsRequest(state) {
            state.loading = true;
            state.singleError = null;
        },
        getOneNewsSuccess(state, action) {
            state.sinleLoading = false;
            state.oneNews = action.payload;
        },
        getOneNewsFailure(state, action) {
            state.sinleLoading = false;
            state.singleError = action.payload;
        },
        createNewsRequest(state) {

        },
        createNewsSuccess(state) {

        },
        createNewsFailure(state) {

        }
    }
});

export const {
    getNewsRequest,
    getNewsSuccess,
    getNewsFailure,
    getOneNewsRequest,
    getOneNewsSuccess,
    getOneNewsFailure,
    createNewsRequest,
    createNewsSuccess,
    createNewsFailure
} = newsSlice.actions;

export default newsSlice;