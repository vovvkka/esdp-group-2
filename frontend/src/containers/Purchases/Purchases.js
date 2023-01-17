import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchOperations} from "../../store/actions/operationsActions";
import {Box, Grid, Typography} from "@mui/material";
import MUIDataTable from "mui-datatables";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const Purchases = () => {
    const dispatch = useDispatch();
    const operations = useSelector(state => state.operations.operations);

    useEffect(() => {
        dispatch(fetchOperations(null,'Продажа'));
    }, [dispatch]);

    const columns = [
        {
            name: "_id",
            label: "ID",
        },
        {
            name: "additionalInfo",
            label: "Покупатель",
            options: {
                customBodyRender: (value) => {
                    if (!value.customer) {
                        return 'Покупатель'
                    }
                    return `${value.customer.name} ${value.customer.surname}`
                }
            }

        },
        {
            name: "additionalInfo",
            label: "Получено",
            options: {
                customBodyRender: (value) => {
                    return value.amountOfMoney
                }
            }
        },
        {
            name: "additionalInfo",
            label: "Итого по чеку",
            options: {
                customBodyRender: (value) => {
                    return value.amountOfMoney
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
        expandableRows: true,

        renderExpandableRow: (rowData) => {
            const row = operations.docs.filter(operation => operation._id === rowData[0]);

            return (
                <React.Fragment>
                    <tr>
                        <td colSpan={6}>
                            <TableContainer component={Paper}>
                                <Table style={{ minWidth: "650" }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="center">Наименование</TableCell>
                                            <TableCell align="center">Количество</TableCell>
                                            <TableCell align="center">Цена</TableCell>
                                            <TableCell align="center">Сумма</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {row[0].additionalInfo.completePurchaseInfo.map(row => (
                                            <TableRow key={row._id}>
                                                <TableCell component="th" scope="row">
                                                    {row.title}
                                                </TableCell>
                                                <TableCell align="center">{row.quantity}</TableCell>
                                                <TableCell align="center">{row.price}</TableCell>
                                                <TableCell align="center">{row.quantity * row.price}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </td>
                    </tr>
                </React.Fragment>
            );
        },

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
        <Box width='95%' margin='0 auto'>
            <Grid display='flex' justifyContent='space-between' alignItems='center' marginY='30px'>
                <Typography variant='h5'>Продажи</Typography>
            </Grid>

            <Box>
                <MUIDataTable
                    title={"Продажи"}
                    columns={columns}
                    options={options}
                    data={operations.docs}
                />
            </Box>

        </Box>
    );
};

export default Purchases;