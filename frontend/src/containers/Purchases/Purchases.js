import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOperations } from "../../store/actions/operationsActions";
import { Box, Button, Container, Typography } from "@mui/material";
import MUIDataTable from "mui-datatables";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { ru } from "date-fns/locale";
import { clearOperations } from "../../store/slices/operationsSlice";
import Spinner from "../../components/UI/Spinner/Spinner";

const Purchases = () => {
    const dispatch = useDispatch();
    const operations = useSelector((state) => state.operations.operations);
    const loading = useSelector((state) => state.operations.loading);
    const shift = useSelector((state) => state.shifts.shift);
    const [periodDate, setPeriodDate] = useState({ from: null, to: null });

    useEffect(() => {
        dispatch(fetchOperations(null, "Продажа"));

        return () => {
            dispatch(clearOperations());
        };
    }, [dispatch]);

    const onChangePeriod = () => {
        if (periodDate.from) {
            dispatch(fetchOperations(null, "Продажа", periodDate));
        }
    };

    const columns = [
        {
            name: "_id",
            label: "ID",
        },{
            name: "shift",
            label: "Смена",
            options: {
                customBodyRender: (value) => {
                    return value.shiftNumber;
                },
            },
        },
        {
            name: "shift",
            label: "Кассир",
            options: {
                customBodyRender: (value) => {
                    return value.cashier.displayName;
                },
            },
        },
        {
            name: "additionalInfo",
            label: "Покупатель",
            options: {
                customBodyRender: (value) => {
                    if (!value.customer) {
                        return "Покупатель";
                    }
                    return `${value.customer.name} ${value.customer.surname}`;
                },
            },
        },
        {
            name: "additionalInfo",
            label: "Получено",
            options: {
                customBodyRender: (value) => {
                    return value.amountOfMoney;
                },
            },
        },
        {
            name: "additionalInfo",
            label: "Итого по чеку",
            options: {
                customBodyRender: (value) => {
                    return value.amountOfMoney;
                },
            },
        },
        {
            name: "status",
            label: "Статус",
            options: {
                customBodyRender: () => {
                    return "Ok";
                },
            },
        },
        {
            name: "dateTime",
            label: "Дата и время",
            options: {
                customBodyRender: (value) => {
                    return new Date(value).toLocaleString();
                },
            },
        },
    ];

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
        expandableRows: true,

        renderExpandableRow: (rowData) => {
            const row = operations.docs.filter(
                (operation) => operation._id === rowData[0]
            );

            return (
                <React.Fragment>
                    <tr>
                        <td colSpan={6}>
                            <TableContainer component={Paper}>
                                <Table
                                    style={{ minWidth: "650" }}
                                    aria-label="simple table"
                                >
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="center">
                                                Наименование
                                            </TableCell>
                                            <TableCell align="center">
                                                Количество
                                            </TableCell>
                                            <TableCell align="center">
                                                Цена
                                            </TableCell>
                                            <TableCell align="center">
                                                Сумма
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {row[0].additionalInfo.completePurchaseInfo.map(
                                            (row) => (
                                                <TableRow key={row._id}>
                                                    <TableCell
                                                        component="th"
                                                        scope="row"
                                                    >
                                                        {row.title}
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        {row.quantity}
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        {row.price}
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        {row.quantity *
                                                            row.price}
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        )}
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
                case "changePage":
                    dispatch(
                        fetchOperations(
                            `?page=${tableState.page + 1}`,
                            "Продажа",
                            periodDate
                        )
                    );
                    break;
                default:
                    break;
            }
        },
    };

    return (
        <Container maxWidth="xl">
            <Box width="95%" margin={shift ? "50px auto 0" : "0 auto"}>
                <Box
                    display="flex"
                    justifyContent="space-between"
                    marginY="20px"
                >
                    <Typography variant="h5">Журнал продаж</Typography>

                    <Box display="flex" alignItems="stretch">
                        <Box sx={{marginRight: '10px', width: '100%'}}>
                            <LocalizationProvider
                                locale={ru}
                                dateAdapter={AdapterDateFns}
                            >
                                <DatePicker
                                    label="от"
                                    openTo="month"
                                    views={["year", "month", "day"]}
                                    value={periodDate.from}
                                    onChange={(newValue) => {
                                        setPeriodDate((prevState) => ({
                                            ...prevState,
                                            from: newValue,
                                        }));
                                    }}
                                    renderInput={(params) => (
                                        <TextField {...params} />
                                    )}
                                />
                            </LocalizationProvider>
                        </Box>

                        <Box sx={{marginRight: '10px', width: '100%'}}>
                            <LocalizationProvider
                                locale={ru}
                                dateAdapter={AdapterDateFns}
                            >
                                <DatePicker
                                    label="До"
                                    openTo="month"
                                    views={["year", "month", "day"]}
                                    value={periodDate.to}
                                    onChange={(newValue) => {
                                        setPeriodDate((prevState) => ({
                                            ...prevState,
                                            to: newValue,
                                        }));
                                    }}
                                    disabled={Boolean(!periodDate.from)}
                                    renderInput={(params) => (
                                        <TextField {...params} />
                                    )}
                                />
                            </LocalizationProvider>
                        </Box>

                        <Button
                            startIcon={<SearchIcon sx={{ color: '#ffffff' }} />}
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={onChangePeriod}
                        >
                            Поиск
                        </Button>
                    </Box>
                </Box>

                {loading ? (
                    <Spinner admin/>
                ) : (
                    <MUIDataTable
                        title={"Продажи"}
                        columns={columns}
                        options={options}
                        data={operations.docs}
                    />
                )}
            </Box>
        </Container>
    );
};

export default Purchases;
