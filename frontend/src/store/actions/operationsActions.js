import axiosApi from "../../axiosApi";
import {
    fetchOperationsFailure,
    fetchOperationsRequest,
    fetchOperationsSuccess, fetchReportsFailure, fetchReportsRequest, fetchReportsSuccess,
    fetchXReportFailure,
    fetchXReportRequest,
    fetchXReportSuccess,
    fetchZReportFailure,
    fetchZReportRequest,
    fetchZReportSuccess
} from "../slices/operationsSlice";

export const fetchOperations = (page, title, period) => {
    return async dispatch => {
        try {
            dispatch(fetchOperationsRequest());

            let response;

            if (page) {
                if (title) {
                    if (!period) {
                        response = await axiosApi('/operations' + page + '&title=' + title);
                    }else if (period.from) {
                        response = await axiosApi(`/operations${page}&title=${title}&from=${period.from}&to=${period.to}`);
                    }
                } else {
                    response = await axiosApi('/operations' + page);
                }
            } else {
                if (title) {
                    if (!period) {
                        response = await axiosApi('/operations?title=' + title);
                    }else if (period.from) {
                        response = await axiosApi(`/operations?title=${title}&from=${period.from}&to=${period.to}`);
                    }
                } else {
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

export const fetchZReport = (shiftId) => {
    return async dispatch => {
        try {
            dispatch(fetchZReportRequest());

            const response = await axiosApi('/operations/report-z/' + shiftId);

            dispatch(fetchZReportSuccess(response.data));
        } catch (e) {
            dispatch(fetchZReportFailure(e));
        }
    };
};

export const fetchReports = (periodDate) => {
    return async dispatch => {
        try {
            dispatch(fetchReportsRequest());
            let response;


            if (!periodDate) {
                response = await axiosApi('/operations/reports');
            } else if (periodDate) {
                response = await axiosApi(`/operations/reports?from=${periodDate.from}&to=${periodDate.to}`);
            }

            dispatch(fetchReportsSuccess(response.data));
        } catch (e) {
            dispatch(fetchReportsFailure(e));
        }
    };
};