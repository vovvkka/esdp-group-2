import React from 'react';
import {Button, Container, Grid, Typography} from "@mui/material";
import {Link} from "react-router-dom";

const AdminNews = () => {
    return (
        <Container>
            <Grid display='flex' justifyContent='space-between' alignItems='center' sx={{marginTop: '60px'}}>
                <Typography variant='h5'>Новости</Typography>
                <Button variant='contained' component={Link} to='/admin/news/add-new-news'>Добавить</Button>
            </Grid>
        </Container>
    );
};

export default AdminNews;