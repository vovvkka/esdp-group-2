import axiosApi from "../../axiosApi";
import {historyPush} from "./historyActions";
import {
    createCategoryFailure,
    createCategoryRequest,
    createCategorySuccess,
    deleteCategoryFailure,
    deleteCategoryRequest,
    deleteCategorySuccess,
    editCategoryFailure,
    editCategoryRequest,
    editCategorySuccess,
    fetchCategoriesFailure,
    fetchCategoriesRequest,
    fetchCategoriesSuccess,
    fetchCategoryFailure,
    fetchCategoryRequest,
    fetchCategorySuccess
} from "../slices/categoriesSlice";

export const fetchCategories = (query) => {
    return async dispatch => {
        try {
            dispatch(fetchCategoriesRequest());
            let response;
            if(query){
                response = await axiosApi('/categories'+query);
            }else{
                response = await axiosApi('/categories');
            }

            dispatch(fetchCategoriesSuccess(response.data));
        } catch (e) {
            if (e.response && e.response.data) {
                dispatch(fetchCategoriesFailure(e.response.data));
            } else {
                dispatch(fetchCategoriesFailure({global: 'No internet'}));
            }
        }
    };
};

export const fetchCategory = id => {
    return async dispatch => {
        try {
            dispatch(fetchCategoryRequest());

            const response = await axiosApi('/categories/' + id);

            dispatch(fetchCategorySuccess(response.data));
        } catch (e) {
            if (e.response && e.response.data) {
                dispatch(fetchCategoryFailure(e.response.data));
            } else {
                dispatch(fetchCategoryFailure({global: 'No internet'}));
            }
        }
    };
};

export const createCategory = categoryData => {
    return async dispatch => {
        try {
            dispatch(createCategoryRequest());

            await axiosApi.post('/categories', categoryData);

            dispatch(createCategorySuccess());
            dispatch(historyPush('/admin/categories'));
        } catch (e) {
            if (e.response && e.response.data) {
                dispatch(createCategoryFailure(e.response.data));
            } else {
                dispatch(createCategoryFailure({global: 'No internet'}));
            }
        }
    };
};

export const editCategory = (id, categoryData) => {
    return async dispatch => {
        try {
            dispatch(editCategoryRequest());

            await axiosApi.put('/categories/' + id, categoryData);

            dispatch(editCategorySuccess());
            dispatch(historyPush('/admin/categories'));
        } catch (e) {
            if (e.response && e.response.data) {
                dispatch(editCategoryFailure(e.response.data));
            } else {
                dispatch(editCategoryFailure({global: 'No internet'}));
            }
        }
    };
};

export const deleteCategory = id => {
    return async dispatch => {
        try {
            dispatch(deleteCategoryRequest());

            await axiosApi.delete('/categories/' + id);

            dispatch(deleteCategorySuccess());
            dispatch(fetchCategories());
        } catch (e) {
            if (e.response && e.response.data) {
                dispatch(deleteCategoryFailure(e.response.data));
            } else {
                dispatch(deleteCategoryFailure({global: 'No internet'}));
            }
        }
    };
};