import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getContacts} from "../../../store/actions/contactsActions";
import {Box, Button, Typography} from "@mui/material";
import {Link} from "react-router-dom";

const AdminContacts = () => {
    const dispatch = useDispatch();
    const contacts = useSelector(state => state.contacts.contacts);

    useEffect(() => {
        dispatch(getContacts());
    }, []);

    return (
        <Box>
            {contacts &&
                <>
                    <Typography variant='h6'><b>Электронная почта магазина:</b> {contacts.email} </Typography>
                    <Typography variant='h6'><b>Телефон:</b> {contacts.phone.join(', ')} </Typography>
                    <Typography variant='h6'><b>Адрес:</b> {contacts.address.join(', ')} </Typography>
                    <Button sx={{margin: '20px 0'}} component={Link} to='/admin/edit-contacts'>Редактировать</Button>
                </>
            }
        </Box>
    );
};

export default AdminContacts;