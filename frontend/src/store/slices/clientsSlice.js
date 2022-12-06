import {createSlice} from "@reduxjs/toolkit";

const name = 'clients';

export const initialState = {
    clients: {},
    client: null,
    loading: false,
    error: null,
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
    deleteClientRequest,
    deleteClientSuccess,
    deleteClientFailure,
} = clientsSlice.actions

export default clientsSlice;















