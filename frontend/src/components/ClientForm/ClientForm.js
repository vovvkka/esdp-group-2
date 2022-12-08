import React, {useState} from 'react';
import {Button, Grid, Paper, Typography} from "@mui/material";
import FormElement from "../UI/Form/FormElement/FormElement";
import {useSelector} from "react-redux";
import FileInput from "../UI/Form/FileInput/FileInput";


const ClientForm = ({onSubmit}) => {
    const error = useSelector(state => state.clients.createClientError);
    const [state, setState] = useState({
        name: "",
        surname: "",
        email: "",
        phone: "",
        address: "",
        discount: 0,
        image: ""
    });

    const inputChangeHandler = e => {
        const {name, value} = e.target;
        setState(prevState => {
            return {...prevState, [name]: value};
        });
    };

    const fileChangeHandler = e => {
        const name = e.target.name;
        const file = e.target.files[0];
        setState(prevState => ({...prevState, [name]: file}));
    };
    const submitFormHandler = e => {
        e.preventDefault();
        const formData = new FormData();
        Object.keys(state).forEach(key => {
            formData.append(key, state[key]);
        });
        onSubmit(formData);
    };

    const getFieldError = fieldName => {
        try {
            return error.error[fieldName].message;
        } catch {
            return undefined;
        }
    };

    return (
        <form
            autoComplete="off"
        >
            <Paper display="flex" >
                <Grid container textAlign="center" marginX="auto" spacing={3} justifyContent='center'
                      flexDirection="column">
                    <Grid item xs={11}>
                        <Typography textAlign="left">Имя</Typography>
                        <FormElement
                            label="Имя"
                            onChange={inputChangeHandler}
                            value={state.name}
                            name="name"
                            error={getFieldError('name')}
                            required={true}
                        />
                    </Grid>
                    <Grid item xs={11}>
                        <Typography textAlign="left">Фамилия</Typography>
                        <FormElement
                            label="Фамилия"
                            onChange={inputChangeHandler}
                            value={state.surname}
                            name="surname"
                            error={getFieldError('surname')}
                            required={true}
                        />
                    </Grid>
                    <Grid item xs={11}>
                        <Typography textAlign="left">Email</Typography>
                        <FormElement
                            label="Email"
                            onChange={inputChangeHandler}
                            value={state.email}
                            name="email"
                            error={getFieldError('email')}
                        />
                    </Grid>

                    <Grid item xs={11}>
                        <Typography textAlign="left">Телефон</Typography>
                        <FormElement
                            type="tel"
                            label="Телефон"
                            onChange={inputChangeHandler}
                            value={state.phone}
                            name="phone"
                            error={getFieldError('phone')}
                            required={true}
                        />
                    </Grid>
                    <Grid item xs={11}>
                        <Typography textAlign="left">Адрес</Typography>
                        <FormElement
                            label="Адрес"
                            onChange={inputChangeHandler}
                            value={state.address}
                            name="address"
                            error={getFieldError('address')}
                        />
                    </Grid>
                    <Grid item xs={11}>
                        <Typography textAlign="left">Скидка</Typography>
                        <FormElement
                            type="number"
                            label="Скидка в %"
                            onChange={inputChangeHandler}
                            value={state.discount}
                            name="discount"
                            error={getFieldError('discount')}
                            required={true}
                        />
                    </Grid>
                    <Grid item xs={11}>
                        <Typography textAlign="left">Аватар</Typography>
                    <FileInput
                        label="Аватар"
                        name="image"
                        onChange={fileChangeHandler}
                    />
                    </Grid>
                </Grid>
                <Grid sx={{margin: "25px 0 0 20px", paddingBottom: "20px"}} container justifyContent='left'>
                    <Button onClick={submitFormHandler} type="submit" color="primary" variant="contained">Записать</Button>
                </Grid>
            </Paper>
        </form>
    );
};

export default ClientForm;