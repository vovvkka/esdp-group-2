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
            state.singleLoading = true;
            state.singleError = null;
        },
        getOneNewsSuccess(state, action) {
            state.singleLoading = false;
            state.oneNews = action.payload;
        },
        getOneNewsFailure(state, action) {
            state.sinleLoading = false;
            state.singleError = action.payload;
        },
        createNewsRequest(state) {
            state.singleLoading = true;
            state.singleError = null;
        },
        createNewsSuccess(state) {
            state.singleLoading = false;
        },
        createNewsFailure(state, action) {
            state.singleLoading = false;
            state.singleError = action.payload;
        },
        changeNewsStatusRequest(state) {
            state.loading = true;
            state.error = null;
        },
        changeNewsStatusSuccess(state, action) {
            const idx = state.news.findIndex(n => n._id === action.payload);
            state.loading = true;
            state.news[idx].published = !state.news[idx].published;
        },
        changeNewsStatusFailure(state, action) {
            state.loading = true;
            state.error = action.payload;
        },
        deleteNewsRequest(state) {
            state.loading = true;
            state.error = null;
        },
        deleteNewsSuccess(state, action) {
            state.loading = false;
            state.news = [...state.news.filter(n => n._id !== action.payload)];
        },
        deleteNewsFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        editNewsRequest(state) {
            state.loading = true;
            state.error = null;
        },
        editNewsSuccess(state) {
            state.loading = false;
        },
        editNewsFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
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
    createNewsFailure,
    changeNewsStatusRequest,
    changeNewsStatusSuccess,
    changeNewsStatusFailure,
    deleteNewsRequest,
    deleteNewsSuccess,
    deleteNewsFailure,
    editNewsRequest,
    editNewsSuccess,
    editNewsFailure
} = newsSlice.actions;

export default newsSlice;