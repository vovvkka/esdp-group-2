import axiosApi from "../../axiosApi";
import {
    createProductFailure,
    createProductRequest,
    createProductSuccess,
    deleteProductFailure,
    deleteProductRequest,
    deleteProductSuccess, editProductFailure, editProductRequest, editProductSuccess,
    fetchOneProductFailure,
    fetchOneProductRequest,
    fetchOneProductSuccess,
    fetchProductsFailure,
    fetchProductsRequest, fetchProductsSearchFailure, fetchProductsSearchRequest, fetchProductsSearchSuccess,
    fetchProductsSuccess,
} from "../slices/productsSlice";
import {historyPush} from "./historyActions";


export const fetchProducts = (search) => {
    return async dispatch => {
        try {
            dispatch(fetchProductsRequest());
            let response;
            if (search) {
                response = await axiosApi('/products' + search);
            } else {
                response = await axiosApi('/products');
            }
            dispatch(fetchProductsSuccess(response.data));
        } catch (e) {
            dispatch(fetchProductsFailure(e.response.data));
        }
    }
};

export const fetchProductsSearch = (search) => {
    return async dispatch => {
        try {
            dispatch(fetchProductsSearchRequest());
            const response = await axiosApi('/products'+search);

            dispatch(fetchProductsSearchSuccess(response.data));
        } catch (e) {
            dispatch(fetchProductsSearchFailure(e.response.data));
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
            dispatch(historyPush('/admin/products'));
        } catch (e) {
            dispatch(createProductFailure(e.response.data));
        }
    }
};

export const editProduct = (id, productData) => {
    return async dispatch => {
        try {
            dispatch(editProductRequest());

            await axiosApi.put('/products/' + id, productData);

            dispatch(editProductSuccess());
            dispatch(historyPush('/admin/products'));
        } catch (e) {
            if (e.response && e.response.data) {
                dispatch(editProductFailure(e.response.data));
            } else {
                dispatch(editProductFailure({global: 'No internet'}));
            }
        }
    };
};

export const deleteProduct = id => {
    return async dispatch => {
        try {
            dispatch(deleteProductRequest());
            const response = await axiosApi.delete('/products/' + id);
            dispatch(deleteProductSuccess(response.data));
        } catch (e) {
            dispatch(deleteProductFailure(e.response.data));
        }
    }
};
