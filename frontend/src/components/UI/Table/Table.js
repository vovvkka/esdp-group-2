import React, {useRef} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Box, Button} from "@mui/material";
import EditSharpIcon from '@mui/icons-material/EditSharp';
import DeleteForeverSharpIcon from '@mui/icons-material/DeleteForeverSharp';
import {deleteCategory} from "../../../store/actions/categoriesActions";
import {useDispatch} from "react-redux";
import {Link} from "react-router-dom";
import {useDownloadExcel} from "react-export-table-to-excel";
import {deleteCashier} from "../../../store/actions/cashiersActions";


const TableAdmin = ({rows, rowsHead, categories, products, cashiers, orders, shifts, onOpenOrderModal}) => {
    const dispatch = useDispatch();
    const tableRef = useRef(null);


    const {onDownload} = useDownloadExcel({
        currentTableRef: tableRef.current,
        filename: categories || products,
        sheet: categories || products
    })

    let render;

    if (categories) {
        render = rows.map((row) => {
            let ancestors;
            if (row.category) {
                ancestors = row.ancestors.reduce(
                    (accumulator, currentValue, i) => {
                        if (i === 0) {
                            return accumulator + currentValue.title;
                        } else {
                            return accumulator + ' → ' + currentValue.title;
                        }
                    },
                    ''
                );
            }
            return <TableRow
                key={row._id}
                sx={{'&:last-child td, &:last-child th': {border: 0}}}
            >
                <TableCell component="th" scope="row">
                    {row.title}
                </TableCell>
                <TableCell align="center">{row.category ? ancestors : 'Нет'}</TableCell>
                <TableCell align="center">{row.status}</TableCell>
                <TableCell align="center">{new Date(row.createdAt).toLocaleString()}</TableCell>
                <TableCell align="center">{new Date(row.updatedAt).toLocaleString()}</TableCell>
                <TableCell align="center">
                    <Box display='flex'>
                        <Button component={Link}
                                to={"/admin/categories/edit-category/" + row._id}><EditSharpIcon/></Button>
                        <Button onClick={() => dispatch(deleteCategory(row._id))}><DeleteForeverSharpIcon/></Button>
                    </Box>
                </TableCell>
            </TableRow>;
        });
    }

    if (cashiers) {
        render = rows.map((row, i) => (
            <TableRow
                key={row._id}
                sx={{'&:last-child td, &:last-child th': {border: 0}}}
            >
                <TableCell sx={{textAlign: 'center'}}>
                    {i + 1}
                </TableCell>
                <TableCell sx={{textAlign: 'center'}}>
                    {row.displayName}
                </TableCell>
                <TableCell sx={{textAlign: 'center'}}>
                    {row.username}
                </TableCell>
                <TableCell sx={{textAlign: 'center'}}>
                    {new Date(row.createdAt).toLocaleString()}
                </TableCell>
                <TableCell align="center">
                    <Box display='flex' justifyContent='center'>
                        <Button component={Link}
                                to={"/admin/cashiers/edit-cashier/" + row._id}><EditSharpIcon/></Button>
                        <Button onClick={() => dispatch(deleteCashier(row._id))}>
                            <DeleteForeverSharpIcon/>
                        </Button>
                    </Box>
                </TableCell>
            </TableRow>
        ));
    }

    if (shifts) {
        render = rows.map((row) => (
            <TableRow
                key={row._id}
                sx={{'&:last-child td, &:last-child th': {border: 0}}}
            >
                <TableCell component="th" scope="row">
                    {row.shiftNumber}
                </TableCell>
                <TableCell align="center">{row.cashier.displayName}</TableCell>
                <TableCell align="center">{new Date(row.createdAt).toLocaleString()}</TableCell>
                <TableCell
                    align="center">{row.isActive ? 'Онлайн' : new Date(row.updatedAt).toLocaleString()}</TableCell>
            </TableRow>
        ));
    }

    if (orders) {
        render = rows.map((row) => {

            let background = '#ffafaf;';

            if (row.status === 'Закрыт') {
                background = '#c3ffc3;';
            } else if (row.status === 'Собран') {
                background = '#ffdda0;';
            }

            return (
                <TableRow
                    key={row._id}
                    sx={{'&:last-child td, &:last-child th': {border: 0}, background}}
                    onClick={() => onOpenOrderModal(row)}
                >
                    <TableCell component="th" scope="row">
                        {row.orderNumber}
                    </TableCell>
                    <TableCell align="center">{row.customer}</TableCell>
                    <TableCell align="center">{row.phone}</TableCell>
                    <TableCell align="center">{row.status}</TableCell>
                    <TableCell align="center">{new Date(row.createdAt).toLocaleString()}</TableCell>
                </TableRow>
            );
        });
    }

    return (
        <Box display='flex' flexDirection='column'>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="simple table" ref={tableRef}>
                    <TableHead>
                        <TableRow>
                            {rowsHead.map((row, index) => (
                                <TableCell align='center' key={index}>{row}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {render}
                    </TableBody>
                </Table>
            </TableContainer>

            {categories || products ?
                <Box display='flex' justifyContent='flex-end' marginY='20px'>
                    <Button variant='outlined' onClick={onDownload}> Экспорт </Button>
                </Box>
                : null}
        </Box>
    );
};

export default TableAdmin;