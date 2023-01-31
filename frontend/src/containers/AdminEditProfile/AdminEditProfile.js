import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getContacts} from "../../store/actions/contactsActions";
import {Button, Container, Grid, Typography} from "@mui/material";
import FormElement from "../../components/UI/Form/FormElement/FormElement";
import {makeStyles} from "tss-react/mui";
import {editAdminProfile} from "../../store/actions/adminActions";

const useStyles = makeStyles()(theme => ({
    paper: {
        marginTop: '100px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    submit: {
        margin: `${theme.spacing(1, 0)} !important`,
    }
}));

const AdminEditProfile = () => {
    const dispatch = useDispatch();
    const adminProfile = useSelector(state => state.admin.adminProfile);
    const error = useSelector(state => state.admin.error);
    const {classes} = useStyles();

    const [state, setState] = useState({
        username: '',
        email: '',
        displayName: '',
    });

    useEffect(() => {
        dispatch(getContacts());
    }, [dispatch]);

    useEffect(() => {
        if (adminProfile) {
            setState(prevState => ({
                ...prevState,
                email: adminProfile.email,
                username: adminProfile.username,
                displayName: adminProfile.displayName,
            }))
        }
    }, [adminProfile]);


    const getFieldError = fieldName => {
        try {
            return error.error[fieldName].message;
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

    const onSubmitHandler = e => {
        e.preventDefault();
        dispatch(editAdminProfile({...state}));
    };

    return adminProfile && (
        <Container maxWidth='md'>
            <div className={classes.paper}>
                <Grid
                    component="form"
                    onSubmit={onSubmitHandler}
                    container
                    spacing={2}
                    justifyContent='center'
                >
                    <Typography
                        textAlign="center"
                        marginBottom="30px"
                        variant="h4"
                    >Редактировать профиль</Typography>

                    <FormElement
                        required={true}
                        label="Электронная почта"
                        name="email"
                        value={state.email}
                        onChange={(e) => inputChangeHandler(e.target.name, e.target.value)}
                        error={getFieldError('email')}
                    />

                    <FormElement
                        required={true}
                        label="Логин"
                        name="username"
                        value={state.username}
                        onChange={(e) => inputChangeHandler(e.target.name, e.target.value)}
                        error={getFieldError('username')}
                    />

                    <FormElement
                        required={true}
                        label="Имя"
                        name="displayName"
                        value={state.displayName}
                        onChange={(e) => inputChangeHandler(e.target.name, e.target.value)}
                        error={getFieldError('displayName')}
                    />

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

export default AdminEditProfile;