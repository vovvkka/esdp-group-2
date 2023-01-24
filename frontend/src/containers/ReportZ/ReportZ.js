import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchOperations} from "../../store/actions/operationsActions";
import {Box, Grid, Typography} from "@mui/material";
import MUIDataTable from "mui-datatables";
import {closeShiftTitle} from "../../store/actions/shiftsActions";
import CustomModal from "../../components/UI/Modal/Modal";
import Receipt from "../../components/Receipt/Receipt";

const ReportZ = () => {
    const dispatch = useDispatch();
    const operations = useSelector(state => state.operations.operations);
    const shiftCurrent = useSelector(state => state.shifts.shift);
    const [zReportActive, setZReportActive] = useState(false);
    const [shift, setShift] = useState('');

    useEffect(() => {
        dispatch(fetchOperations(null,closeShiftTitle));
    }, [dispatch]);

    const columns = [
        {
            name: "operationNumber",
            label: "№ ФД",
            options: {
                customBodyRender: (value) => {
                    return value
                }
            }

        },
        {
            name: "shift",
            label: "Смена",
            options: {
                customBodyRender: (value) => {
                    return value.shiftNumber
                }
            }

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
                    return value.cash
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
        filter: false,
        responsive: 'standard',
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
                case 'changePage':
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
        }
    };

    return (
        <Box width='95%' margin={shiftCurrent?'50px auto 0':'0 auto'}>
            <Grid display='flex' justifyContent='space-between' alignItems='center' marginY='30px'>
                <Typography variant='h5'>Z - Отчет</Typography>
            </Grid>
            <Box>
                <MUIDataTable
                    title={"Смены"}
                    columns={columns}
                    options={options}
                    data={operations.docs}
                />
            </Box>
            {
                zReportActive && (
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
                )
            }
        </Box>
    );
};

export default ReportZ;