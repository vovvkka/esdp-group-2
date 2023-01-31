import React from 'react';
import Catalog from "../../components/Catalog/Catalog";
import {Grid} from "@mui/material";
import CashierAddProduct from "../../components/CashierAddProduct/CashierAddProduct";

const CashierPanel = () => {
    return (
        <Grid container spacing={2}>
            <Grid item sx={{width: '60%'}}>
                <CashierAddProduct/>
            </Grid>
            <Catalog/>
        </Grid>
    );
};

export default CashierPanel;