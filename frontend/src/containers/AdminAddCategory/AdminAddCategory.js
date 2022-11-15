import React from 'react';
import {Container, Typography} from "@mui/material";
import CategoryForm from "../../components/CategoryForm/CategoryForm";
import {useDispatch} from "react-redux";
import {createCategory} from "../../store/actions/categoriesActions";

const AdminAddCategory = () => {
    const dispatch = useDispatch();

    const onSubmitForm = data => {
        dispatch(createCategory(data));
    };

    return (
        <Container>
            <Typography
                textAlign="center"
                marginBottom="30px"
                variant="h4"
            >
                Добавить категорию
            </Typography>
            <CategoryForm onSubmit={data => onSubmitForm(data)}/>
        </Container>
    );
};

export default AdminAddCategory;