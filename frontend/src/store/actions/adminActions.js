import axiosApi from "../../axiosApi";
import {
    changePasswordFailure,
    changePasswordRequest,
    changePasswordSuccess,
    editAdminProfileFailure,
    editAdminProfileRequest,
    editAdminProfileSuccess,
    fetchAdminProfileFailure,
    fetchAdminProfileRequest,
    fetchAdminProfileSuccess
} from "../slices/adminSlice";
import {historyPush} from "./historyActions";
import {addNotification} from "./notifierActions";

export const getAdminProfile = () => {
    return async dispatch => {
        try {
            dispatch(fetchAdminProfileRequest());
            const response = await axiosApi('/admin');
            dispatch(fetchAdminProfileSuccess(response.data));
        } catch (e) {
            dispatch(fetchAdminProfileFailure(e));
        }
    };
};

export const editAdminProfile = (profileData) => {
    return async dispatch => {
        try {
            dispatch(editAdminProfileRequest());
            await axiosApi.put('/admin', profileData);
            dispatch(editAdminProfileSuccess());
            dispatch(historyPush('/admin/settings'));
        } catch (e) {
            dispatch(editAdminProfileFailure(e));
        }
    };
};

export const changePassword = (passwordData) => {
    return async dispatch => {
        try {
            dispatch(changePasswordRequest());
            const response = await axiosApi.put('/admin/password', passwordData);
            dispatch(changePasswordSuccess());
            dispatch(historyPush('/admin/settings'));
            dispatch(addNotification(response.data.message, 'success'));
        } catch (e) {
            console.log(e);
            dispatch(changePasswordFailure(e.response.data));
        }
    };
};