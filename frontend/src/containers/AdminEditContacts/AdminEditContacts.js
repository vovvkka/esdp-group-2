import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Button, Container, Grid, Typography} from "@mui/material";
import FormElement from "../../components/UI/Form/FormElement/FormElement";
import {editContacts, getContacts} from "../../store/actions/contactsActions";
import {makeStyles} from "tss-react/mui";
import DeleteIcon from '@mui/icons-material/Delete';

const useStyles = makeStyles()(theme => ({
    paper: {
        marginTop: '100px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        marginTop: theme.spacing(1),
    },
    link: {
        marginTop: '5px'
    },
    submit: {
        margin: `${theme.spacing(1, 0)} !important`,
    }
}));

const AdminEditContacts = () => {
    const dispatch = useDispatch();
    const contacts = useSelector(state => state.contacts.contacts);
    const error = useSelector(state => state.contacts.error);
    const {classes} = useStyles();

    const [state, setState] = useState({
        email: [],
        phone: [],
        address: [],
    });

    useEffect(() => {
        dispatch(getContacts());
    }, [dispatch]);

    useEffect(() => {
        if (contacts) {
            setState(prevState => ({
                ...prevState,
                email: contacts.email,
                phone: contacts.phone,
                address: contacts.address,
            }))
        }
    }, [contacts]);


    const getFieldError = fieldName => {
        try {
            return error.error[fieldName].message;
        } catch {
            return undefined;
        }
    };

    const multipleChangeHandler = (e, index) => {
        const {name, value} = e.target;

        setState(prev => {
            const newArr = prev[name].map((item, i) => {
                if (index === i) {
                    return value;
                }

                return item;
            });

            return {
                ...prev,
                [name]: newArr,
            }
        });
    };

    const addInputHandler = (name) => {
        setState(prev => ({
            ...prev,
            [name]: [...prev[name], ''],
        }));
    };

    const deleteInput = (index, name) => {
        setState(prev => {
            const arrCopy = [...prev[name]];
            arrCopy.splice(index, 1);

            return {
                ...prev,
                [name]: arrCopy,
            };
        });
    };


    const onSubmitHandler = e => {
        e.preventDefault();
        dispatch(editContacts({...state}));
    };

    return contacts && (
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
                    >Редактировать контакты</Typography>

                    {state.phone.map((tel, index) => (
                        <Grid container key={index}>
                            <FormElement
                                xs={index > 0 ? 11 : 12}
                                required={true}
                                label="Телефон"
                                name="phone"
                                value={state.phone[index]}
                                onChange={(e) => multipleChangeHandler(e, index)}
                                error={getFieldError('phone')}
                            />
                            {index > 0 ? <Button type='button' color='error' name='phone'
                                                 onClick={(e) => deleteInput(index, e.currentTarget.name)}><DeleteIcon/></Button> : null}
                        </Grid>
                    ))}

                    <Button sx={{justifySelf: 'end'}} name='phone' onClick={(e) => addInputHandler(e.target.name)}>Добавить
                        телефон</Button>

                    {state.email.map((email, index) => (
                        <Grid container key={index}>
                            <FormElement
                                xs={index > 0 ? 11 : 12}
                                required={true}
                                label="Почта"
                                name="email"
                                value={state.email[index]}
                                onChange={(e) => multipleChangeHandler(e, index)}
                                error={getFieldError('email')}
                            />
                            {index > 0 ? <Button type='button' color='error' name='email'
                                                 onClick={(e) => deleteInput(index, e.currentTarget.name)}><DeleteIcon/></Button> : null}
                        </Grid>
                    ))}

                    <Button name='email' onClick={(e) => addInputHandler(e.target.name)}>Добавить почту</Button>

                    {state.address.map((email, index) => (
                        <Grid container key={index}>
                            <FormElement
                                xs={index > 0 ? 11 : 12}
                                required={true}
                                label="Адрес"
                                name="address"
                                value={state.address[index]}
                                onChange={(e) => multipleChangeHandler(e, index)}
                                error={getFieldError('address')}
                            />
                            {index > 0 ? <Button type='button' color='error' name='address'
                                                 onClick={(e) => deleteInput(index, e.currentTarget.name)}><DeleteIcon/></Button> : null}
                        </Grid>
                    ))}

                    <Button name='address' onClick={(e) => addInputHandler(e.target.name)}>Добавить адрес</Button>

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

export default AdminEditContacts;