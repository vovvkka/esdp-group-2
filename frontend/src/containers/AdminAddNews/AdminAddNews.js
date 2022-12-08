import React from 'react';
import {Container, Typography} from "@mui/material";
import {useDispatch} from "react-redux";
import NewsForm from "../../components/NewsForm/NewsForm";
import {createNews} from "../../store/actions/newsActions";

const AdminAddNews = () => {
    const dispatch = useDispatch();

    const onNewsFormSubmit = newsData => {
        dispatch(createNews(newsData));
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