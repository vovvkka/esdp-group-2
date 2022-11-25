import React, {useEffect} from 'react';
import {Box, Button, Container, Grid, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {Link, Redirect} from "react-router-dom";
import {fetchCategories} from "../../store/actions/categoriesActions";
import TableAdmin from "../../components/UI/Table/Table";
import Spinner from "../../components/UI/Spinner/Spinner";

const AdminCategories = () => {
    const dispatch = useDispatch();
    const categories = useSelector(state => state.categories.categories);
    const loading = useSelector(state => state.categories.loading);
    const user = useSelector(state => state.users.user);

    const rowsHead = ['Наименование', 'Плательщик', 'НДС,%', 'НСП нал,%', 'НСП безнал,%', 'Статус', 'Создан', 'Обновлен', 'Действие'];

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    if (user?.role !== 'admin') {
        return <Redirect to="/"/>;
    }

    return (
        <Container>
            <Grid display='flex' justifyContent='space-between' alignItems='center' marginY='30px'>
                <Typography variant='h5'>Категории</Typography>
                <Box>
                    <Button variant='contained' component={Link} to='/admin/categories/add-new-category' sx={{margin: '0 10px'}}>Добавить категорию</Button>
                    <Button variant='contained' component={Link} to='/admin/categories/add-new-subcategory'>Добавить подкатегорию</Button>
                </Box>
            </Grid>
            {loading ? <Spinner/>:
                <Box>
                    {categories?.length > 0 ? <TableAdmin rowsHead={rowsHead} rows={categories} categories='Категории товаров' />: <Typography variant='h6'>Categories not found</Typography>}
                </Box>
            }
        </Container>
    );
};

export default AdminCategories;