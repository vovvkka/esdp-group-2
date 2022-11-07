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

const TableAdmin = ({rows, rowsHead}) => {
    const dispatch = useDispatch();

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
                    {rows.map((row) => (
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
                                    <Button><EditSharpIcon/></Button>
                                    <Button onClick={() => dispatch(deleteCategory(row._id))}><DeleteForeverSharpIcon/></Button>
                                </Box>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default TableAdmin;