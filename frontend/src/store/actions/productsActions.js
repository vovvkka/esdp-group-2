import axiosApi from "../../axiosApi";
import {
    createProductFailure,
    createProductRequest, createProductSuccess, deleteProductFailure, deleteProductRequest, deleteProductSuccess,
    fetchOneProductFailure,
    fetchOneProductRequest, fetchOneProductSuccess,
    fetchProductsFailure,
    fetchProductsRequest,
    fetchProductsSuccess
} from "../slices/productsSlice";
import {historyPush} from "./historyActions";


export const fetchProducts = () => {
    return async dispatch => {
        try {
            dispatch(fetchProductsRequest());
            const response = await axiosApi('/products');
            dispatch(fetchProductsSuccess(response.data));
        } catch (e) {
            dispatch(fetchProductsFailure(e.response.data));
        }
    }
};

export const fetchOneProduct = id => {
    return async dispatch => {
        try {
            dispatch(fetchOneProductRequest());

            const response = await axiosApi('/products/' + id);

            dispatch(fetchOneProductSuccess(response.data));
        } catch (e) {
            dispatch(fetchOneProductFailure(e.response.data));
        }
    }
};

export const createProduct = (productData) => {
    return async dispatch => {
        try {
            dispatch(createProductRequest());
            await axiosApi.post('/products', productData);
            dispatch(createProductSuccess());
            dispatch(historyPush('/'));
        } catch (e) {
            dispatch(createProductFailure(e.response.data));
        }
    }
};

export const deleteProduct = id => {
    return async dispatch => {
        try{
            dispatch(deleteProductRequest());
            await axiosApi.delete('/products/' + id);
            dispatch(deleteProductSuccess());
            dispatch(historyPush('/'))
        }catch (e) {
            dispatch(deleteProductFailure(e.response.data));
        }
    }
};
