import React from 'react';
import {Button} from "@mui/material";
import LockIcon from '@mui/icons-material/Lock';
import {Link} from "react-router-dom";

const UserMenu = ({user}) => {
    return (
        <>
            {
                user?.role === 'admin' || user?.role === 'cashier' ?
                    <Button
                        component={Link}
                        to={'/' + user?.role}
                        variant="contained"
                    >
                        <LockIcon/>
                    </Button> : null
            }
        </>
    );
};

export default UserMenu;