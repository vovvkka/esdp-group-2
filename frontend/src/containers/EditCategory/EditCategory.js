import {useEffect, useState} from "react";
import {Button, Grid, Paper, Typography} from "@mui/material";
import FormElement from "../../components/UI/Form/FormElement/FormElement";
import FormSelect from "../../components/UI/Form/FormSelect/FormSelect";
import {useDispatch, useSelector} from "react-redux";
import {editCategory, fetchCategory} from "../../store/actions/categoriesActions";

const EditCategory = ({match}) => {
    const category = useSelector(state => state.categories.category);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCategory(match.params.id));
    }, [match.params.id]);

    const [state, setState] = useState({
        title: "",
        status: "",
        nsp: "",
        nspCash: "",
        nspNotCash: "",
    });

    useEffect(() => {
        if (category) {
            setState(category);
        }
    }, [category]);

    const inputChangeHandler = e => {
        const {name, value} = e.target;

        setState(prevState => {
            return {...prevState, [name]: value};
        });
    };

    const submitHandler = (e) => {
        e.preventDefault();
        // dispatch(editCategory(match.params.id, state));
    };

    return (
        <form
            autoComplete="off"
            onSubmit={(e) => submitHandler(e)}
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
                    <Button type="submit" color="primary" variant="contained">Редактировать</Button>
                </Grid>
            </Paper>
        </form>
    );
};

export default EditCategory;