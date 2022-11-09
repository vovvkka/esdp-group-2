import React, {useEffect} from 'react';
import {Box, Button, Grid, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {Link, Redirect} from "react-router-dom";
import MUIDataTable from "mui-datatables";
import {deleteProduct, fetchProducts} from "../../store/actions/productsActions";
import Spinner from "../../components/UI/Spinner/Spinner";
import EditSharpIcon from "@mui/icons-material/EditSharp";
import DeleteForeverSharpIcon from "@mui/icons-material/DeleteForeverSharp";

const AdminProducts = () => {
    const dispatch = useDispatch();
    const products = useSelector(state => state.products.products);
    const loading = useSelector(state => state.products.loading);
    const user = useSelector(state => state.users.user);

    const columns = [
        {
          name: "category",
          label: "Категория",
          options: {
              filter: true,
              sort: false,
              customBodyRender: (value) => {
                  return value.title;
              }
          }
        },
        {
            name: "title",
            label: "Наименование",
            options: {
                filter: false
            }
        },
        {
            label: "Штрихкод",
            name: "barcode",
            options: {
                filter: false,
                sort: false,
            }
        },
        {
            name: "amount",
            label: "Кол-во",
            options: {
                filter: false
            }
        },
        {
            name: "unit",
            label: "Ед. изм.",
            options: {
                filter: false,
                sort: false
            }
        },
        {
            name: "purchasePrice",
            label: "Цена закупа",
            options: {
                filter: false,
            }
        },
        {
            name: "price",
            label: "Цена",
            options: {
                filter: false,
            }
        },
        {
            name: "status",
            label: "Статус",
            options: {
                filter: true
            }
        },
        {
            name: "priceType",
            label: "Тип",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "createdAt",
            label: "Дата создания",
            options: {
                filter: false,
                customBodyRender: (value) => {
                    return new Date(value).toLocaleString();
                }
            }
        },
        {
            name: "updatedAt",
            label: "Дата обновления",
            options: {
                filter: false,
                customBodyRender: (value) => {
                    return new Date(value).toLocaleString();
                }
            }
        },
        {
            name: "_id",
            label: 'Действие',
            options: {
                filter: false,
                sort: false,
                empty: true,
                customBodyRender: (value) => {
                    return (
                        <Box display='flex' justifyContent='center'>
                            <Button component={Link} to={"/admin/products/edit-product/" + value}><EditSharpIcon/></Button>
                            <Button onClick={() => dispatch(deleteProduct(value))}><DeleteForeverSharpIcon/></Button>
                        </Box>
                    );
                }
            }
        }
    ];

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
                    {products?.length > 0 ? <MUIDataTable
                        title={"Список товаров"}
                        data={products}
                        columns={columns}
                        options={{
                            selectableRows: false
                        }}
                    />
                        : <Typography variant='h6'>Products not found</Typography>}
                </Box>
            }
        </Box>
    );
};

export default AdminProducts;