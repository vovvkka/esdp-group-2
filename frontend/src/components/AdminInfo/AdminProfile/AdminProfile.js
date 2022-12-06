import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getAdminProfile} from "../../../store/actions/adminActions";
import {Box, Button, Typography} from "@mui/material";
import {Link} from "react-router-dom";

const AdminProfile = () => {
    const dispatch = useDispatch();
    const adminProfile = useSelector(state => state.admin.adminProfile);

    useEffect(() => {
        dispatch(getAdminProfile());
    }, []);

    return (
        <Box>
            {adminProfile &&
                <>
                    <Typography variant='h6'><b>Электронная почта:</b> {adminProfile.email} </Typography>
                    <Typography variant='h6'><b>Логин:</b> {adminProfile.username} </Typography>
                    <Typography variant='h6'><b>Имя:</b> {adminProfile.displayName} </Typography>
                    <Button sx={{margin: '20px 0'}} component={Link} to='/admin/edit-profile'>Редактировать</Button>
                </>
          }
        </Box>
    );
};

export default AdminProfile;