import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Grid} from "@mui/material";
import {makeStyles} from "tss-react/mui";
import MUIDataTable from "mui-datatables";
import Catalog from "../../components/Catalog/Catalog";
import {fetchShifts} from "../../store/actions/shiftsActions";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Spinner from "../../components/UI/Spinner/Spinner";

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
    const loading = useSelector(state => state.shifts.fetchLoading);
    const shifts = useSelector(state => state.shifts.shifts);

    useEffect(() => {
        dispatch(fetchShifts());
    }, [dispatch]);

    const YourCustomRowComponent = props => {
        const {shiftNumber, cashier, createdAt, updatedAt} = props;

        return (
            <TableRow>
                <TableCell>{shiftNumber}</TableCell>
                <TableCell>{cashier}</TableCell>
                <TableCell align="right">{createdAt}</TableCell>
                <TableCell align="right">{updatedAt}</TableCell>
            </TableRow>
        );
    };

    const columns = [
        {
            name: "shiftNumber",
            label: "№"
        },
        {
            name: "cashier",
            label: "Кассир",
            options: {
                customBodyRender: (value) => {
                    return value.displayName;
                },
            }
        },
        {
            name: "createdAt",
            label: "Дата открытия смены",
            options: {
                filter: false,
                customBodyRender: (value) => {
                    return new Date(value).toLocaleString();
                }
            }
        },
        {
            name: "updatedAt",
            label: "Дата закрытия смены",
            options: {
                filter: false,
                customBodyRender: (value) => {
                    return new Date(value).toLocaleString();
                }
            }
        }
    ];

    const options = {
        selectableRows: "none",
        filter: false,
        responsive: 'standard',
        serverSide: true,
        sort: false,
        search: false,
        viewColumns: false,
        print: false,
        download: false,

        rowsPerPage: shifts && shifts.limit,
        page: shifts?.page && shifts.page - 1,
        rowsPerPageOptions: [],
        count: shifts && shifts.total,
        customRowRender: (data, index) => {
            const [shiftNumber, cashier, createdAt, updatedAt] = data;

            return (
                <YourCustomRowComponent
                    key={shiftNumber}
                    shiftNumber={shiftNumber}
                    cashier={cashier}
                    createdAt={createdAt}
                    updatedAt={shifts.docs[index].isActive ? "online" : updatedAt}
                />
            );
        },
        onTableChange: (action, tableState) => {
            switch (action) {
                case 'changePage':
                    dispatch(fetchShifts(`?page=${tableState.page + 1}`));
                    break;
                default:
                    break;
            }
        },
    };

    if (loading) {
        return <Spinner admin/>;
    }

    return (
        <Grid container>
            <Grid item xs={6} className={classes.boxScrolling}>
                <MUIDataTable
                    title={"Список смен"}
                    columns={columns}
                    options={options}
                    data={shifts?.docs}
                />
            </Grid>
            <Catalog/>
        </Grid>
    );
};

export default AdminMainPage;