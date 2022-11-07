import React from 'react';
import {Container, Typography} from "@mui/material";
import CategoryForm from "../../components/CategoryForm/CategoryForm";

const AdminAddCategory = () => {

    return (
        <Container>
            <Typography
                textAlign="left"
                marginBottom="30px"
                variant="h4"
            >
                Добавить категорию
            </Typography>
            <CategoryForm
            />
        </Container>
    );
};

export default AdminAddCategory;