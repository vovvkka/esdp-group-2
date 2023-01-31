import React from 'react';
import {Container, Grid, Typography} from "@mui/material";
import {NavLink} from "react-router-dom";
import AdminInfo from "../../components/AdminInfo/AdminInfo";


const AdminSettings = () => {
    return (
        <Container>
            <Grid container sx={{margin: '5px 0'}} spacing={3}>
                <Grid item sx={{marginRight: '100px'}}>
                    <Typography variant='h5' sx={{margin: '10px 0', fontWeight: '600'}}>
                        <NavLink to='/admin/settings' activeClassName='active' exact>Профиль</NavLink>
                    </Typography>
                    <Typography variant='h5' sx={{margin: '10px 0', fontWeight: '600'}}>
                        <NavLink to='/admin/settings/contacts' activeClassName='active'>Контакты</NavLink>
                    </Typography>
                </Grid>
                <Grid item>
                    <AdminInfo/>
                </Grid>
            </Grid>
        </Container>
    );
};

export default AdminSettings;