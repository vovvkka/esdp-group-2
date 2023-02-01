import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Box, Button, Container, Grid, Typography} from "@mui/material";
import MUIDataTable from "mui-datatables";
import {changeStatus, getOrders} from "../../store/actions/ordersActions";
import FormSelect from "../../components/UI/Form/FormSelect/FormSelect";
import CustomModal from "../../components/UI/Modal/Modal";
import { useReactToPrint } from 'react-to-print';
import './AdminOrders.css';
import Spinner from "../../components/UI/Spinner/Spinner";

const AdminOrders = () => {
    const dispatch = useDispatch();
    const orders = useSelector(state => state.orders.orders);
    const loading = useSelector(state => state.orders.loading);
    const [status, setStatus] = useState(null);
    const [order, setOrder] = useState(null);
    const [openDetailInfo, setOpenDetailInfo] = useState(false);

    useEffect(() => {
        dispatch(getOrders('?status=active'));
    }, [dispatch]);

    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    const openOrderModal = async (row) => {
        await setOrder(row);
        setOpenDetailInfo(true);
    };

    const onChangeStatus = e => setStatus(e.target.value);

    const onSubmitStatus = () => {
        dispatch(changeStatus(order._id, status));
        setOpenDetailInfo(false);
        setStatus(null);
    };

    const columns = [
        {
            name: "orderNumber",
            label: "№",
            options: {
                filter: false
            }
        },
        {
            name: "customer",
            label: "Имя",
            options: {
                filter: false
            }
        },
        {
            name: "phone",
            label: "Телефон",
            options: {
                filter: false
            }
        },
        {
            name: "status",
            label: "Статус",
            options: {
                filter: true,
                filterOptions: {
                    names: ['Закрытые', 'Открытые']
                },
                customBodyRender: (value) => {
                    let color;

                    if (value === 'Новый') {
                        color = "#ffb6b6"
                    } else if (value === 'Собран') {
                        color = "#ffe5b6"
                    } else if (value === 'Закрыт') {
                        color = "#cdfdcd"
                    } else {
                        color = "white"
                    }

                    return <Box display="flex" justifyContent="center" alignItems='center'
                                sx={{backgroundColor: color, borderRadius: "15px", height: "30px"}}>{value}</Box>
                },
            }
        },
        {
            name: "dateTime",
            label: "Дата",
            options: {
                filter: false,
                customBodyRender: (value) => {
                    return new Date(value).toLocaleString();
                }
            }
        },
    ];

    const options = {
        selectableRows: "none",
        filter: true,
        onFilterChange: (changedColumn, filterList) => {
            if (filterList[3][0] === 'Открытые') {
                dispatch(getOrders('?status=active'));
            } else if (filterList[3][0] === 'Закрытые') {
                dispatch(getOrders('?status=closed'));
            } else {
                dispatch(getOrders());
            }
        },
        responsive: 'standard',
        serverSide: true,
        sort: false,
        search: false,
        viewColumns: false,
        print: false,
        download: false,

        rowsPerPage: orders && orders.limit,
        page: orders.page && orders.page - 1,
        rowsPerPageOptions: [],
        count: orders && orders.total,

        onRowClick: (data, index) => openOrderModal(orders.docs[index.dataIndex]),
        onTableChange: (action, tableState) => {
            switch (action) {
                case 'changePage':
                    if (tableState.filterList[3][0] === 'Закрытые') {
                        dispatch(getOrders(`?status=closed&page=${tableState.page + 1}`));
                    } else if (tableState.filterList[3][0] === 'Открытые') {
                        dispatch(getOrders(`?status=active&page=${tableState.page + 1}`));
                    } else {
                        dispatch(getOrders(`?page=${tableState.page + 1}`));
                    }
                    break;
                default:
                    break;
            }
        },
    };

    if (loading) {
        return <Spinner admin/>;
    }

    return (
        <>
            {
                openDetailInfo && (
                    <CustomModal
                        isOpen={openDetailInfo}
                        handleClose={() => {
                            setOpenDetailInfo(false);
                        }}
                    >
                        <Box width='550px'>
                            <Grid sx={{maxHeight: 400, overflowY: 'scroll', marginBottom: '30px'}} ref={componentRef} className='print'>
                                <Typography textAlign="center" variant="h4" gutterBottom><b>Информация о
                                    заказе</b></Typography>

                                <Typography variant="h5"><b>Контакты:</b></Typography>
                                <Typography><b>Заказчик:</b> {order && order.customer}</Typography>
                                <Typography><b>Телефон:</b> {order && order.phone}</Typography>
                                <Typography><b>Адрес:</b> {order && order.address}</Typography>
                                <Typography><b>Комментарий:</b> {order && order.comment}</Typography>

                                <Typography variant="h5" sx={{marginTop: '20px'}} gutterBottom><b>Заказ:</b></Typography>
                                {order && order.order.map(order => (
                                    <Typography key={order._id}>{order.product.title} <b>{order.quantity} x {order.price}c</b></Typography>
                                ))}
                                <Typography variant="h5" sx={{marginTop: '20px'}} gutterBottom><b>Итого : {order && order.order.reduce((acc, value) => {
                                    return acc + value.price * value.quantity;
                                }, 0)} c</b></Typography>
                            </Grid>

                            {order && order.status !== 'Закрыт' && (
                                <Grid>
                                    <FormSelect
                                        options={["Новый", "Собран", "Закрыт"]}
                                        label="Статус"
                                        onChange={onChangeStatus}
                                        value={status ? status : order.status}
                                        name="status"
                                    />
                                    <Button
                                        variant="contained"
                                        sx={{color: '#fff !important', marginTop: '10px', marginRight: '10px'}}
                                        onClick={handlePrint}
                                    >
                                        Распечатать
                                    </Button>
                                    <Button
                                        variant="contained"
                                        sx={{color: '#fff !important', marginTop: '10px'}}
                                        onClick={onSubmitStatus}
                                    >
                                        Сохранить
                                    </Button>
                                </Grid>
                            )}
                        </Box>
                    </CustomModal>
                )
            }

            <Container>
                <Box>
                    <MUIDataTable
                        title={"Список заказов"}
                        columns={columns}
                        options={options}
                        data={orders.docs}
                    />
                </Box>
            </Container>
        </>
    );
};

export default AdminOrders;