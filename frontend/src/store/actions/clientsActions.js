import axiosApi from "../../axiosApi";
import {
    createClientFailure,
    createClientRequest, createClientSuccess,
    deleteClientFailure,
    deleteClientRequest, deleteClientSuccess,
    fetchClientsFailure,
    fetchClientsRequest,
    fetchClientsSuccess
} from "../slices/clientsSlice";
import {historyPush} from "./historyActions";

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

export const createClient = (clientData) => {
    return async dispatch => {
        try {
            dispatch(createClientRequest());
            await axiosApi.post('/customers', clientData);
            dispatch(createClientSuccess());
            dispatch(historyPush('/admin/clients'));
        } catch (e) {
            dispatch(createClientFailure(e.response.data));
        }
    }
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