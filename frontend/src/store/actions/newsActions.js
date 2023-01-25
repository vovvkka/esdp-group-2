import axiosApi from "../../axiosApi";
import {
    changeNewsStatusFailure,
    changeNewsStatusRequest,
    changeNewsStatusSuccess,
    createNewsFailure,
    createNewsRequest,
    createNewsSuccess,
    deleteNewsFailure,
    deleteNewsRequest,
    deleteNewsSuccess,
    editNewsFailure,
    editNewsRequest,
    editNewsSuccess,
    getNewsFailure,
    getNewsRequest,
    getNewsSuccess,
    getOneNewsFailure,
    getOneNewsRequest,
    getOneNewsSuccess
} from "../slices/newsSlice";
import {historyPush} from "./historyActions";

export const getNews = (query) => {
    return async dispatch => {
        try {
            dispatch(getNewsRequest());
            const response = await axiosApi('/news' + (query || ''));
            dispatch(getNewsSuccess(response.data));
        } catch (e) {
            dispatch(getNewsFailure(e));
        }
    }
};

export const getOneNews = id => {
    return async dispatch => {
        try {
            dispatch(getOneNewsRequest("?shop=true"));
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
            if (e.response && e.response.data) {
                dispatch(createNewsFailure(e.response.data));
            } else {
                dispatch(createNewsFailure({global: 'No internet'}));
            }
        }
    };
};

export const changeNewsStatus = id => {
    return async dispatch => {
        try {
            dispatch(changeNewsStatusRequest());
            await axiosApi.post(`/news/${id}/publish`);
            dispatch(changeNewsStatusSuccess(id));
        } catch (e) {
            dispatch(changeNewsStatusFailure(e));
        }
    }
}

export const editNews = (id, data) => {
    return async dispatch => {
        try {
            dispatch(editNewsRequest());
            await axiosApi.put(`/news/${id}`, data);
            dispatch(editNewsSuccess());
            dispatch(historyPush('/admin/news'));
        } catch (e) {
            dispatch(editNewsFailure(e));
        }
    }
}

export const deleteNews = id => {
    return async dispatch => {
        try {
            dispatch(deleteNewsRequest());
            await axiosApi.delete(`/news/${id}`);
            dispatch(deleteNewsSuccess(id));
        } catch (e) {
            dispatch(deleteNewsFailure(e));
        }
    }
}