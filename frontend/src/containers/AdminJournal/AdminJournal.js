import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOperations } from "../../store/actions/operationsActions";
import { Box, Grid, Typography } from "@mui/material";
import MUIDataTable from "mui-datatables";
import CustomModal from "../../components/UI/Modal/Modal";
import Receipt from "../../components/Receipt/Receipt";

const AdminJournal = () => {
    const dispatch = useDispatch();
    const operations = useSelector((state) => state.operations.operations);
    const [zReportActive, setZReportActive] = useState(false);
    const [openShiftActive, setOpenShiftActive] = useState(false);
    const [purchaseActive, setPurchaseActive] = useState(false);
    const [shift, setShift] = useState("");
    const [receiptInfo, setReceiptInfo] = useState({});

    useEffect(() => {
        dispatch(fetchOperations());
    }, [dispatch]);

    const columns = [
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
            label: "Сумма",
            options: {
                customBodyRender: (value) => {
                    return value.amountOfMoney;
                },
            },
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
            name: "additionalInfo",
            label: "Комментарий",
            options: {
                customBodyRender: (value) => {
                    return value.comment;
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
            if (row.title === "Закрытие смены") {
                setZReportActive(true);
                setShift(row.shift._id);
            } else if (row.title === "Открытие смены") {
                setOpenShiftActive(true);
                setReceiptInfo(row);
            } else if (row.title === "Продажа") {
                setReceiptInfo(row);
                setPurchaseActive(true);
            }
        },
    };

    return (
        <Box width="95%" margin="0 auto">
            <Grid
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                marginY="30px"
            >
                <Typography variant="h5">Журнал</Typography>
            </Grid>

            <Box>
                <MUIDataTable
                    title={"Журнал"}
                    columns={columns}
                    options={options}
                    data={operations.docs}
                />
            </Box>
            {zReportActive || openShiftActive || purchaseActive ? (
                <CustomModal
                    isOpen={zReportActive || openShiftActive || purchaseActive}
                    handleClose={() => {
                        setZReportActive(false);
                        setOpenShiftActive(false);
                        setPurchaseActive(false);
                    }}
                >
                    <Receipt
                        handleClose={() => {
                            setZReportActive(false);
                            setOpenShiftActive(false);
                            setPurchaseActive(false);
                        }}
                        zReport={zReportActive}
                        openShift={openShiftActive}
                        receipt={receiptInfo}
                        shiftId={shift}
                        purchaseActive={purchaseActive}
                    />
                </CustomModal>
            ) : null}
        </Box>
    );
};

export default AdminJournal;
