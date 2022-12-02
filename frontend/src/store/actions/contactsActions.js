import axiosApi from "../../axiosApi";
import {
    fetchContactsRequest,
    fetchContactsSuccess,
    fetchContactsFailure
} from "../slices/contactsSlice";

export const getContacts = () => {
    return async dispatch => {
        try {
            dispatch(fetchContactsRequest());
            const response = await axiosApi('/contacts');
            dispatch(fetchContactsSuccess(response.data));
        } catch (e) {
            dispatch(fetchContactsFailure(e));
        }
    }
};