import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {Container, Grid} from "@mui/material";
import FormElement from "../UI/Form/FormElement/FormElement";
import ButtonWithProgress from "../UI/ButtonWithProgress/ButtonWithProgress";
import Paper from "@mui/material/Paper";

const CashierForm = ({onSubmit, cashier, isParams, error}) => {
    const loading = useSelector(state => state.cashiers.loading);

    const [cashierData, setCashierData] = useState({
        username: '',
        password: '',
        email: '',
        displayName: '',
        pin: '',
        role: 'cashier'
    });

    useEffect(() => {
        if (cashier) {
            setCashierData({...cashier, password: ''});
        }
    }, [cashier]);

    const inputChangeHandler = (name, value) => {
        setCashierData(prev => ({...prev, [name]: value}));
    };

    const submitFormHandler = e => {
        e.preventDefault();

        onSubmit(cashierData);
    };

    const getFieldError = fieldName => {
        try {
            return error.error[fieldName].message;
        } catch {
            return undefined;
        }
    };

    return (
        <Container maxWidth="xs">
            <Paper display="flex" sx={{padding: '30px'}}>

                <Grid
                    component="form"
                    onSubmit={submitFormHandler}
                    container
                >

                    <FormElement
                        required={true}
                        label="Логин"
                        name="username"
                        value={cashierData.username}
                        onChange={(e) => inputChangeHandler(e.target.name, e.target.value)}
                        error={getFieldError('username')}
                    />

                    <FormElement
                        required={true}
                        label="ФИО"
                        name="displayName"
                        value={cashierData.displayName}
                        onChange={(e) => inputChangeHandler(e.target.name, e.target.value)}
                        error={getFieldError('displayName')}
                    />

                    <FormElement
                        required={false}
                        type="email"
                        label="Email"
                        name="email"
                        value={cashierData.email}
                        onChange={(e) => inputChangeHandler(e.target.name, e.target.value)}
                        error={getFieldError('email')}
                    />

                    <FormElement
                        required={false}
                        type="password"
                        label="Пароль"
                        name="password"
                        inputProps={{minLength: 6}}
                        value={cashierData.password}
                        onChange={(e) => inputChangeHandler(e.target.name, e.target.value)}
                        error={getFieldError('password')}
                    />

                    <FormElement
                        required={true}
                        label="Пин-код"
                        type="number"
                        name="pin"
                        inputProps={{maxLength: 4}}
                        value={cashierData.pin}
                        onChange={(e) => inputChangeHandler(e.target.name, e.target.value)}
                        error={getFieldError('pin')}
                    />

                    <Grid item xs={4} sx={{margin: '10px auto 0'}}>
                        <ButtonWithProgress
                            loading={loading}
                            disabled={loading}
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                        >
                            {isParams ? 'Сохранить' : 'Создать'}
                        </ButtonWithProgress>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
};

export default CashierForm;