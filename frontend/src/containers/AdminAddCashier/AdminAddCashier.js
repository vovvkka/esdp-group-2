import React from 'react';
import {Container} from "@mui/material";
import CashierForm from "../../components/CashierForm/CashierForm";
import {useDispatch, useSelector} from "react-redux";
import {addCashier} from "../../store/actions/cashiersActions";

const AdminAddCashier = () => {
    const dispatch = useDispatch();
    const error = useSelector(state => state.cashiers.error);

    const onCashierSubmitForm = cashierData => {
        dispatch(addCashier(cashierData));
    };

    return (
        <Container>
            <CashierForm
                onSubmit={onCashierSubmitForm}
                error={error}
            />
        </Container>
    );
};

export default AdminAddCashier;