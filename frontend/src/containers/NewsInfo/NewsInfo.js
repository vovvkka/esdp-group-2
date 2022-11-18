import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getOneNews} from "../../store/actions/newsActions";
import {Box} from "@mui/system";
import {Card, CardMedia,Typography} from "@mui/material";
import {apiUrl} from "../../config";

const NewsInfo = ({match}) => {
    const dispatch = useDispatch();
    const oneNews = useSelector(state => state.news.oneNews);

    useEffect(() => {
        dispatch(getOneNews(match.params.id));
    }, [dispatch, match.params.id]);
    return  oneNews && (
        <Card sx={{display: "flex", flexDirection: 'column', alignItems: 'center'}}>
            <Box>
                <CardMedia
                    component="img"
                    fullWidth
                    sx={{ width: 600 }}
                    image={apiUrl + '/' + oneNews.image}
                    alt="oneNews"
                />
            </Box>
            <Box sx={{padding: '2rem', mt: 4}}>
                <Typography color="text.primary" variant="h6" sx={{fontStyle: 'italic'}}>
                     {oneNews.description}
                </Typography>
            </Box>
        </Card>
    );
};

export default NewsInfo;