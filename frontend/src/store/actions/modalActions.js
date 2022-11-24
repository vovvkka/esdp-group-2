import {closeModal, openModal} from "../slices/modalSlice";

export const modalOpen = () => {
    return async dispatch => {
        dispatch(openModal());
    };
};

export const modalClose = () => {
    return async dispatch => {
        dispatch(closeModal());
    };
};