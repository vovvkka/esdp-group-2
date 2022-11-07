import React, {useState} from 'react';
import {Button, Grid, TextareaAutosize} from "@mui/material";
import FormElement from "../UI/Form/FormElement/FormElement";
import FileInput from "../UI/Form/FileInput/FileInput";
import FormSelect from "../UI/Form/FormSelect/FormSelect";


const ProductForm = () => {
    const [state, setState] = useState({
        title: "",
        description: "",
        barcode: "",
        price: "",
        priceType: "",
        category: "",
        amount: "",
        unit: "",
        status: "",
        purchasePrice: "",
        image: "",
    });

    const submitFormHandler = e => {
        e.preventDefault();
        const formData = new FormData();

        Object.keys(state).forEach(key => {
            formData.append(key, state[key]);
        });

        // onSubmit(formData);
    };

    const inputChangeHandler = e => {
        const {name, value} = e.target;

        setState(prevState => {
            return {...prevState, [name]: value};
        });
    };

    const fileChangeHandler = e => {
        const name = e.target.name;
        const file = e.target.files[0];

        setState(prevState => ({...prevState, [name]: file}));
    };

    const getFieldError = fieldName => {
        try {
            // return error.errors[fieldName].message;
        } catch {
            return undefined;
        }
    };

    return (
        <form
            autoComplete="off"
        >
            <Grid
                container
                maxWidth="md"
                textAlign="center"
                marginX="auto"
                direction="column"
                rowSpacing={2}
            >
                <FormSelect
                    onChange={inputChangeHandler}
                    name='category'
                    options={[]}
                    label='Категория'
                    value={state.category}
                    error={getFieldError('category')}
                />

                <Grid display='flex' justifyContent='space-between' alignItems='center'>
                    <FormElement
                        label="Наименование"
                        onChange={inputChangeHandler}
                        value={state.title}
                        name="title"
                        required={true}
                        fullWidth={false}
                        xs={6}
                    />

                        <TextareaAutosize
                            maxRows={3}
                            aria-label="maximum height"
                            placeholder="Maximum 4 rows"
                            defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                            ut labore et dolore magna aliqua."
                            style={{ width: "48%", resize: 'none' }}
                        />
                </Grid>

                <Grid display='flex' justifyContent='space-between' alignItems='center'>
                    <FormElement
                        label="Barcode"
                        onChange={inputChangeHandler}
                        value={state.barcode}
                        name="barcode"
                        required={true}
                    />

                    <FileInput
                        label="Фото"
                        name="image"
                        onChange={fileChangeHandler}
                    />
                </Grid>

                <Grid display='flex' justifyContent='space-between' alignItems='center'>
                    <FormElement
                        label="Цена"
                        onChange={inputChangeHandler}
                        value={state.price}
                        name="price"
                        required={true}
                        error={getFieldError('price')}
                        xs={6}
                    />

                    <FormSelect
                        label="Тип цены"
                        onChange={inputChangeHandler}
                        value={state.priceType}
                        name="priceType"
                        options={['Фиксированная', 'Свободная']}
                        required={true}
                        width='50%'
                    />
                </Grid>

                <Grid display='flex' justifyContent='space-between' alignItems='center'>
                    <FormElement
                        label="Количество"
                        onChange={inputChangeHandler}
                        value={state.amount}
                        name="amount"
                        required={true}
                        error={getFieldError('amount')}
                        xs={6}
                    />

                    <FormSelect
                        label="Статус"
                        onChange={inputChangeHandler}
                        value={state.status}
                        name="status"
                        options={['Активный', 'Неактивный']}
                        required={true}
                        error={getFieldError('status')}
                        width='50%'
                    />
                </Grid>

                <Grid display='flex' justifyContent='space-between' alignItems='center'>
                    <FormSelect
                        label="Ед. измерения"
                        onChange={inputChangeHandler}
                        value={state.unit}
                        name="unit"
                        options={['шт.', 'уп.']}
                        required={true}
                        error={getFieldError('unit')}
                        width='50%'
                    />

                    <FormElement
                        label="Цена закупки"
                        onChange={inputChangeHandler}
                        value={state.purchasePrice}
                        name="purchasePrice"
                        required={true}
                        error={getFieldError('purchasePrice')}
                        xs={6}
                    />
                </Grid>

                <Grid item>
                    <Button type="submit" color="primary" variant="contained">Добавить</Button>
                </Grid>
            </Grid>
        </form>
    );
};

export default ProductForm;