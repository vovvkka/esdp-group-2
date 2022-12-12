import axiosApi from "../../axiosApi";
import {
    forgotPasswordFailure,
    forgotPasswordRequest, forgotPasswordSuccess,
    loginFailure,
    loginRequest,
    loginSuccess,
    logoutFailure,
    logoutRequest,
    logoutSuccess, resetPasswordFailure, resetPasswordRequest, resetPasswordSuccess
} from "../slices/usersSlice";
import {historyPush} from "./historyActions";
import {addNotification} from "./notifierActions";

export const loginUser = userData => {
    return async dispatch => {
        try {
            dispatch(loginRequest());

            const response = await axiosApi.post('/users/sessions', userData);

            dispatch(loginSuccess(response.data.user));

            dispatch(addNotification('Вы успешно вошли в систему!', 'success'));

            if (response.data.user?.role === 'admin') {
                return dispatch(historyPush('/admin'));
            } else if (response.data.user?.role === 'cashier') {
                return dispatch(historyPush('/cashier/open-shift'));
            }
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
            dispatch(logoutFailure(e));
        }
    };
};

export const forgotPassword = email => {
    return async dispatch => {
        try {
            dispatch(forgotPasswordRequest());

            await axiosApi.post('/users/forgot-password', {email});

            dispatch(forgotPasswordSuccess());
            dispatch(addNotification('Письмо для сброса пароля было отправлено на почту!', 'success', {autoClose: 3000}));
        } catch (e) {
            dispatch(forgotPasswordFailure(e.response.data));
        }
    };
};

export const resetPassword = (id, token, userData) => {
    return async dispatch => {
        try {
            dispatch(resetPasswordRequest());

            await axiosApi.post(`/users/reset-password/${id}/${token}`, userData);

            dispatch(resetPasswordSuccess());
            dispatch(historyPush('/login'));
            dispatch(addNotification('Вы успешно сбросили пароль!', 'success', {autoClose: 2000}));
        } catch (e) {
            dispatch(resetPasswordFailure(e.response.data));
        }
    };
};