import React, {useEffect} from 'react';
import {Container, Typography} from "@mui/material";
import CategoryForm from "../../components/CategoryForm/CategoryForm";
import {useDispatch, useSelector} from "react-redux";
import {createSubCategory, fetchCategories} from "../../store/actions/categoriesActions";

const AdminAddSubCategory = () => {
    const dispatch = useDispatch();
    const categories = useSelector(state => state.categories.categories);

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    const onSubmitForm = data => {
        dispatch(createSubCategory(data));
    };

    return (
        <Container>
            <Typography
                textAlign="center"
                marginBottom="30px"
                variant="h4"
            >
                Добавить подкатегорию
            </Typography>
            <CategoryForm sub onSubmit={data => onSubmitForm(data)} categories={categories}/>
        </Container>
    );
};

export default AdminAddSubCategory;