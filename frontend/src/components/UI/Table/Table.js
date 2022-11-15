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
import {apiUrl} from "../../../config";
import {deleteProduct} from "../../../store/actions/productsActions";
import {useDownloadExcel} from "react-export-table-to-excel";


const TableAdmin = ({rows, rowsHead, categories, products, cashiers}) => {
    const dispatch = useDispatch();
    const tableRef = useRef(null);


    const { onDownload } = useDownloadExcel({
        currentTableRef: tableRef.current,
        filename: categories || products,
        sheet: categories || products
    })

    let render;

    if (categories) {
        render = rows.map((row) => (
            <TableRow
                key={row.title}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                <TableCell component="th" scope="row">
                    {row.title}
                </TableCell>
                <TableCell align="center">Нет</TableCell>
                <TableCell align="center">{row.nds}</TableCell>
                <TableCell align="center">{row.nspCash}</TableCell>
                <TableCell align="center">{row.nspNotCash}</TableCell>
                <TableCell align="center">{row.status}</TableCell>
                <TableCell align="center">{new Date(row.createdAt).toLocaleString()}</TableCell>
                <TableCell align="center">{new Date(row.updatedAt).toLocaleString()}</TableCell>
                <TableCell align="center">
                    <Box display='flex'>
                        <Button component={Link} to={"/admin/categories/edit-category/" + row._id}><EditSharpIcon/></Button>
                        <Button onClick={() => dispatch(deleteCategory(row._id))}><DeleteForeverSharpIcon/></Button>
                    </Box>
                </TableCell>
            </TableRow>
        ))
    }


    if (products) {
        render = rows.map((row) => (
            <TableRow
                key={row._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                <TableCell align='center'>
                    {row.category ? row.category.title : 'Нет категории'}
                </TableCell>
                <TableCell align="center">{row.title}</TableCell>
                <TableCell align="center">
                    <Box
                        component="img"
                        sx={{
                            height: 'auto',
                            width: 50,
                        }}
                        alt={row.title}
                        src={apiUrl + '/' + row.image}
                    />
                </TableCell>
                <TableCell align="center">{row.barcode}</TableCell>
                <TableCell align="center">{row.amount}</TableCell>
                <TableCell align="center">{row.unit}</TableCell>
                <TableCell align="center">{row.purchasePrice}</TableCell>
                <TableCell align="center">{row.price}</TableCell>
                <TableCell align="center">{row.status}</TableCell>
                <TableCell align="center">{row.priceType}</TableCell>
                <TableCell align="center">{new Date(row.createdAt).toLocaleString()}</TableCell>
                <TableCell align="center">{new Date(row.updatedAt).toLocaleString()}</TableCell>
                <TableCell align="center">
                    <Box display='flex'>
                        <Button component={Link} to={"/admin/products/edit-product/" + row._id}><EditSharpIcon/></Button>
                        <Button onClick={() => dispatch(deleteProduct(row._id))}><DeleteForeverSharpIcon/></Button>
                    </Box>
                </TableCell>
            </TableRow>
        ))
    }

    if (cashiers) {
        render = rows.map((row) => (
            <TableRow
                key={row._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                <TableCell>
                    {row.username}
                </TableCell>
                <TableCell align="center">
                    <Box display='flex' justifyContent='center'>
                        <Button component={Link} to={"/admin/cashiers/edit-cashiers/" + row._id}><EditSharpIcon/></Button>
                    </Box>
                </TableCell>
            </TableRow>
        ));
    }

    return (
        <Box display='flex' flexDirection='column'>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table" ref={tableRef}>
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