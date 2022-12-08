import React from 'react';
import {useLocation} from "react-router-dom";
import {Box, Typography} from "@mui/material";
import AdminProfile from "./AdminProfile/AdminProfile";
import AdminContacts from "./AdminContacts/AdminContacts";

const AdminInfo = () => {
    const location = useLocation();

    return (
        <Box>
            {location.pathname === '/admin/settings' ?
                <>
                    <Typography variant='h4' sx={{marginBottom: '20px'}}>Профиль админа</Typography>
                    <AdminProfile/>
                </>
                : null
            }
            {location.pathname === '/admin/settings/contacts' ?
                <>
                    <Typography variant='h4' sx={{marginBottom: '20px'}}>Контактная информация</Typography>
                    <AdminContacts/>
                </>
                : null
            }
        </Box>
    );
};

export default AdminInfo;