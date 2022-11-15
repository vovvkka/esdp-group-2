import {getCashiersFailure, getCashiersRequest, getCashiersSuccess} from "../slices/cashiersSlice";
import axiosApi from "../../axiosApi";

export const getCashiers = () => {
    return async dispatch => {
        try {
            dispatch(getCashiersRequest());
            const response = await axiosApi('/cashiers');
            dispatch(getCashiersSuccess(response.data));
        } catch (e) {
            if (e.response && e.response.data) {
                dispatch(getCashiersFailure(e.response.data));
            } else {
                dispatch(getCashiersFailure({global: 'No internet'}));
            }
        }
    };
};