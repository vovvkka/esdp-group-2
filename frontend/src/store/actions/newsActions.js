import axiosApi from "../../axiosApi";
import {
    getNewsFailure,
    getNewsRequest,
    getNewsSuccess, getOneNewsFailure,
    getOneNewsRequest,
    getOneNewsSuccess
} from "../slices/newsSlice";

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