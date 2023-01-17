import axiosApi from "../../axiosApi";
import {
    fetchOperationsFailure,
    fetchOperationsRequest,
    fetchOperationsSuccess, fetchXReportFailure,
    fetchXReportRequest, fetchXReportSuccess
} from "../slices/operationsSlice";

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

export const fetchXReport = (shiftId) => {
    return async dispatch => {
        try {
            dispatch(fetchXReportRequest());

            const response = await axiosApi('/operations/report/' + shiftId);

            dispatch(fetchXReportSuccess(response.data));
        } catch (e) {
            dispatch(fetchXReportFailure(e));
        }
    };
};