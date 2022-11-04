import axiosApi from "../../axiosApi";
import {loginFailure, loginRequest, loginSuccess, logoutRequest, logoutSuccess} from "../slices/usersSlice";
import {historyPush} from "./historyActions";

export const loginUser = userData => {
    return async dispatch => {
        try {
            dispatch(loginRequest());

            const response = await axiosApi.post('/users/sessions', userData);

            dispatch(loginSuccess(response.data.user));
            dispatch(historyPush('/'));
        } catch (e) {
            if (e.response && e.response.data) {
                dispatch(loginFailure(e.response.data));
            } else {
                dispatch(loginFailure({global: 'No internet'}));
            }
        }
    };
};

export const logoutUser = () => {
    return async (dispatch, getState) => {
        try {
            const token = getState().users.user.token;
            const headers = {'Authorization': token};

            dispatch(logoutRequest());

            await axiosApi.delete('/users/sessions', {headers});

            dispatch(logoutSuccess());
            dispatch(historyPush('/'));
        } catch (e) {
            dispatch(loginFailure(e));
        }
    };
};