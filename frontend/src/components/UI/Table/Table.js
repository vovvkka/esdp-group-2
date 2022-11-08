import React from 'react';
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

const TableAdmin = ({rows, rowsHead, categories, products}) => {
    const dispatch = useDispatch();

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
                    {row.category.title}
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
                        <Button component={Link} to={"/admin/categories/edit-category/" + row._id}><EditSharpIcon/></Button>
                        <Button onClick={() => dispatch(deleteProduct(row._id))}><DeleteForeverSharpIcon/></Button>
                    </Box>
                </TableCell>
            </TableRow>
        ))
    }

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
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
    );
};

export default TableAdmin;