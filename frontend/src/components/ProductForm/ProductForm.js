import React, {useEffect, useState} from 'react';
import {Button, Grid, Paper} from "@mui/material";
import FormElement from "../UI/Form/FormElement/FormElement";
import FileInput from "../UI/Form/FileInput/FileInput";
import FormSelect from "../UI/Form/FormSelect/FormSelect";
import './ProductForm.css';
import axiosApi from "../../axiosApi";
import {TreeSelect} from "antd";

const ProductForm = ({product, categories, error, onSubmit}) => {
    const [options, setOptions] = useState([]);

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
        image: [],
    });

    useEffect(() => {
        setOptions(categories);
    }, [categories]);

    useEffect(() => {
        if (product) {
            const newData = {...product};
            newData.category = newData.category.title;

            setState(newData);
        }
    }, [product]);

    const onSubmitHandler = e => {
        e.preventDefault();
        if (product) {
            if (state.category === product.category.title) {
                const newData = {...state};
                newData.category = product.category._id;
                const formData = new FormData();
                Object.keys(newData).forEach(key => {
                    if (key === 'image') {
                        newData[key].forEach(item => {
                            if (typeof (item) !== 'string') {
                                formData.append(`image`, item);
                            }
                        });
                    } else {
                        formData.append(key, newData[key]);
                    }
                });
                onSubmit(formData);
            } else {
                const formData = new FormData();
                Object.keys(state).forEach(key => {
                    if (key === 'image') {
                        state[key].forEach(item => {
                            formData.append(`image`, item);
                        });
                    } else {
                        formData.append(key, state[key]);
                    }
                });
                onSubmit(formData);
            }
        } else {
            const formData = new FormData();
            Object.keys(state).forEach(key => {
                if (key === 'image') {
                    state[key].forEach(item => {
                        formData.append(`image`, item);
                    });
                } else {
                    formData.append(key, state[key]);
                }
            });
            onSubmit(formData);
        }
    };

    const onLoadData = async ({id}) => {
        const response = await axiosApi('/categories/?node=' + id);
        setOptions(options.concat(response.data));

    }
    const onChange = (newValue) => {
        setState(prevState => {
            return {...prevState, category: newValue};
        });
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
        const files = state.image;



        setState(prevState => ({...prevState, [name]: [file,...files]}));
    };

    const getFieldError = fieldName => {
        try {
            return error.errors[fieldName].message;
        } catch {
            return undefined;
        }
    };

    return (
        <form
            onSubmit={onSubmitHandler}
            autoComplete="off"
        >
            <Grid
                container
                maxWidth="md"
                marginX="auto"
                direction="column"
            >
                <Paper display="flex" sx={{padding: '10px 60px'}}>
                    <div style={{textAlign: 'left'}}>
                        <label>Категория</label>
                        <div style={{color: '#dc4815'}}>{getFieldError('category') ? 'Заполните это поле' : null}</div>

                    </div>

                    <TreeSelect
                        treeDataSimpleMode
                        style={{
                            width: '100%',
                            marginTop: '5px',
                            marginBottom: '5px',
                            textAlign: 'left'
                        }}
                        value={state.category}
                        dropdownStyle={{
                            maxHeight: 400,
                            overflow: 'auto',
                        }}
                        onChange={onChange}
                        loadData={onLoadData}
                        treeData={options}
                    />

                    <FormElement
                        label="Наименование"
                        onChange={inputChangeHandler}
                        value={state.title}
                        name="title"
                        required={true}
                        fullWidth={false}
                    />

                    <FormElement
                        label="Описание"
                        onChange={inputChangeHandler}
                        value={state.description}
                        name="description"
                        fullWidth={false}
                    />

                    <FormElement
                        label="Barcode"
                        onChange={inputChangeHandler}
                        value={state.barcode}
                        name="barcode"
                        required={true}
                    />
                    <div style={{display: 'flex', marginBottom: '5px'}}>
                        <FormElement
                            label="Количество"
                            onChange={inputChangeHandler}
                            value={state.amount}
                            name="amount"
                            required={true}
                            error={getFieldError('amount')}
                        />
                        <div style={{width: '10px'}}></div>
                        <FormElement
                            label="Цена"
                            onChange={inputChangeHandler}
                            value={state.price}
                            name="price"
                            required={true}
                            error={getFieldError('price')}
                        />
                        <div style={{width: '10px'}}></div>
                        <FormElement
                            label="Цена закупки"
                            onChange={inputChangeHandler}
                            value={state.purchasePrice}
                            name="purchasePrice"
                            required={true}
                            error={getFieldError('purchasePrice')}
                        />
                    </div>

                    <div style={{display: 'flex', marginBottom: '5px'}}>
                        <FormSelect
                            label="Тип цены"
                            onChange={inputChangeHandler}
                            value={state.priceType}
                            name="priceType"
                            options={['Фиксированная', 'Свободная']}
                            required={true}
                        />
                        <div style={{width: '10px'}}></div>
                        <FormSelect
                            label="Статус"
                            onChange={inputChangeHandler}
                            value={state.status}
                            name="status"
                            options={['Активный', 'Неактивный']}
                            required={true}
                            error={getFieldError('status')}
                        />
                        <div style={{width: '10px'}}></div>
                        <FormSelect
                            label="Ед. измерения"
                            onChange={inputChangeHandler}
                            value={state.unit}
                            name="unit"
                            options={['шт.', 'уп.']}
                            required={true}
                            error={getFieldError('unit')}
                        />
                    </div>

                    <FileInput
                        label="Фото"
                        name="image"
                        multiple='multiple'
                        onChange={fileChangeHandler}
                        xs={10}
                    />


                    <Grid item display="flex" alignItems="center" justifyContent="center">
                        <Button type="submit" color="primary"
                                variant="contained"
                                sx={{marginTop: '10px'}}>{product ? 'Редактировать' : 'Добавить'}</Button>
                    </Grid>
                </Paper>
            </Grid>
        </form>
    );
};

export default ProductForm;