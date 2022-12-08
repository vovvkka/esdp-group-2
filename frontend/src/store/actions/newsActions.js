import axiosApi from "../../axiosApi";
import {
    createNewsFailure, createNewsRequest, createNewsSuccess,
    getNewsFailure,
    getNewsRequest,
    getNewsSuccess, getOneNewsFailure,
    getOneNewsRequest,
    getOneNewsSuccess
} from "../slices/newsSlice";
import {historyPush} from "./historyActions";

export const getNews = (query) => {
    return async dispatch => {
        try {
            dispatch(getNewsRequest());
            const response = await axiosApi('/news'+query);
            dispatch(getNewsSuccess(response.data));
        } catch (e) {
            dispatch(getNewsFailure(e));
        }
    }
};

export const getOneNews = id => {
    return async dispatch => {
        try {
            dispatch(getOneNewsRequest());
            const response = await axiosApi('/news/' + id);
            dispatch(getOneNewsSuccess(response.data));
        } catch (e) {
            dispatch(getOneNewsFailure(e));
        }
    };
};

export const createNews = newsData => {
    return async dispatch => {
        try {
            dispatch(createNewsRequest());
            await axiosApi.post('/news', newsData);
            dispatch(createNewsSuccess());
            dispatch(historyPush('/admin/news'));
        } catch (e) {
            dispatch(createNewsFailure(e));
        }
    };
};