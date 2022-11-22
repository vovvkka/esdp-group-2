import axiosApi from "../../axiosApi";
import {historyPush} from "./historyActions";
import {
    closeShiftFailure,
    closeShiftRequest,
    closeShiftSuccess,
    openShiftFailure,
    openShiftRequest,
    openShiftSuccess
} from "../slices/ShiftSlice";
import {addNotification} from "./notifierActions";

export const openShift = (pin) => {
    return async dispatch => {
        try {
            dispatch(openShiftRequest());
            const response = await axiosApi.post('/shifts', pin);
            dispatch(openShiftSuccess(response.data));
            dispatch(addNotification(`Смена открыта.`, 'success', {autoClose: 1000}));
            dispatch(historyPush('/cashierPanel'));

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
            dispatch(addNotification(`Смена закрыта.`, 'success', {autoClose: 1000}));
            dispatch(historyPush('/cashier/open-shift'));
        } catch (e) {
            dispatch(closeShiftFailure(e.response.data));
        }
    }
};