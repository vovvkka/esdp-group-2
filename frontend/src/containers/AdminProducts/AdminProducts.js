import React, {useEffect} from 'react';
import {Box, Button, Grid, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {Link, Redirect} from "react-router-dom";
import MUIDataTable from "mui-datatables";
import {deleteProduct, fetchProductsTable} from "../../store/actions/productsActions";
import Spinner from "../../components/UI/Spinner/Spinner";
import EditSharpIcon from "@mui/icons-material/EditSharp";
import DeleteForeverSharpIcon from "@mui/icons-material/DeleteForeverSharp";
import {fetchCategories} from "../../store/actions/categoriesActions";


const AdminProducts = () => {
    const dispatch = useDispatch();
    const products = useSelector(state => state.products.products);
    const productsTable = useSelector(state => state.products.productsTable);
    const categories = useSelector(state => state.categories.categories);
    const loading = useSelector(state => state.products.fetchLoading);
    const user = useSelector(state => state.users.user);

    const asd = categories.map(category => category.title);

    const columns = [
        {
            name: "category",
            label: "Категория",
            options: {
                filter: true,
                filterList: [],
                customBodyRender: (value) => {
                    return value.title;
                },
                filterOptions: {
                    names: asd,
                },

            }
        },
        {
            name: "title",
            label: "Наименование",
            options: {
                filter: false,
            }
        },
        {
            label: "Штрихкод",
            name: "barcode",
            options: {
                filter: false,
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
                filter: true,
                filterList: []
            }
        },
        {
            name: "priceType",
            label: "Тип",
            options: {
                filter: false,
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
        dispatch(fetchProductsTable());
        dispatch(fetchCategories());
    }, [dispatch]);


    useEffect(() => {
        dispatch(fetchProductsTable());
    }, [dispatch, products]);


    if (user?.role !== 'admin') {
        return <Redirect to="/"/>;
    }

    const handleFilterSubmit = async (applyFilters) => {
        let filterList = applyFilters();

        if (filterList[0][0]) {
            await dispatch(fetchProductsTable(`?category=${filterList[0][0]}`));
        } else {
            await dispatch(fetchProductsTable());
        }
    };

    const onSearch = value => {
        dispatch(fetchProductsTable('?key=' + value));
    };


    const options = {
        selectableRows: "none",
        filter: true,
        filterType: 'dropdown',
        responsive: 'standard',
        serverSide: true,
        sort: false,
        confirmFilters: true,

        customFilterDialogFooter: (currentFilterList, applyNewFilters) => {
            return (
                <div style={{ marginTop: '40px' }}>
                    <Button type='button' variant="contained" onClick={() => handleFilterSubmit(applyNewFilters)}>Применить фильтры</Button>
                </div>
            );
        },


        onFilterConfirm: (changedColumn, filterList) => {
            console.log('onFilterConfirm');
            changedColumn.filterList = filterList
        },

        onFilterDialogOpen: () => {
            console.log('filter dialog opened');
        },
        onFilterDialogClose: () => {
            console.log('filter dialog closed');
        },
        onFilterChange: (changedColumn, filterList) => {
            changedColumn.filterList = filterList
        },


        rowsPerPage: productsTable && productsTable.limit,
        page: productsTable && productsTable.page - 1,
        rowsPerPageOptions: [],
        count: productsTable && productsTable.total,
        onTableChange: (action, tableState) => {
            switch (action) {
                case 'changePage':
                    dispatch(fetchProductsTable(`?page=${tableState.page + 1}`));
                    break;
                case 'search':
                    onSearch(tableState.searchText);
                    break;
                default:
                    break;
            }
        },
    };

    return (
        <Box margin='0 auto'>
            <Grid display='flex' justifyContent='space-between' alignItems='center' marginY='30px'>
                <Typography variant='h5'>Товары</Typography>
                <Button variant='contained' component={Link} to='/admin/products/add-new-product'>Добавить</Button>
            </Grid>

            {loading ? <Spinner/>:
                <Box>
                    <MUIDataTable
                        title={"Список товаров"}
                        data={productsTable.docs || []}
                        columns={columns}
                        options={options}
                    />
                </Box>
            }

        </Box>
    );
};

export default AdminProducts;