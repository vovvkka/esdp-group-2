import React, {useEffect} from "react";
import {Button, Container, Grid, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getNews} from "../../store/actions/newsActions";
import NewsCard from "../../components/NewsCard/NewsCard";

const AdminNews = () => {
    const dispatch = useDispatch();
    const news = useSelector((state) => state.news.news);

    useEffect(() => {
        dispatch(getNews());
    }, [dispatch]);

    return (
        <Container>
            <Grid
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                sx={{marginTop: "60px"}}
            >
                <Typography variant="h5">Новости</Typography>
                <Button
                    variant="contained"
                    component={Link}
                    to="/admin/news/add-new-news"
                >
                    Добавить
                </Button>
            </Grid>
            <Grid>
                {news.map((n) => (
                    <NewsCard
                        n={n}
                        key={n._id}
                        isAdmin={true}
                    />
                ))}
            </Grid>
        </Container>
    );
};

export default AdminNews;
