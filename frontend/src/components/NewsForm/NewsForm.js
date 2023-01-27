import React, {useEffect, useState} from 'react';
import {Button, Grid, Paper} from "@mui/material";
import FormElement from "../UI/Form/FormElement/FormElement";
import FileInput from "../UI/Form/FileInput/FileInput";

const NewsForm = ({news, error, onSubmit}) => {

    const [state, setState] = useState({
        title: "",
        description: "",
        image: "",
    });

    useEffect(() => {
        if (news) {
            setState(news);
        }
    }, [news]);


    const fileChangeHandler = e => {
        const name = e.target.name;
        const file = e.target.files[0];

        setState(prevState => ({...prevState, [name]: file}));
    };

    const inputChangeHandler = e => {
        const {name, value} = e.target;

        setState(prevState => {
            return {...prevState, [name]: value};
        });
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
            return error.errors[fieldName].message;
        } catch {
            return undefined;
        }
    };

    return (
        <form
            autoComplete="off"
        >
            <Paper display="flex" sx={{padding: '30px 0'}}>
                <Grid
                    container
                    maxWidth="md"
                    textAlign="center"
                    marginX="auto"
                    direction="column"
                    spacing={2}
                >

                    <FormElement
                        label="Заголовок"
                        onChange={inputChangeHandler}
                        value={state.title}
                        name="title"
                        required={true}
                        error={getFieldError('title')}
                        xs={6}
                    />

                    <FormElement
                        label="Описание"
                        onChange={inputChangeHandler}
                        value={state.description}
                        name="description"
                        required={true}
                        error={getFieldError('description')}
                        multiline={true}
                        rows={4}
                        xs={6}
                    />

                    <Grid item>
                        <FileInput
                            sx={{mt: '10px'}}
                            label="Фото"
                            name="image"
                            onChange={fileChangeHandler}
                            xs={10.5}
                        />
                    </Grid>

                    <Grid item>
                        <Button type="submit" color="primary" variant="contained"
                                onClick={submitFormHandler}>{news ? "Редактировать" : "Добавить"}</Button>
                    </Grid>
                </Grid>
            </Paper>
        </form>
    );
};

export default NewsForm;