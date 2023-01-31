import {createSlice} from "@reduxjs/toolkit";

const name = 'clients';

export const initialState = {
    clients: {},
    client: null,
    loading: false,
    error: null,
    createClientLoading: false,
    createClientError: null,
    fetchLoading: false,
    fetchError: null,
};

const clientsSlice = createSlice({
    name,
    initialState,
    reducers: {
        fetchClientsRequest(state) {
            state.loading = true;
            state.error = null;
        },
        fetchClientsSuccess(state, action) {
            state.loading = false;
            state.clients = action.payload;
        },
        fetchClientsFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        fetchOneClientRequest(state) {
            state.fetchLoading = true;
            state.fetchError = null;
        },
        fetchOneClientSuccess(state, {payload: client}) {
            state.fetchLoading = false;
            state.client = client;
        },
        fetchOneClientFailure(state, {payload: error}) {
            state.fetchLoading = false;
            state.fetchError = error;
        },
        createClientRequest(state) {
            state.createClientLoading = true;
            state.createClientError = null;
        },
        createClientSuccess(state) {
            state.createClientLoading = false;
        },
        createClientFailure(state, {payload: error}) {
            state.createClientLoading = false;
            state.createClientError = error;
        },
        editClientRequest(state) {
            state.createClientLoading = true;
            state.createClientError = null;
        },
        editClientSuccess(state) {
            state.createClientLoading = false;
        },
        editClientFailure(state, action) {
            state.createClientLoading = false;
            state.createClientError = action.payload;
        },
        deleteClientRequest(state) {
            state.loading = true;
            state.error = null;
        },
        deleteClientSuccess(state, action) {
            state.loading = false;
            state.clients.docs = state.clients.docs?.filter(client => client._id !== action.payload._id);
        },
        deleteClientFailure(state, action) {
            state.loading = true;
            state.error = action.payload;
        },
    }
});

export const {
    fetchClientsRequest,
    fetchClientsSuccess,
    fetchClientsFailure,
    fetchOneClientRequest,
    fetchOneClientSuccess,
    fetchOneClientFailure,
    createClientRequest,
    createClientSuccess,
    createClientFailure,
    editClientRequest,
    editClientSuccess,
    editClientFailure,
    deleteClientRequest,
    deleteClientSuccess,
    deleteClientFailure,
} = clientsSlice.actions

export default clientsSlice;















