import React, { useState } from "react";
import { makeStyles } from "tss-react/mui";
import {
    Alert,
    Container,
    Grid,
    Typography,
    useMediaQuery,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../store/actions/usersActions";
import FormElement from "../../components/UI/Form/FormElement/FormElement";
import ButtonWithProgress from "../../components/UI/ButtonWithProgress/ButtonWithProgress";
import theme from "../../theme";
import { Link } from "react-router-dom";

const useStyles = makeStyles()((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: `${theme.palette.secondary.main} !important`,
    },
    form: {
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: `${theme.spacing(2, 0)} !important`,
    },
    alert: {
        margin: theme.spacing(3, 0),
        width: "100%",
    },
}));

const Login = () => {
    const { classes } = useStyles();
    const matches = useMediaQuery(theme.breakpoints.down("md"));

    const dispatch = useDispatch();
    const error = useSelector((state) => state.users.loginError);
    const loading = useSelector((state) => state.users.loginLoading);

    const [user, setUser] = useState({
        username: "",
        password: "",
    });

    const inputChangeHandler = (e) => {
        const { name, value } = e.target;
        setUser((prev) => ({ ...prev, [name]: value }));
    };

    const submitFormHandler = (e) => {
        e.preventDefault();

        dispatch(loginUser({ ...user }));
    };

    return (
        <Container
            maxWidth="xs"
            sx={{ marginTop: matches ? "200px" : "100px" }}
        >
            <div className={classes.paper}>
                <Typography component="h1" variant="h6">
                    Войти
                </Typography>

                {error && (
                    <Alert severity="error" className={classes.alert}>
                        Ошибка! {error.error}
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
                        label="Логин"
                        name="username"
                        value={user.username}
                        onChange={inputChangeHandler}
                    />

                    <FormElement
                        type="password"
                        required={true}
                        label="Пароль"
                        name="password"
                        value={user.password}
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
                            Войти
                        </ButtonWithProgress>
                    </Grid>

                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link to="/forgot-password">Забыли пароль?</Link>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        </Container>
    );
};

export default Login;
