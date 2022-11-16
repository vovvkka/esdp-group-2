import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Typography} from "@mui/material";
import NewsForm from "../../components/NewsForm/NewsForm";
const AdminEditNews = ({match}) => {
    const dispatch = useDispatch();
    // const news = useSelector(state => state.news.singleNews);

    useEffect(() => {
        // dispatch(fetchOneNews(match.params.id));
    }, [dispatch, match.params.id]);

    const submitForm = (data) => {
        // dispatch(editNews(match.params.id, data))
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
            <NewsForm
                // news={news}
                onSubmit={submitForm}
            />
        </div>
    );
};

export default AdminEditNews;