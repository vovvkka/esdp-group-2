import React from 'react';
import {useDispatch} from "react-redux";
import {Container, Typography} from "@mui/material";
import {createClient} from "../../store/actions/clientsActions";
import ClientForm from "../../components/ClientForm/ClientForm";

const AdminAddClient = () => {
    const dispatch = useDispatch();
    const onSubmitForm = data => {
        dispatch(createClient(data));
    };
    return (
        <div>
            <Container>
                <Typography
                    mt={8}
                    textAlign="center"
                    marginBottom="50px"
                    variant="h4"
                >
                    Добавить клиента
                </Typography>
                <ClientForm onSubmit={data => onSubmitForm(data)}/>
            </Container>

        </div>
    );
};

export default AdminAddClient;