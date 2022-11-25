import React, {useEffect, useState} from 'react';
import FormElement from "../UI/Form/FormElement/FormElement";
import {Button, Grid} from "@mui/material";
import {clearOrderError} from "../../store/slices/orderSlice";
import {useDispatch} from "react-redux";

const OrderForm = ({onSubmit, error}) => {
    const dispatch = useDispatch();
    const [state, setState] = useState({
        customer: "",
        phone: "",
        address: "",
    });

    useEffect(()=>{
        return () =>{
          dispatch(clearOrderError());
        };
    },[dispatch]);

    const getFieldError = fieldName => {
        try {
            return error.error[fieldName].message;
        } catch {
            return undefined;
        }
    };
    const onSubmitHandler = e => {
        e.preventDefault();
        if (state.customer && state.phone && state.address) {
            onSubmit({...state});
        }
    };

    const inputChangeHandler = e => {
        const {name, value} = e.target;

        setState(prevState => {
            return {...prevState, [name]: value};
        });
    };


    return (
        <form
            autoComplete="off"
            onSubmit={onSubmitHandler}
        >
            <Grid
                container
                maxWidth="md"
                textAlign="center"
                marginX="auto"
                direction="column"
                rowSpacing={2}
            >

                <FormElement
                    label="Ваше имя"
                    onChange={inputChangeHandler}
                    value={state.customer}
                    name="customer"
                    error={getFieldError('customer')}
                    required
                />

                <FormElement
                    type="tel"
                    label="Ваш телефон"
                    onChange={inputChangeHandler}
                    value={state.phone}
                    name="phone"
                    error={getFieldError('phone')}
                    required
                />
                <FormElement
                    label="Ваш адрес"
                    onChange={inputChangeHandler}
                    value={state.address}
                    name="address"
                    error={getFieldError('address')}
                    required
                />

                <Grid item>
                    <Button type="submit" color="primary" variant="contained">Оформить заказ</Button>
                </Grid>
            </Grid>
        </form>
    );
};

export default OrderForm;