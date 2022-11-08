import React from 'react';
import {Grid} from "@mui/material";
import Catalog from "../../components/Catalog/Catalog";

const AdminPanel = () => {
    return (
        <Grid container spacing={2}>
            <Catalog/>
        </Grid>
    );
};

export default AdminPanel;