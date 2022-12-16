import React, {useEffect, useState} from 'react';
import {Button, Grid} from "@mui/material";
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
        if (product){
            console.log(0);
            if(state.category===product.category.title){
                const newData={...state};
                newData.category=product.category._id;
                const formData = new FormData();
                Object.keys(newData).forEach(key => {
                    if (key === 'image') {
                        newData[key].forEach(item => {
                            formData.append(`image`, item);
                        });
                    } else {
                        formData.append(key, newData[key]);
                    }
                });
                onSubmit(formData);
            }else {
                console.log(1);

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
        }else {
            console.log(3);

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
        const file = Object.values(e.target.files);


        setState(prevState => ({...prevState, [name]: file}));
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
                textAlign="center"
                marginX="auto"
                direction="column"
                rowSpacing={2}
            >
                <div style={{textAlign:'left'}}>
                    <label>Категория</label>
                    <div style={{color:'#dc4815'}}>{getFieldError('category')?'Заполните это поле':null}</div>

                </div>
                <TreeSelect
                    treeDataSimpleMode
                    style={{
                        width: '100%',
                        marginTop:'10px',
                        marginBottom:'5px',
                        textAlign:'left'
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

                    <FormElement
                        label="Описание"
                        onChange={inputChangeHandler}
                        value={state.description}
                        name="description"
                        fullWidth={false}
                        xs={6}
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
                        multiple='multiple'
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
                    {}
                    <Button type="submit" color="primary" variant="contained">{product ? 'Редактировать' : 'Добавить'}</Button>
                </Grid>
            </Grid>
        </form>
    );
};

export default ProductForm;