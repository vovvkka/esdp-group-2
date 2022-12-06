import {createSlice} from "@reduxjs/toolkit";

const name = 'contacts';

export const initialState = {
    contacts: null,
    error: null,
    loading: false
};

const contactsSlice = createSlice({
    name,
    initialState,
    reducers: {
        fetchContactsRequest(state) {
            state.loading = true;
            state.error = null;
        },
        fetchContactsSuccess(state, action) {
            state.contacts = action.payload;
            state.loading = false;
        },
        fetchContactsFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        editContactsRequest(state) {
            state.loading = true;
            state.error = null;
        },
        editContactsSuccess(state) {
            state.loading = false;
        },
        editContactsFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        }
    }
});

export const {
    fetchContactsRequest,
    fetchContactsSuccess,
    fetchContactsFailure,
    editContactsRequest,
    editContactsSuccess,
    editContactsFailure,
} = contactsSlice.actions;

export default contactsSlice;