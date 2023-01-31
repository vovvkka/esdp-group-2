import React, { useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import MUIDataTable from "mui-datatables";
import {Box, Button, Container, Grid, Typography} from "@mui/material";
import DeleteForeverSharpIcon from "@mui/icons-material/DeleteForeverSharp";
import EditSharpIcon from "@mui/icons-material/EditSharp";
import { deleteClient, fetchClients } from "../../store/actions/clientsActions";
import Spinner from "../../components/UI/Spinner/Spinner";

const AdminClients = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.users.user);
    const clients = useSelector((state) => state.clients.clients);
    const loading = useSelector((state) => state.clients.loading);

    const columns = [
        {
            name: "customerNumber",
            label: "ID",
        },
        {
            name: "avatar",
            label: "Аватар",
        },
        {
            name: "name",
            label: "Имя",
        },
        {
            name: "surname",
            label: "Фамилия",
        },
        {
            name: "email",
            label: "Email",
        },
        {
            name: "phone",
            label: "Телефон",
        },
        {
            name: "address",
            label: "Адрес",
        },
        {
            name: "discount",
            label: "Скидка, %",
        },
        {
            name: "createdAt",
            label: "Дата создания",
            options: {
                filter: false,
                customBodyRender: (value) => {
                    return new Date(value).toLocaleString();
                },
            },
        },
        {
            name: "updatedAt",
            label: "Дата обновления",
            options: {
                filter: false,
                customBodyRender: (value) => {
                    return new Date(value).toLocaleString();
                },
            },
        },
        {
            name: "_id",
            label: "Действие",
            options: {
                filter: false,
                empty: true,
                customBodyRender: (value) => {
                    return (
                        <Box display="flex" justifyContent="center">
                            <Button
                                component={Link}
                                to={"/admin/clients/edit-client/" + value}
                            >
                                <EditSharpIcon />
                            </Button>
                            <Button
                                onClick={() => dispatch(deleteClient(value))}
                            >
                                <DeleteForeverSharpIcon />
                            </Button>
                        </Box>
                    );
                },
            },
        },
    ];

    useEffect(() => {
        dispatch(fetchClients());
    }, [dispatch]);

    if (user?.role !== "admin") {
        return <Redirect to="/" />;
    }

    const options = {
        selectableRows: "none",
        filter: false,
        responsive: "standard",
        serverSide: true,
        sort: false,
        confirmFilters: true,
        search: false,
        print: false,
        download: false,

        rowsPerPage: clients && clients.limit,
        page: clients.page && clients.page - 1,
        rowsPerPageOptions: [],
        count: clients && clients.total,
        onTableChange: (action, tableState) => {
            switch (action) {
                case "changePage":
                    dispatch(fetchClients(`?page=${tableState.page + 1}`));
                    break;
                default:
                    break;
            }
        },
    };

    return (
        <Container maxWidth="xl">
            <Box width="95%" margin="0 auto">
                <Grid
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    marginY="30px"
                >
                    <Typography variant="h5">Клиенты</Typography>
                    <Button
                        variant="contained"
                        component={Link}
                        to="/admin/clients/add-new-client"
                    >
                        Добавить
                    </Button>
                </Grid>

                <Box>
                    {loading ? (
                        <Spinner admin/>
                    ) : (
                        <MUIDataTable
                            title={"Список клиентов"}
                            columns={columns}
                            options={options}
                            data={clients.docs}
                        />
                    )}
                </Box>
            </Box>
        </Container>
    );
};

export default AdminClients;
