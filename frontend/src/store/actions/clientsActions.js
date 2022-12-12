import axiosApi from "../../axiosApi";
import {
    createClientFailure,
    createClientRequest, createClientSuccess,
    deleteClientFailure,
    deleteClientRequest, deleteClientSuccess, editClientFailure, editClientRequest, editClientSuccess,
    fetchClientsFailure,
    fetchClientsRequest,
    fetchClientsSuccess, fetchOneClientFailure, fetchOneClientRequest, fetchOneClientSuccess
} from "../slices/clientsSlice";
import {historyPush} from "./historyActions";

export const fetchClients = (page) => {
    return async dispatch => {
        try {
            dispatch(fetchClientsRequest());

            let response;

            if (page) {
                response = await axiosApi('/customers' + page);
            } else {
                response = await axiosApi('/customers');
            }

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


export const fetchOneClient = id => {
    return async dispatch => {
        try {
            dispatch(fetchOneClientRequest());

            const response = await axiosApi('/customers/' + id);

            dispatch(fetchOneClientSuccess(response.data));
        } catch (e) {
            dispatch(fetchOneClientFailure(e.response.data));
        }
    }
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


export const editClient = (id, clientData) => {
    return async dispatch => {
        try {
            dispatch(editClientRequest());
            await axiosApi.put('/customers/' + id, clientData);
            dispatch(editClientSuccess());
            dispatch(historyPush('/admin/clients'));
        } catch (e) {
            if (e.response && e.response.data) {
                dispatch(editClientFailure(e.response.data));
            } else {
                dispatch(editClientFailure({global: 'No internet'}));
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