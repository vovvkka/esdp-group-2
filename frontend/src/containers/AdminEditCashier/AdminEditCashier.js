import React, {useEffect} from 'react';
import {Container, Typography} from "@mui/material";
import CashierForm from "../../components/CashierForm/CashierForm";
import {useDispatch, useSelector} from "react-redux";
import {editCashier, getCashier} from "../../store/actions/cashiersActions";

const AdminEditCashier = ({match}) => {
    const dispatch = useDispatch();
    const cashier = useSelector(state => state.cashiers.cashier);
    const error = useSelector(state => state.cashiers.error);

    useEffect(() => {
        if (!!match.params.id) {
            dispatch(getCashier(match.params.id));
        }
    }, [dispatch, match.params.id]);

    const onCashierSubmitForm = cashierData => {
        dispatch(editCashier(match.params.id, cashierData));
    };

    return (
        <Container>
            <Typography
                textAlign="center"
                marginBottom="30px"
                variant="h4"
            >
                Редактировать кассира
            </Typography>
            <CashierForm
                onSubmit={onCashierSubmitForm}
                isParams={!!match.params.id}
                cashier={cashier}
                error={error}
            />
        </Container>
    );
};

export default AdminEditCashier;