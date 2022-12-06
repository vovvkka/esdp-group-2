import axiosApi from "../../axiosApi";
import {
    editAdminProfileFailure,
    editAdminProfileRequest, editAdminProfileSuccess,
    fetchAdminProfileFailure,
    fetchAdminProfileRequest,
    fetchAdminProfileSuccess
} from "../slices/adminSlice";
import {historyPush} from "./historyActions";

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