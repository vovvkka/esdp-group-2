import axiosApi from "../../axiosApi";
import {
    deleteClientFailure,
    deleteClientRequest, deleteClientSuccess,
    fetchClientsFailure,
    fetchClientsRequest,
    fetchClientsSuccess
} from "../slices/clientsSlice";

export const fetchClients = () => {
    return async dispatch => {
        try {
            dispatch(fetchClientsRequest());

            const response = await axiosApi('/customers');

            dispatch(fetchClientsSuccess(response.data));
        } catch (e) {
            if (e.response && e.response.data) {
                dispatch(fetchClientsFailure(e.response.data));
            } else {
                dispatch(fetchClientsFailure({global: 'No internet'}));
            }
        }
    };
};

export const deleteClient = id => {
    return async dispatch => {
        try {
            dispatch(deleteClientRequest());
            const response = await axiosApi.delete('/customers/' + id);
            dispatch(deleteClientSuccess(response.data));
        } catch (e) {
            dispatch(deleteClientFailure(e));
        }
    }
};