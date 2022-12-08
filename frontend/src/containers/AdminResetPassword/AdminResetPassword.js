import React, {useState} from 'react';
import {makeStyles} from "tss-react/mui";
import {Alert, Avatar, Button, Container, Grid} from "@mui/material";
import FormElement from "../../components/UI/Form/FormElement/FormElement";
import {useDispatch, useSelector} from "react-redux";
import {LockOutlined} from "@mui/icons-material";
import {changePassword} from "../../store/actions/adminActions";

const useStyles = makeStyles()(theme => ({
    paper: {
        marginTop: '100px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    submit: {
        margin: `${theme.spacing(1, 0)} !important`,
    },
    avatar: {
        margin: theme.spacing(3),
        backgroundColor: `${theme.palette.grey["800"]} !important`,
    },
}));

const AdminResetPassword = () => {
    const {classes} = useStyles();
    const dispatch = useDispatch();
    const error = useSelector(state => state.admin.error);

    const [passwordAlert, setPasswordAlert] = useState(false);

    const [state, setState] = useState({
        oldPassword: '',
        newPassword: '',
        newPasswordRepeat: '',
    });

    const getFieldError = fieldName => {
        try {
            return error[fieldName].error;
        } catch {
            return undefined;
        }
    };

    const inputChangeHandler = (name, value) => {
        setState(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const onSubmitHandler = (e) => {
        e.preventDefault();

        if (state.newPassword !== state.newPasswordRepeat) {
            setPasswordAlert(true);
        } else {
            setPasswordAlert(false);
            dispatch(changePassword({...state}));
        }
    };

    return (
        <Container maxWidth='xs'>
            <div className={classes.paper}>
                <Avatar className={classes.avatar} color="primary">
                    <LockOutlined/>
                </Avatar>
                <Grid
                    component="form"
                    onSubmit={onSubmitHandler}
                    container
                    spacing={2}
                    justifyContent='center'
                >
                    <h2>Сбросить пароль</h2>

                    <FormElement
                        required={true}
                        label="Старый пароль"
                        name="oldPassword"
                        type='password'
                        value={state.oldPassword}
                        onChange={(e) => inputChangeHandler(e.target.name, e.target.value)}
                        error={error ? error.error : undefined}
                    />

                    <FormElement
                        required={true}
                        label="Новый пароль"
                        name="newPassword"
                        type='password'
                        value={state.displayName}
                        onChange={(e) => inputChangeHandler(e.target.name, e.target.value)}
                        error={getFieldError('newPassword')}
                        InputProps={{ maxLength: 6}}
                    />

                    <FormElement
                        required={true}
                        label="Повторите новый пароль"
                        name="newPasswordRepeat"
                        type='password'
                        value={state.displayName}
                        onChange={(e) => inputChangeHandler(e.target.name, e.target.value)}
                        error={getFieldError('newPasswordRepeat')}
                        min={6}
                    />

                    {passwordAlert ? <Alert severity="error">Пароли не совпадают!</Alert> : null}

                    <Grid item xs={12} textAlign='center'>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Сохранить
                        </Button>
                    </Grid>
                </Grid>
            </div>
        </Container>
    );
};

export default AdminResetPassword;