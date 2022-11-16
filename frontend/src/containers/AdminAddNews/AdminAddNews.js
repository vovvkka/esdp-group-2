import React from 'react';
import {Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {createProduct} from "../../store/actions/productsActions";
import NewsForm from "../../components/NewsForm/NewsForm";

const AdminAddNews = () => {
    const dispatch = useDispatch();
    // const error = useSelector(state => state.news.createNewsError);

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
                // error={error}
                onSubmit={onNewsFormSubmit}
            />
        </>
    );
};

export default AdminAddNews;