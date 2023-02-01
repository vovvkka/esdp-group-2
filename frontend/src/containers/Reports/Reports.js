import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Box, Button, Typography} from "@mui/material";
import MUIDataTable from "mui-datatables";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import TextField from '@mui/material/TextField';
import SearchIcon from "@mui/icons-material/Search";
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import {ru} from "date-fns/locale";
import {fetchReports} from "../../store/actions/operationsActions";

const Reports = () => {
    const dispatch = useDispatch();
    const reports = useSelector(state => state.operations.reports);
    const shift = useSelector(state => state.shifts.shift);
    const [periodDate, setPeriodDate] = useState({from: null, to: null,});

    useEffect(() => {
        dispatch(fetchReports());
    }, [dispatch]);
    const onChangePeriod = () => {
        if (periodDate.from) {
            dispatch(fetchReports(periodDate));
        }

        if (!periodDate.from) {
            dispatch(fetchReports());
        }
    };

    const columns = [
        {
            name: "_id",
            label: "Дата",
        },
        {
            name: "totalSales",
            label: "Касса",
        },
        {
            name: "totalProfit",
            label: "Доход",
        },
    ];

    const options = {
        selectableRows: "none",
        filter: false,
        responsive: 'standard',
        serverSide: false,
        pagination: true,
        sort: true,
        confirmFilters: false,
        search: false,
        print: false,
        download: true,
        expandableRows: true,

        renderExpandableRow: (rowData) => {
            const row = reports.filter(operation => operation._id === rowData[0]);

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
                                            <TableCell align="center">Скидка</TableCell>
                                            <TableCell align="center">Итоговая цена</TableCell>
                                            <TableCell align="center">Закупочная цена</TableCell>
                                            <TableCell align="center">Итог закупочной цена</TableCell>
                                            <TableCell align="center">Разница</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {row[0].additonalInfo?.map((row, index) => {

                                            return (
                                                <TableRow key={index}>
                                                    <TableCell component="th" scope="row">
                                                        {row.title}
                                                    </TableCell>
                                                    <TableCell align="center">{row.quantity}</TableCell>
                                                    <TableCell align="center">{row.price}</TableCell>
                                                    <TableCell align="center">{Math.floor(row.totalDiscount)}</TableCell>
                                                    <TableCell align="center">{Math.floor(row.price * row.quantity - row.totalDiscount)}</TableCell>
                                                    <TableCell align="center">{row.purchasePrice}</TableCell>
                                                    <TableCell align="center">{Math.floor(row.purchasePrice * row.quantity)}</TableCell>
                                                    <TableCell align="center">{Math.floor((row.price * row.quantity - row.totalDiscount) - (row.purchasePrice * row.quantity))}</TableCell>
                                                </TableRow>
                                            );
                                        })}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </td>
                    </tr>
                </React.Fragment>
            );
        },
    };

    return (
        <Box width='95%' margin={shift?'50px auto 0':'0 auto'}>
            <Box display='flex' justifyContent='space-between' marginY='20px'>
                <Typography variant='h5'></Typography>

                <Box display='flex' alignItems='stretch'>
                    <LocalizationProvider locale={ru} dateAdapter={AdapterDateFns}>
                        <DatePicker
                            label="от"
                            openTo="month"
                            views={['year', 'month', 'day']}
                            value={periodDate.from}
                            onChange={(newValue) => {
                                setPeriodDate(prevState => ({
                                    ...prevState,
                                    from: newValue,
                                }));
                            }}
                            renderInput={(params) => <TextField {...params}/>}
                        />
                    </LocalizationProvider>

                    <LocalizationProvider locale={ru}  dateAdapter={AdapterDateFns}>
                        <DatePicker
                            label="До"
                            openTo="month"
                            views={['year', 'month', 'day']}
                            value={periodDate.to}
                            onChange={(newValue) => {
                                setPeriodDate(prevState => ({
                                    ...prevState,
                                    to: newValue,
                                }));
                            }}
                            disabled={Boolean(!periodDate.from)}
                            renderInput={(params) => <TextField {...params}/>}
                        />
                    </LocalizationProvider>

                    <Button
                        startIcon={<SearchIcon/>}
                        type='submit'
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={onChangePeriod}
                    >
                        Поиск
                    </Button>

                </Box>
            </Box>

            <Box>
                <MUIDataTable
                    title={"Отчёт"}
                    columns={columns}
                    options={options}
                    data={reports ? reports: []}
                />
            </Box>

        </Box>
    );
};

export default Reports;