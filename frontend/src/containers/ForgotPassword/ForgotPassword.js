import React, { useState } from "react";
import { Container, Grid, Typography } from "@mui/material";
import FormElement from "../../components/UI/Form/FormElement/FormElement";
import ButtonWithProgress from "../../components/UI/ButtonWithProgress/ButtonWithProgress";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "../../store/actions/usersActions";
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
}));
const ForgotPassword = () => {
    const { classes } = useStyles();

    const dispatch = useDispatch();
    const error = useSelector((state) => state.users.loginError);
    const loading = useSelector((state) => state.users.loginLoading);

    const [email, setEmail] = useState("");

    const submitFormHandler = (e) => {
        e.preventDefault();

        dispatch(forgotPassword(email));
    };

    const getFieldError = () => {
        try {
            return error.message;
        } catch {
            return undefined;
        }
    };

    return (
        <Container maxWidth="xs" sx={{ marginTop: "150px" }}>
            <div className={classes.paper}>
                <Typography component="h1" variant="h6">
                    Укажите почту
                </Typography>

                <Grid
                    component="form"
                    onSubmit={submitFormHandler}
                    container
                    spacing={2}
                >
                    <FormElement
                        required={true}
                        label="Email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        error={getFieldError()}
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
                            Подтвердить
                        </ButtonWithProgress>
                    </Grid>
                </Grid>
            </div>
        </Container>
    );
};

export default ForgotPassword;
