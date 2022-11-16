import axiosApi from "../../axiosApi";
import {getNewsFailure, getNewsRequest, getNewsSuccess} from "../slices/newsSlice";

export const getNews = () => {
    return async dispatch => {
        try {
            dispatch(getNewsRequest());
            const response = await axiosApi('/news');
            dispatch(getNewsSuccess(response.data));
        } catch (e) {
            dispatch(getNews(getNewsFailure(e)));
        }
    }
};