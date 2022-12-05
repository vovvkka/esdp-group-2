import axiosApi from "../../axiosApi";
import {fetchAdminProfileFailure, fetchAdminProfileRequest, fetchAdminProfileSuccess} from "../slices/adminSlice";

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