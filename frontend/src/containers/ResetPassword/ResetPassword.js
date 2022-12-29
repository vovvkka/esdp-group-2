import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../../store/actions/usersActions";
import { Alert, Container, Grid, Typography } from "@mui/material";
import FormElement from "../../components/UI/Form/FormElement/FormElement";
import ButtonWithProgress from "../../components/UI/ButtonWithProgress/ButtonWithProgress";
import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    form: {
        marginTop: theme.spacing(1),
    },
    alert: {
        margin: theme.spacing(3, 0),
        width: "100%",
    },
}));

const ResetPassword = ({ match }) => {
    const { classes } = useStyles();

    const dispatch = useDispatch();
    const error = useSelector((state) => state.users.loginError);
    const loading = useSelector((state) => state.users.loginLoading);

    const [user, setUser] = useState({
        password: "",
        password1: "",
    });

    const submitFormHandler = (e) => {
        e.preventDefault();

        dispatch(
            resetPassword(match.params.id, match.params.token, { ...user })
        );
    };

    const inputChangeHandler = (e) => {
        const { name, value } = e.target;
        setUser((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <Container maxWidth="xs" sx={{ marginTop: "100px" }}>
            <div className={classes.paper}>
                <Typography component="h1" variant="h6">
                    Сброс пароля
                </Typography>

                {error && (
                    <Alert severity="error" className={classes.alert}>
                        Ошибка! {error.message}
                    </Alert>
                )}

                <Grid
                    component="form"
                    onSubmit={submitFormHandler}
                    container
                    spacing={2}
                >
                    <FormElement
                        required={true}
                        type="password"
                        label="Введите новый пароль"
                        name="password"
                        value={user.password}
                        inputProps={{ minLength: 6 }}
                        onChange={inputChangeHandler}
                    />

                    <FormElement
                        required={true}
                        type="password"
                        label="Повторите новый пароль"
                        name="password1"
                        inputProps={{ minLength: 6 }}
                        value={user.password1}
                        onChange={inputChangeHandler}
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
                            Сбросить пароль
                        </ButtonWithProgress>
                    </Grid>
                </Grid>
            </div>
        </Container>
    );
};

export default ResetPassword;
