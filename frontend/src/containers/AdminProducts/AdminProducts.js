import React, {useEffect} from 'react';
import {Box, Button, Grid, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {Link, Redirect} from "react-router-dom";
import {fetchProducts} from "../../store/actions/productsActions";
import TableAdmin from "../../components/UI/Table/Table";
import Spinner from "../../components/UI/Spinner/Spinner";

const AdminProducts = () => {
    const dispatch = useDispatch();
    const products = useSelector(state => state.products.products);
    const loading = useSelector(state => state.products.loading);
    const user = useSelector(state => state.users.user);

    const rowsHead = ['Категория', 'Наименование', 'Изображение', 'Штрихкод', 'Кол-во', 'Ед. изм.', 'Цена закупа', 'Цена продажи', 'Статус', 'Тип', 'Создан', 'Последнее обновление', 'Действие'];

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    if (user?.role !== 'admin') {
        return <Redirect to="/"/>;
    }


    return (
        <Box margin='0 auto'>
            <Grid display='flex' justifyContent='space-between' alignItems='center' marginY='30px'>
                <Typography variant='h5'>Товары</Typography>
                <Button variant='contained' component={Link} to='/admin/products/add-new-product'>Добавить</Button>
            </Grid>
            {loading ? <Spinner/>:
                <Box>
                    {products?.length > 0 ? <TableAdmin rowsHead={rowsHead} rows={products} products={true} />: <Typography variant='h6'>Products not found</Typography>}
                </Box>
            }
        </Box>
    );
};

export default AdminProducts;