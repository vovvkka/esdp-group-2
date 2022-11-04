import React from 'react';
import {Typography} from "@mui/material";
import CategoryForm from "../../components/CategoryForm/CategoryForm";

const AdminAddCategory = () => {

    return (
        <>
            <Typography
                textAlign="center"
                marginBottom="20px"
                variant="h4"
            >
                Add Category
            </Typography>
            <CategoryForm
            />
        </>
    );
};

export default AdminAddCategory;