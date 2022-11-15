import React from 'react';
import {Container, Typography} from "@mui/material";
import CashierForm from "../../components/CashierForm/CashierForm";

const AdminAddCashier = () => {
    return (
        <Container>
            <Typography
                textAlign="center"
                marginBottom="30px"
                variant="h4"
            >
                Добавить Кассира
            </Typography>

            <CashierForm/>
        </Container>
    );
};

export default AdminAddCashier;