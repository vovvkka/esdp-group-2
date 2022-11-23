import axiosApi from "../../axiosApi";
import {fetchShiftsFailure, fetchShiftsRequest, fetchShiftsSuccess} from "../slices/shiftsSlice";


export const fetchShifts = () => {
    return async dispatch => {
        try {
            dispatch(fetchShiftsRequest());

            const response = await axiosApi('/shifts');

            dispatch(fetchShiftsSuccess(response.data));
        } catch (e) {
            dispatch(fetchShiftsFailure(e));
        }
    };
};