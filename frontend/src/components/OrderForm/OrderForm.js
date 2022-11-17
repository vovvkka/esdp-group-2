import React, {useState} from 'react';
import FormElement from "../UI/Form/FormElement/FormElement";
import {Button, Grid, TextField} from "@mui/material";

const OrderForm = ({onSubmit, error}) => {
    const [state, setState] = useState({
        customer: "",
        phone: "",
        address: "",
    });
    const [productState, setProductState] = useState([
        { product: '', amount: ''},
    ]);
    const getFieldError = fieldName => {
        try {
            return error.error[fieldName].message;
        } catch {
            return undefined;
        }
    };
    const onSubmitHandler = e => {
        e.preventDefault();
        onSubmit({...state});
    };

    const inputChangeHandler = e => {
        const {name, value} = e.target;

        setState(prevState => {
            return {...prevState, [name]: value};
        });
    };

    const inputChangeProductHandler = (e, index) => {
        const {name, value} = e.target;
        setProductState(prev => {
            const productCopy = {
                ...prev[index],
                [name]: value
            };
            return prev.map((product, i) => {
                if (index === i) {
                    return productCopy;
                }
                return product;
            });
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
                    label="Ваше Имя"
                    onChange={inputChangeHandler}
                    value={state.customer}
                    name="customer"
                    error={getFieldError('customer')}
                />
                <Grid item>
                    {productState.map((ing, index) => (
                        <div key={index}>
                            <TextField
                                label='Product Name'
                                onChange={e => inputChangeProductHandler(e, index)}
                                value={productState.product}
                                name="product"
                                error={getFieldError('product')}
                                fullWidth={false}
                                sx={{margin: '10px'}}
                            />

                            <TextField
                                type="number"
                                label='Amount'
                                onChange={e => inputChangeProductHandler(e, index)}
                                value={productState.amount}
                                name="amount"
                                error={getFieldError('amount')}
                                fullWidth={false}
                                sx={{margin: '10px'}}
                            />

                        </div>
                    ))}
                </Grid>

                <FormElement
                    type="number"
                    label="Ваш Телефон"
                    onChange={inputChangeHandler}
                    value={state.phone}
                    name="phone"
                    error={getFieldError('phone')}
                />
                <FormElement
                    label="Ваш Адрес"
                    onChange={inputChangeHandler}
                    value={state.address}
                    name="address"
                    error={getFieldError('address')}
                />

                <Grid item>
                    <Button type="submit" color="primary" variant="contained">Оформить заказ</Button>
                </Grid>
            </Grid>
        </form>
    );
};

export default OrderForm;