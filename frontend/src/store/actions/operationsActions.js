import axiosApi from "../../axiosApi";
import {fetchOperationsFailure, fetchOperationsRequest, fetchOperationsSuccess} from "../slices/operationsSlice";

export const fetchOperations = (page,title) => {
    return async dispatch => {
        try {
            dispatch(fetchOperationsRequest());

            let response;

            if (page) {
                if(title){
                    response = await axiosApi('/operations' + page + '?title='+title);
                }else {
                    response = await axiosApi('/operations' + page);
                }
            } else {
                if(title){
                    response = await axiosApi('/operations?title='+title);
                }else {
                    response = await axiosApi('/operations');
                }
            }

            dispatch(fetchOperationsSuccess(response.data));
        } catch (e) {
            dispatch(fetchOperationsFailure(e));
        }
    };
};