import axiosApi from "../../axiosApi";
import {fetchOperationsFailure, fetchOperationsRequest, fetchOperationsSuccess} from "../slices/operationsSlice";

export const fetchOperations = (page) => {
    return async dispatch => {
        try {
            dispatch(fetchOperationsRequest());

            let response;

            if (page) {
                response = await axiosApi('/operations' + page);
            } else {
                response = await axiosApi('/operations');
            }

            dispatch(fetchOperationsSuccess(response.data));
        } catch (e) {
            dispatch(fetchOperationsFailure(e));
        }
    };
};