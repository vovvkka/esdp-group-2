import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOperations } from "../../store/actions/operationsActions";
import {Box, Container, Grid, Typography} from "@mui/material";
import MUIDataTable from "mui-datatables";
import { closeShiftTitle } from "../../store/actions/shiftsActions";
import CustomModal from "../../components/UI/Modal/Modal";
import Receipt from "../../components/Receipt/Receipt";
import {clearOperations} from "../../store/slices/operationsSlice";
import Spinner from "../../components/UI/Spinner/Spinner";

const ReportZ = () => {
    const dispatch = useDispatch();
    const operations = useSelector((state) => state.operations.operations);
    const loading = useSelector((state) => state.operations.loading);
    const shiftCurrent = useSelector((state) => state.shifts.shift);
    const [zReportActive, setZReportActive] = useState(false);
    const [shift, setShift] = useState("");

    useEffect(() => {
        dispatch(fetchOperations(null, closeShiftTitle));

        return () => {
            dispatch(clearOperations());
        }
    }, [dispatch]);

    const columns = [
        {
            name: "operationNumber",
            label: "№ ФД",
            options: {
                customBodyRender: (value) => {
                    return value;
                },
            },
        },
        {
            name: "shift",
            label: "Смена",
            options: {
                customBodyRender: (value) => {
                    return value.shiftNumber;
                },
            },
        },
        {
            name: "title",
            label: "Операция",
        },
        {
            name: "additionalInfo",
            label: "Касса",
            options: {
                customBodyRender: (value) => {
                    return value.cash;
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

        rowsPerPage: operations && operations.limit,
        page: operations.page && operations.page - 1,
        rowsPerPageOptions: [],
        count: operations && operations.total,
        onTableChange: (action, tableState) => {
            switch (action) {
                case "changePage":
                    dispatch(fetchOperations(`?page=${tableState.page + 1}`));
                    break;
                default:
                    break;
            }
        },
        onRowClick: (rowData, rowMeta) => {
            const row = operations.docs[rowMeta.dataIndex];
            setZReportActive(true);
            setShift(row.shift._id);
        },
    };

    return (
        <Container maxWidth="xl">
            <Box width="95%" margin={shiftCurrent ? "50px auto 0" : "0 auto"}>
                <Grid
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    marginY="30px"
                >
                    <Typography variant="h5">Z - Отчет</Typography>
                </Grid>
                <Box>
                    {loading ? (
                        <Spinner admin/>
                    ) : (
                        <MUIDataTable
                            title={"Смены"}
                            columns={columns}
                            options={options}
                            data={operations.docs}
                        />
                    )}
                </Box>
                {zReportActive && (
                    <CustomModal
                        isOpen={zReportActive}
                        handleClose={() => setZReportActive(false)}
                    >
                        <Receipt
                            handleClose={() => setZReportActive(false)}
                            zReport
                            shiftId={shift}
                        />
                    </CustomModal>
                )}
            </Box>
        </Container>
    );
};

export default ReportZ;
