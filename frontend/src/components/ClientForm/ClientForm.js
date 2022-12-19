import React, {useEffect, useState} from 'react';
import {Button, Grid, Paper, Typography} from "@mui/material";
import FormElement from "../UI/Form/FormElement/FormElement";
import {useSelector} from "react-redux";
import FileInput from "../UI/Form/FileInput/FileInput";


const ClientForm = ({onSubmit, data}) => {
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
            if (typeof value === 'number') {
                return {...prevState, [name]: parseInt(value)};
            }
            return {...prevState, [name]: value};
        });
    };

    useEffect(() => {
        if (data) {
            setState(data);
        }
    }, [data]);

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
            onSubmit={submitFormHandler}
        >
            <Paper display="flex" >
                <Grid container textAlign="center" marginX="auto" paddingBottom='35px' spacing={3} justifyContent='center'
                     flexWrap='wrap'>
                    <Grid item xs={5}>
                        <Typography textAlign="left">Имя</Typography>
                        <FormElement
                            onChange={inputChangeHandler}
                            value={state.name || ""}
                            name="name"
                            error={getFieldError('name')}
                            required={true}
                        />
                    </Grid>
                    <Grid item xs={5}>
                        <Typography textAlign="left">Фамилия</Typography>
                        <FormElement
                            onChange={inputChangeHandler}
                            value={state.surname || ""}
                            name="surname"
                            error={getFieldError('surname')}
                            required={true}
                        />
                    </Grid>
                    <Grid item xs={5}>
                        <Typography textAlign="left">Email</Typography>
                        <FormElement
                            onChange={inputChangeHandler}
                            value={state.email || ""}
                            name="email"
                            error={getFieldError('email')}
                        />
                    </Grid>

                    <Grid item xs={5}>
                        <Typography textAlign="left">Телефон</Typography>
                        <FormElement
                            type="tel"
                            onChange={inputChangeHandler}
                            value={state.phone || ""}
                            name="phone"
                            error={getFieldError('phone')}
                            required={true}
                        />
                    </Grid>
                    <Grid item xs={5}>
                        <Typography textAlign="left">Адрес</Typography>
                        <FormElement
                            onChange={inputChangeHandler}
                            value={state.address || ""}
                            name="address"
                            error={getFieldError('address')}
                        />
                    </Grid>
                    <Grid item xs={5}>
                        <Typography textAlign="left">Скидка в %</Typography>
                        <FormElement
                            type="number"
                            onChange={inputChangeHandler}
                            value={state.discount || ""}
                            name="discount"
                            error={getFieldError('discount')}
                            required={true}
                        />
                    </Grid>
                    <Grid item xs={5}>
                        <Typography textAlign="left">Аватар</Typography>
                    <FileInput
                        label="Аватар"
                        name="image"
                        onChange={fileChangeHandler}
                    />
                    </Grid>
                    <Grid  item xs={5}  container flexDirection='column' justifyContent='flex-end' >
                        <div style={{paddingBottom:'9px',display:'flex',justifyContent:'flex-end'}}>
                            <Button type="submit" color="primary" variant="contained">Записать</Button>
                        </div>
                    </Grid>

                </Grid>

            </Paper>
        </form>
    );
};

export default ClientForm;