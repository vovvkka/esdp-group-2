import React from 'react';
import {Typography} from "@mui/material";
import CategoryForm from "../../components/CategoryForm/CategoryForm";

const AdminAddCategory = () => {

    return (
        <>
            <Typography
                textAlign="left"
                marginBottom="30px"
                variant="h4"
            >
                Добавить категорию
            </Typography>
            <CategoryForm
            />
        </>
    );
};

export default AdminAddCategory;