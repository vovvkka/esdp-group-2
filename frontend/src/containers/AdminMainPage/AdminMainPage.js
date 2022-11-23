import React, {useEffect} from 'react';
import {Grid, Typography} from "@mui/material";
import Catalog from "../../components/Catalog/Catalog";
import {Box} from "@mui/system";
import {useDispatch, useSelector} from "react-redux";
import {fetchShifts} from "../../store/actions/shiftsActions";
import TableAdmin from "../../components/UI/Table/Table";
import {makeStyles} from "tss-react/mui";

const useStyles = makeStyles()(() => ({
    boxScrolling: {
        margin: '50px 100px 0 0',
        height: '680px',
        overflowY: 'auto'
    },
}));

const AdminMainPage = () => {
    const {classes} = useStyles();
    const dispatch = useDispatch();
    const shifts = useSelector(state => state.shifts.shifts);

    useEffect(() => {
        dispatch(fetchShifts());
    }, [dispatch]);

    const rowsHead = ['№', 'Кассир', 'Дата открытия смены', 'Дата закрытия смены'];

    return (
        <Grid container spacing={2} justifyContent="flex-end">
            <Box className={classes.boxScrolling}>
                {
                    shifts?.length > 0 ? <TableAdmin rowsHead={rowsHead} rows={shifts} shifts='Смены'/>
                        : <Typography variant='h6'>Смены не найдены</Typography>
                }
            </Box>
            <Catalog/>
        </Grid>
    );
};

export default AdminMainPage;