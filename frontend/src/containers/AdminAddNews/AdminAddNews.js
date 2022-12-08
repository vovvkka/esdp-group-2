import React from 'react';
import {Container, Typography} from "@mui/material";
import {useDispatch} from "react-redux";
import {createProduct} from "../../store/actions/productsActions";
import NewsForm from "../../components/NewsForm/NewsForm";

const AdminAddNews = () => {
    const dispatch = useDispatch();

    const onNewsFormSubmit = newsData => {
        dispatch(createProduct(newsData));
    };

    return (
        <Container>
            <Typography
                textAlign="center"
                marginBottom="20px"
                variant="h4"
                marginTop="60px"
            >
                Добавить новость
            </Typography>
            <NewsForm
                onSubmit={onNewsFormSubmit}
            />
        </Container>
    );
};

export default AdminAddNews;