import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchOneProduct} from "../../store/actions/productsActions";
import {Typography} from "@mui/material";
import ProductForm from "../../components/ProductForm/ProductForm";
import {editCategory} from "../../store/actions/categoriesActions";

const AdminEditProduct = ({match}) => {
    const dispatch = useDispatch();
    const product = useSelector(state => state.products.product);

    useEffect(() => {
        dispatch(fetchOneProduct(match.params.id));
    }, [dispatch, match.params.id]);

    const submitForm = (data) => {
        dispatch(editCategory(match.params.id, {...data}))
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
                onSubmit={submitForm}
            />
        </div>
    );
};

export default AdminEditProduct;