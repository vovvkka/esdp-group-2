import React from 'react';
import {Typography} from "@mui/material";
import {useDispatch} from "react-redux";
import {createProduct} from "../../store/actions/productsActions";
import NewsForm from "../../components/NewsForm/NewsForm";

const AdminAddNews = () => {
    const dispatch = useDispatch();

    const onNewsFormSubmit = newsData => {
        dispatch(createProduct(newsData));
    };

    return (
        <>
            <Typography
                textAlign="center"
                marginBottom="20px"
                variant="h4"
            >
                Добавить новость
            </Typography>
            <NewsForm
                onSubmit={onNewsFormSubmit}
            />
        </>
    );
};

export default AdminAddNews;