import axiosApi from "../../axiosApi";
import {
    fetchShiftsFailure,
    fetchShiftsRequest,
    fetchShiftsSuccess,
    closeShiftFailure,
    closeShiftRequest,
    closeShiftSuccess,
    openShiftFailure,
    openShiftRequest,
    openShiftSuccess
} from "../slices/shiftsSlice";
import {addNotification} from "./notifierActions";
import {historyPush} from "./historyActions";
import {getCash} from "./cashActions";
import {clearCash} from "../slices/cashSlice";

export const closeShiftTitle = 'Закрытие смены';
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

export const openShift = (pin) => {
    return async dispatch => {
        try {
            dispatch(openShiftRequest());
            const response = await axiosApi.post('/shifts', pin);
            dispatch(openShiftSuccess(response.data));
            dispatch(getCash());
            dispatch(addNotification(`Смена открыта.`, 'success', {autoClose: 1000}));
            dispatch(historyPush('/cashier'));

        } catch (e) {
            dispatch(openShiftFailure(e.response.data));
        }
    }
};

export const closeShift = (id) => {
    return async dispatch => {
        try {
            dispatch(closeShiftRequest());
            await axiosApi.put('/shifts/' + id);
            dispatch(closeShiftSuccess());
            dispatch(clearCash());
            dispatch(addNotification(`Смена закрыта.`, 'success', {autoClose: 1000}));
            dispatch(historyPush('/cashier/open-shift'));
        } catch (e) {
            dispatch(closeShiftFailure(e.response.data));
        }
    }
};