import React, {useEffect} from 'react';
import {Typography} from "@mui/material";
import ProductForm from "../../components/ProductForm/ProductForm";
import {useDispatch, useSelector} from "react-redux";
import {fetchCategoriesRequest} from "../../store/slices/CategoriesSlice";

const AdminAddProduct = () => {
    const dispatch = useDispatch();
    const categories = useSelector(state => state.categories.categories);
    // const error = useSelector(state => state.products.createProductsError);

    useEffect(() => {
        dispatch(fetchCategoriesRequest());
    }, [dispatch]);

    // const onProductFormSubmit = productData => {
    //     dispatch(createProduct(productData));
    // };

    return (
        <>
            <Typography
                textAlign="center"
                marginBottom="20px"
                variant="h4"
            >
                Добавить товар
            </Typography>
            <ProductForm
                // categories={categories}
                // error={error}
                // onSubmit={onProductFormSubmit}
            />
        </>
    );
};

export default AdminAddProduct;