import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {makeStyles} from "tss-react/mui";
import {Avatar, Container, Grid, Typography} from "@mui/material";
import {LockOutlined} from "@mui/icons-material";
import FormElement from "../UI/Form/FormElement/FormElement";
import ButtonWithProgress from "../UI/ButtonWithProgress/ButtonWithProgress";

const useStyles = makeStyles()(theme => ({
    paper: {
        marginTop: theme.spacing(8),
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
    }
}));

const CashierForm = () => {
    const {classes} = useStyles();
    const dispatch = useDispatch();
    const error = useSelector(state => state.users.registerError);
    const loading = useSelector(state => state.users.registerLoading);

    const [cashierData, setCashierData] = useState({
        username: '',
        password: '',
        displayName: '',
        pin: '',
    });

    useEffect(() => {
        // return () => {
        //     dispatch(clearRegisterErrors());
        // }
    }, [dispatch]);

    const inputChangeHandler = (name, value) => {
        setCashierData(prev => ({...prev, [name]: value}));
    };

    const submitFormHandler = e => {
        e.preventDefault();

        // dispatch(registerUser(formData));
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
                <Avatar className={classes.avatar}>
                    <LockOutlined/>
                </Avatar>
                <Typography component="h1" variant="h6" sx={{marginBottom: '20px'}}>
                    Sign up
                </Typography>

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
                        type="password"
                        label="Пароль"
                        name="password"
                        value={cashierData.password}
                        onChange={(e) => inputChangeHandler(e.target.name, e.target.value)}
                        error={getFieldError('password')}
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
                        >
                            Создать
                        </ButtonWithProgress>
                    </Grid>
                </Grid>
            </div>
        </Container>
    );
};

export default CashierForm;