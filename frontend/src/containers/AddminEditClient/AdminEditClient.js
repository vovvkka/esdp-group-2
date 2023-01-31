import React, {useEffect} from "react";
import {Container, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {editClient, fetchOneClient} from "../../store/actions/clientsActions";
import ClientForm from "../../components/ClientForm/ClientForm";

const AdminEditClient = ({match}) => {
    const clients = useSelector(state => state.clients.client);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchOneClient(match.params.id));
    }, [match.params.id, dispatch]);

    const onSubmitForm = data => {
        dispatch(editClient(match.params.id, data));
    };

    return (
        <Container>
            <Typography
                textAlign="center"
                marginBottom="30px"
                variant="h4"
            >
                Редактировать клиента
            </Typography>
            <ClientForm onSubmit={data => onSubmitForm(data)} data={clients}/>
        </Container>
    );
};

export default AdminEditClient;