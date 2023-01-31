import React, {useEffect, useState} from "react";
import {Box, Button, Container, Grid, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {changeNewsStatus, deleteNews, getNews} from "../../store/actions/newsActions";
import NewsCard from "../../components/NewsCard/NewsCard";
import CustomModal from "../../components/UI/Modal/Modal";

const AdminNews = () => {
    const dispatch = useDispatch();
    const news = useSelector((state) => state.news.news);
    const [wantToDelete, setWantToDelete] = useState(false);
    const [id, setId] = useState(null);
    let modalChildren;

    useEffect(() => {
        dispatch(getNews());
    }, [dispatch]);

    const onChangeStatus = id => {
        dispatch(changeNewsStatus(id));
    };


    const onDeleteNews = async () => {
        await dispatch(deleteNews(id));
        setWantToDelete(false);
        setId(null);
    };

    if (wantToDelete) {
        modalChildren = (
            <Box width="100%">
                <Typography variant="h6">
                    Вы уверены что хотите удалить новость?
                </Typography>

                <Box display="flex" justifyContent="flex-end">
                    <Button
                        autoFocus
                        onClick={() => {
                            setWantToDelete(false);
                        }}
                    >
                        НЕТ
                    </Button>
                    <Button
                        onClick={onDeleteNews}
                        autoFocus
                    >
                        ДА
                    </Button>
                </Box>
            </Box>
        )
    }

    return (
        <Container>
            <Grid
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                sx={{marginTop: "30px"}}
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
                        onChangeStatus={() => onChangeStatus(n._id)}
                        onDeleteNews={() => {
                            setWantToDelete(true);
                            setId(n._id);
                        }}
                    />
                ))}
            </Grid>
            {
                wantToDelete && (
                    <CustomModal
                        isOpen={wantToDelete}
                        handleClose={() => {
                            setWantToDelete(false);
                            setId(null);
                        }}
                    >
                        {modalChildren}
                    </CustomModal>
                )
            }
        </Container>
    );
};

export default AdminNews;
