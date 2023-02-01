import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchOperations} from "../../store/actions/operationsActions";
import {Box, Container} from "@mui/material";
import MUIDataTable from "mui-datatables";
import CustomModal from "../../components/UI/Modal/Modal";
import Receipt from "../../components/Receipt/Receipt";
import {clearOperations} from "../../store/slices/operationsSlice";
import Spinner from "../../components/UI/Spinner/Spinner";

const AdminJournal = () => {
    const dispatch = useDispatch();
    const operations = useSelector((state) => state.operations.operations);
    const loading = useSelector((state) => state.operations.loading);
    const shiftCurrent = useSelector((state) => state.shifts.shift);
    const [zReportActive, setZReportActive] = useState(false);
    const [insertCashActive, setInsertCashActive] = useState(false);
    const [withdrawActive, setWithdrawActive] = useState(false);
    const [openShiftActive, setOpenShiftActive] = useState(false);
    const [purchaseActive, setPurchaseActive] = useState(false);
    const [shift, setShift] = useState("");
    const [receiptInfo, setReceiptInfo] = useState({});

    useEffect(() => {
        dispatch(fetchOperations());

        return () => {
            dispatch(clearOperations());
        };
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
            name: "shift",
            label: "Кассир",
            options: {
                customBodyRender: (value) => {
                    return value.cashier.displayName;
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
        onRowClick: (rowData, rowMeta, e) => {
            e.preventDefault();
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
            } else if (row.title === "Внесение наличных") {
                setInsertCashActive(true);
                setReceiptInfo(row);
            } else if (row.title === "Изъятие наличных") {
                setWithdrawActive(true);
                setReceiptInfo(row);
            }
        },
    };

    return (
        <Container maxWidth="xl">
            <Box width="95%" margin={shiftCurrent ? "50px auto 0" : "0 auto"}>
                <Box>
                    {loading ? (
                        <Spinner admin/>
                    ) : (
                        <MUIDataTable
                            title={"Журнал"}
                            columns={columns}
                            options={options}
                            data={operations.docs}
                        />
                    )}
                </Box>
                {zReportActive ||
                openShiftActive ||
                purchaseActive ||
                insertCashActive ||
                withdrawActive ? (
                    <CustomModal
                        isOpen={
                            zReportActive ||
                            openShiftActive ||
                            purchaseActive ||
                            insertCashActive ||
                            withdrawActive
                        }
                        handleClose={() => {
                            setZReportActive(false);
                            setOpenShiftActive(false);
                            setPurchaseActive(false);
                            setInsertCashActive(false);
                            setWithdrawActive(false);
                        }}
                    >
                        <Receipt
                            handleClose={() => {
                                setZReportActive(false);
                                setOpenShiftActive(false);
                                setPurchaseActive(false);
                                setInsertCashActive(false);
                                setWithdrawActive(false);
                            }}
                            zReport={zReportActive}
                            openShift={openShiftActive}
                            receipt={receiptInfo}
                            shiftId={shift}
                            purchaseActive={purchaseActive}
                            insertActive={insertCashActive}
                            withdrawActive={withdrawActive}
                        />
                    </CustomModal>
                ) : null}
            </Box>
        </Container>
    );
};

export default AdminJournal;
