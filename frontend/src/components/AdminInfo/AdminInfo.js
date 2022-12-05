import React from 'react';
import {useLocation} from "react-router-dom";
import {Box, Typography} from "@mui/material";

const AdminInfo = () => {
    const location = useLocation();

    const checkLocation = () => {
        if (location.pathname === '/admin/settings') return 'profile';
        if (location.pathname === '/admin/settings/contacts') return 'contacts';
    };

    return (
        <Box>
            {checkLocation() === 'profile' ?
                <Typography variant='h4'>Профиль админа</Typography> : null
            }
            {checkLocation() === 'contacts' ?
                <Typography variant='h4'>Контакты</Typography> : null
            }
        </Box>
    );
};

export default AdminInfo;