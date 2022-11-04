import React, {useState} from 'react';
import {Button, Grid} from "@mui/material";
import FormElement from "../UI/Form/FormElement/FormElement";


const CategoryForm = () => {
    const [state, setState] = useState({
        title: "",
        status: "",
        nsp: "",
        nspCash: "",
        nspNotCash: "",
    });

    const inputChangeHandler = e => {
        const {name, value} = e.target;

        setState(prevState => {
            return {...prevState, [name]: value};
        });
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
                <FormElement
                    label="Наименование"
                    onChange={inputChangeHandler}
                    value={state.title}
                    name="title"
                />
                <FormElement
                    label="Статус"
                    onChange={inputChangeHandler}
                    value={state.status}
                    name="status"
                />

                <FormElement
                    type="number"
                    label="НДС"
                    onChange={inputChangeHandler}
                    value={state.nsp}
                    name="nsp"

                />
                <FormElement
                    type="number"
                    label="НСП наличные"
                    onChange={inputChangeHandler}
                    value={state.nspCash}
                    name="nspCash"
                />
                <FormElement
                    type="number"
                    label="НСП безналичные"
                    onChange={inputChangeHandler}
                    value={state.nspNotCash}
                    name="nspNotCash"
                />
                <Grid item>
                    <Button type="submit" color="primary" variant="contained">Create</Button>
                </Grid>
            </Grid>
        </form>
    );
};

export default CategoryForm;