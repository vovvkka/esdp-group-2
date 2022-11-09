import React, {useEffect, useState} from 'react';
import {Button, Grid, Paper} from "@mui/material";
import FormElement from "../UI/Form/FormElement/FormElement";
import FormSelect from "../UI/Form/FormSelect/FormSelect";
import {useSelector} from "react-redux";


const CategoryForm = ({onSubmit, data}) => {
    const error = useSelector(state => state.categories.error);

    const [state, setState] = useState({
        title: "",
        status: "",
        nds: 0,
        nspCash: 0,
        nspNotCash: 0,
    });

    const getFieldError = fieldName => {
        try {
            return error.error[fieldName].message;
        } catch {
            return undefined;
        }
    };

    useEffect(() => {
        if (data) {
            setState(data);
        }
    }, [data]);

    const inputChangeHandler = e => {
        const {name, value} = e.target;

        setState(prevState => {
            if (typeof value === 'number') {
                return {...prevState, [name]: parseInt(value)};
            }
            return {...prevState, [name]: value};
        });
    };

    const onSubmitHandler = e => {
        e.preventDefault();

        onSubmit({...state});
    };

    return (
        <form
            autoComplete="off"
            onSubmit={(e) => onSubmitHandler(e)}
        >
            <Paper display="flex">
                <Grid container textAlign="center" marginX="auto" spacing={3}>
                    <Grid item xs={3}>
                        <FormElement
                            label="Категория"
                            onChange={inputChangeHandler}
                            value={state.title}
                            name="title"
                            error={getFieldError('title')}
                        />
                    </Grid>

                    <Grid item xs={2}>
                        <FormElement
                            type="number"
                            label="НДС,%"
                            onChange={inputChangeHandler}
                            value={state.nds}
                            name="nds"
                            error={getFieldError('nds')}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <FormElement
                            type="number"
                            label="НСП нал,%"
                            onChange={inputChangeHandler}
                            value={state.nspCash}
                            name="nspCash"
                            error={getFieldError('nspCash')}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <FormElement
                            type="number"
                            label="НСП безнал,%"
                            onChange={inputChangeHandler}
                            value={state.nspNotCash}
                            name="nspNotCash"
                            error={getFieldError('nspNotCash')}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <FormSelect
                            options={["Активный", "Неактивный"]}
                            label="Статус"
                            onChange={inputChangeHandler}
                            value={state.status}
                            name="status"
                            error={getFieldError('status')}
                        />
                    </Grid>
                </Grid>
                <Grid sx={{margin: "15px 0 0 20px", paddingBottom: "20px"}}>
                    <Button type="submit" color="primary" variant="contained">Сохранить</Button>
                </Grid>
            </Paper>
        </form>
    );
};

export default CategoryForm;