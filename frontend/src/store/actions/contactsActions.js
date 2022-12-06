import axiosApi from "../../axiosApi";
import {
    editContactsFailure,
    editContactsRequest,
    editContactsSuccess,
    fetchContactsFailure,
    fetchContactsRequest,
    fetchContactsSuccess
} from "../slices/contactsSlice";
import {historyPush} from "./historyActions";

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

export const editContacts = (contactsData) => {
    return async dispatch => {
        try {
            dispatch(editContactsRequest());
            await axiosApi.put('/contacts', contactsData);

            dispatch(editContactsSuccess());
            dispatch(historyPush('/admin/settings/contacts'));
        } catch (e) {
            if (e.response && e.response.data) {
                dispatch(editContactsFailure(e.response.data));
            } else {
                dispatch(editContactsFailure({global: 'No internet'}));
            }
        }
    };
};