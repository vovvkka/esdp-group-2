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
import {editCategoryFailure, editCategoryRequest, editCategorySuccess} from "../slices/categoriesSlice";


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

export const editProduct = (id, productData) => {
    return async dispatch => {
        try {
            dispatch(editCategoryRequest());

            await axiosApi.put('/products/' + id, productData);

            dispatch(editCategorySuccess());
            dispatch(historyPush('/admin/products'));
        } catch (e) {
            if (e.response && e.response.data) {
                dispatch(editCategoryFailure(e.response.data));
            } else {
                dispatch(editCategoryFailure({global: 'No internet'}));
            }
        }
    };
};

export const deleteProduct = id => {
    return async dispatch => {
        try{
            dispatch(deleteProductRequest());
            const response = await axiosApi.delete('/products/' + id);
            dispatch(deleteProductSuccess(response.data));
        }catch (e) {
            dispatch(deleteProductFailure(e.response.data));
        }
    }
};
