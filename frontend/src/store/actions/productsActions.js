import axiosApi from "../../axiosApi";
import {fetchProductsFailure, fetchProductsRequest, fetchProductsSuccess} from "../slices/productsSlice";


export const fetchProducts = () => {
    return async dispatch => {
        try {
            dispatch(fetchProductsRequest());
            const response = await axiosApi('/products');
            dispatch(fetchProductsSuccess(response.data));
        } catch (e) {
            dispatch(fetchProductsFailure(e.message));
        }
    }
};