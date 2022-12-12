import React, {useEffect, useState} from 'react';
import {Button, Grid, Paper} from "@mui/material";
import FormElement from "../UI/Form/FormElement/FormElement";
import FormSelect from "../UI/Form/FormSelect/FormSelect";
import {useDispatch, useSelector} from "react-redux";
import {fetchCategories} from "../../store/actions/categoriesActions";


const CategoryForm = ({onSubmit, data}) => {
    const dispatch = useDispatch();
    const error = useSelector(state => state.categories.error);
    const categories = useSelector(state => state.categories.categories);
    const [options, setOptions] = useState([]);

    const [state, setState] = useState({
        category: "",
        title: "",
        status: "",
    });
    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);
    useEffect(() => {
        setOptions([{_id: '123', title: 'Без категории'}, ...categories]);
    }, [categories]);

    const getFieldError = fieldName => {
        try {
            return error.error[fieldName].message;
        } catch {
            return undefined;
        }
    };
    useEffect(() => {
        if (data) {
            if (data.category === null) {
                const newData = {...data};
                newData.category = '123';
                setState(newData);
            } else {
                setState(data);
            }
        }
    }, [data]);

    const inputChangeHandler = e => {
        const {name, value} = e.target;
        setState(prevState => {
            return {...prevState, [name]: value};
        });
    };

    const onSubmitHandler = e => {
        e.preventDefault();
        if (state.category === '123') {
            const newData = {...state};
            newData.category = null;
            onSubmit(newData);
        } else {
            onSubmit({...state});
        }
    };

    return (
        <form
            autoComplete="off"
            onSubmit={(e) => onSubmitHandler(e)}
        >
            <Paper display="flex" sx={{padding: '30px 0 10px 0'}}>

                <Grid container justifyContent='center'>
                    <Grid xs={7} item>
                        <FormSelect
                            selectFromServer
                            options={options}
                            label="Категория"
                            onChange={inputChangeHandler}
                            value={state.category}
                            name="category"
                            error={getFieldError('category')}
                            required={true}
                        />
                    </Grid>
                    <Grid item xs={7} sx={{marginBottom: '4px'}}>
                        <FormElement
                            required={true}
                            label="Название"
                            onChange={inputChangeHandler}
                            value={state.title}
                            name="title"
                            error={getFieldError('title')}
                        />
                    </Grid>
                    <Grid item xs={7}>
                        <FormSelect
                            required={true}
                            options={["Активный", "Неактивный"]}
                            label="Статус"
                            onChange={inputChangeHandler}
                            value={state.status}
                            name="status"
                            error={getFieldError('status')}
                        />
                    </Grid>
                </Grid>
                <Grid sx={{margin: "15px 0 0 20px", paddingBottom: "20px"}} container justifyContent='center'>
                    <Button type="submit" color="primary" variant="contained">Сохранить</Button>
                </Grid>
            </Paper>
        </form>
    );
};

export default CategoryForm;