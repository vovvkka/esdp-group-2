import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getAdminProfile} from "../../../store/actions/adminActions";
import {Box, Button, Grid, Typography} from "@mui/material";
import {Link} from "react-router-dom";

const AdminProfile = () => {
    const dispatch = useDispatch();
    const adminProfile = useSelector(state => state.admin.adminProfile);

    useEffect(() => {
        dispatch(getAdminProfile());
    }, [dispatch]);

    return (
        <Box>
            {adminProfile &&
                <>
                    <Typography fontSize="18px"><b>Электронная почта:</b> {adminProfile.email} </Typography>
                    <Typography fontSize="18px"><b>Логин:</b> {adminProfile.username} </Typography>
                    <Typography fontSize="18px"><b>Имя:</b> {adminProfile.displayName} </Typography>
                    <Grid container flexDirection='column' alignItems='flex-start' sx={{margin: '20px 0'}}>
                        <Button component={Link} to='/admin/edit-profile' variant="contained" sx={{marginBottom: '10px'}}>Редактировать</Button>
                        <Button component={Link} to='/admin/reset-password' variant="contained">Cброс пароля</Button>
                    </Grid>
                </>
          }
        </Box>
    );
};

export default AdminProfile;