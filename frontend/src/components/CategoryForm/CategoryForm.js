import React, {useState} from 'react';
import {Button, Grid, Paper, Typography} from "@mui/material";
import FormElement from "../UI/Form/FormElement/FormElement";
import FormSelect from "../UI/Form/FormSelect/FormSelect";


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
           <Paper display="flex">
               <Grid container
                     textAlign="center"
                     marginX="auto"
                     spacing={3}>
                   <Grid item xs={3}>
                       <Typography textAlign="left">
                       Наименование:
                       </Typography>
                <FormElement
                    label="Категория"
                    onChange={inputChangeHandler}
                    value={state.title}
                    name="title"
                />
                   </Grid>

                   <Grid item xs={2}>
                       <Typography textAlign="left">
                           НДС
                       </Typography>
                <FormElement
                    type="number"
                    label="0"
                    onChange={inputChangeHandler}
                    value={state.nsp}
                    name="nsp"

                />
                   </Grid>
                   <Grid item xs={2}>
                       <Typography textAlign="left">
                           НСП наличные
                       </Typography>
                <FormElement
                    type="number"
                    label="НСП наличные"
                    onChange={inputChangeHandler}
                    value={state.nspCash}
                    name="nspCash"
                />
                   </Grid>
                   <Grid item xs={2}>
                       <Typography textAlign="left">
                           НСП безналичные
                       </Typography>
                <FormElement
                    type="number"
                    label="НСП безналичные"
                    onChange={inputChangeHandler}
                    value={state.nspNotCash}
                    name="nspNotCash"
                />
                   </Grid>
                   <Grid item xs={2}>
                       <Typography textAlign="left">
                           Статус
                       </Typography>
                       <FormSelect
                           options={["Активный", "Неактивный"]}
                           label="Активный"
                           onChange={inputChangeHandler}
                           value={state.status}
                           name="status"
                       />
                   </Grid>


               </Grid>
               <Grid sx={{margin: "15px 0 0 20px", paddingBottom: "20px"}}>
                   <Button type="submit" color="primary" variant="contained">Добавить</Button>
               </Grid>
           </Paper>
        </form>
    );
};

export default CategoryForm;