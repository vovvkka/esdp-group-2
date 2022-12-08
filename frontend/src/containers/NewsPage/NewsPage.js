import React, {useEffect} from 'react';
import {ThemeProvider} from "@mui/system";
import theme from "../../theme";
import {Box, Container, Stack, Typography, useMediaQuery} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {getNews} from "../../store/actions/newsActions";
import NewsCardDesktop from "../../components/NewsCard/NewsCardDesktop";
import NewsCardMobile from "../../components/NewsCard/NewsCardMobile";

const NewsPage = () => {
    const dispatch = useDispatch();
    const news = useSelector(state => state.news.news);
    const matches = useMediaQuery(theme.breakpoints.down("md"));

    useEffect(() => {
        dispatch(getNews('?shop=true'));
    }, [dispatch]);

    return (
        <ThemeProvider theme={theme}>
            <Container
                disableGutters
                maxWidth="lg"
                sx={{
                    background: "#fff",
                    marginTop: matches ? "150px" : 0
                }}
            >
                <Stack>
                    <Typography variant='h3' sx={{margin: '25px 0'}}>Новости</Typography>
                    <Box>
                        {news.map(item => {
                            return matches ? <NewsCardMobile {...item} key={item._id}/> : <NewsCardDesktop {...item} key={item._id}/>
                        })}
                    </Box>
                </Stack>
            </Container>
        </ThemeProvider>
    );
};

export default NewsPage;