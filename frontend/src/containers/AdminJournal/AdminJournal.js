import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Redirect} from "react-router-dom";
import {fetchOperations} from "../../store/actions/operationsActions";
import {Box, Grid, Typography} from "@mui/material";
import MUIDataTable from "mui-datatables";

const AdminJournal = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.users.user);
    const operations = useSelector(state => state.operations.operations);

    useEffect(() => {
        dispatch(fetchOperations());
    }, [dispatch]);

    if (user?.role !== 'admin') {
        return <Redirect to="/"/>;
    }

    const columns = [
        {
            name: "shift",
            label: "Смена",
            options: {
                customBodyRender: (value) => {
                    return value.shiftNumber
                }
            }

        },
        {
            name: "title",
            label: "Операция",
        },
        {
            name: "additionalInfo",
            label: "Сумма",
            options: {
                customBodyRender: (value) => {
                    return value.amountOfMoney
                }
            }
        },
        {
            name: "additionalInfo",
            label: "Касса",
            options: {
                customBodyRender: (value) => {
                    return value.cash
                }
            }
        },
        {
            name: "status",
            label: "Статус",
            options: {
                customBodyRender: () => {
                    return 'Ok'
                }
            }
        },
        {
            name: "dateTime",
            label: "Дата и время",
            options: {
                customBodyRender: (value) => {
                    return new Date(value).toLocaleString();
                }
            }
        },
    ];

    const options = {
        selectableRows: "none",
        filter: false,
        responsive: 'standard',
        serverSide: true,
        sort: false,
        confirmFilters: true,
        search: false,
        print: false,
        download: false,

        rowsPerPage: operations && operations.limit,
        page: operations.page && operations.page - 1,
        rowsPerPageOptions: [],
        count: operations && operations.total,
        onTableChange: (action, tableState) => {
            switch (action) {
                case 'changePage':
                    dispatch(fetchOperations(`?page=${tableState.page + 1}`));
                    break;
                default:
                    break;
            }
        },
    };

    return (
        <Box margin='0 auto'>
            <Grid display='flex' justifyContent='space-between' alignItems='center' marginY='30px'>
                <Typography variant='h5'>Журнал</Typography>
            </Grid>

            <Box>
                <MUIDataTable
                    title={"Журнал"}
                    columns={columns}
                    options={options}
                    data={operations.docs}
                />
            </Box>

        </Box>
    );
};

export default AdminJournal;