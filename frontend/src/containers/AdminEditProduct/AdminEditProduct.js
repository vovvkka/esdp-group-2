import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {editProduct, fetchOneProduct} from "../../store/actions/productsActions";
import {Typography} from "@mui/material";
import ProductForm from "../../components/ProductForm/ProductForm";
import {fetchCategories} from "../../store/actions/categoriesActions";

const AdminEditProduct = ({match}) => {
    const dispatch = useDispatch();
    const product = useSelector(state => state.products.product);
    const categories = useSelector(state => state.categories.categories);

    useEffect(() => {
        dispatch(fetchCategories('?tree=true'));
    }, [dispatch]);

    useEffect(() => {
        dispatch(fetchOneProduct(match.params.id));
    }, [dispatch, match.params.id]);

    const submitForm = (data) => {
        dispatch(editProduct(match.params.id, data))
    };

    return (
        <div>
            <Typography
                textAlign="center"
                marginBottom="30px"
                variant="h4"
            >
                Редактировать продукт
            </Typography>
            <ProductForm
                product={product}
                categories={categories}
                onSubmit={submitForm}
            />
        </div>
    );
};

export default AdminEditProduct;