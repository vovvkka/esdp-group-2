import React from 'react';
import {useLocation} from "react-router-dom";
import {Box, Typography} from "@mui/material";
import AdminProfile from "./AdminProfile/AdminProfile";
import AdminContacts from "./AdminContacts/AdminContacts";

const AdminInfo = () => {
    const location = useLocation();

    const checkLocation = () => {
        if (location.pathname === '/admin/settings') return 'profile';
        if (location.pathname === '/admin/settings/contacts') return 'contacts';
    };

    return (
        <Box>
            {checkLocation() === 'profile' ?
                <>
                    <Typography variant='h4' sx={{marginBottom: '20px'}}>Профиль админа</Typography>
                    <AdminProfile/>
                </>
                : null
            }
            {checkLocation() === 'contacts' ?
                <>
                    <Typography variant='h4' sx={{marginBottom: '20px'}}>Контакты</Typography>
                    <AdminContacts/>
                </>
                : null
            }
        </Box>
    );
};

export default AdminInfo;