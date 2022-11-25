import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {makeStyles} from "tss-react/mui";
import {Avatar, Container, Grid, Typography} from "@mui/material";
import {LockOutlined} from "@mui/icons-material";
import FormElement from "../UI/Form/FormElement/FormElement";
import ButtonWithProgress from "../UI/ButtonWithProgress/ButtonWithProgress";

const useStyles = makeStyles()(theme => ({
    paper: {
        marginTop: '100px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(2),
        backgroundColor: `${theme.palette.grey["800"]} !important`,
    },
    form: {
        marginTop: theme.spacing(1),
    },
    alert: {
        margin: theme.spacing(3, 0),
        width: '100%',
    },
    link: {
        marginTop: '5px'
    },
    submit: {
        margin: `${theme.spacing(1, 0)} !important`,
        backgroundColor: `${theme.palette.grey["800"]} !important`,
    }
}));

const CashierForm = ({onSubmit, cashier, isParams, error}) => {
    const {classes} = useStyles();
    const loading = useSelector(state => state.cashiers.loading);

    const [cashierData, setCashierData] = useState({
        username: '',
        password: '',
        displayName: '',
        pin: '',
        role: 'cashier'
    });

    useEffect(() => {
        if (cashier) {
            setCashierData({...cashier,password: ''});
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
            <div className={classes.paper}>
                <Grid item display="flex" alignItems="center">
                    <Avatar className={classes.avatar} color="primary">
                        <LockOutlined/>
                    </Avatar>

                    <Typography
                        textAlign="center"
                        variant="h6"
                    >
                        {isParams? 'Редактировать' : 'Добавить'} Кассира
                    </Typography>
                </Grid>

                <Grid
                    component="form"
                    onSubmit={submitFormHandler}
                    container
                    spacing={2}
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
                        name="pin"
                        inputProps={{maxLength: 4}}
                        value={cashierData.pin}
                        onChange={(e) => inputChangeHandler(e.target.name, e.target.value)}
                        error={getFieldError('pin')}
                    />

                    <Grid item xs={12}>
                        <ButtonWithProgress
                            loading={loading}
                            disabled={loading}
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            {isParams ? 'Сохранить' : 'Создать'}
                        </ButtonWithProgress>
                    </Grid>
                </Grid>
            </div>
        </Container>
    );
};

export default CashierForm;