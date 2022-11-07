import {useEffect, useState} from "react";
import {Button, Grid, Paper} from "@mui/material";
import FormElement from "../../components/UI/Form/FormElement/FormElement";
import FormSelect from "../../components/UI/Form/FormSelect/FormSelect";
import {useDispatch, useSelector} from "react-redux";
import {editCategory, fetchCategory} from "../../store/actions/categoriesActions";

const AdminEditCategory = ({match}) => {
    const category = useSelector(state => state.categories.category);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCategory(match.params.id));
    }, [match.params.id, dispatch]);

    const [state, setState] = useState({
        title: "",
        status: "",
        nds: "",
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
        dispatch(editCategory(match.params.id, state));
    };

    return (
        <form
            autoComplete="off"
            onSubmit={(e) => submitHandler(e)}
        >
            <Paper display="flex">
                <Grid container textAlign="center" marginX="auto" spacing={3}>
                    <Grid item xs={3}>
                        <FormElement
                            label="Категория"
                            onChange={inputChangeHandler}
                            value={state.title}
                            name="title"
                        />
                    </Grid>

                    <Grid item xs={2}>
                        <FormElement
                            type="number"
                            label="НДС,%"
                            onChange={inputChangeHandler}
                            value={state.nds}
                            name="nds"

                        />
                    </Grid>
                    <Grid item xs={2}>
                        <FormElement
                            type="number"
                            label="НСП нал,%"
                            onChange={inputChangeHandler}
                            value={state.nspCash}
                            name="nspCash"
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <FormElement
                            type="number"
                            label="НСП безнал,%"
                            onChange={inputChangeHandler}
                            value={state.nspNotCash}
                            name="nspNotCash"
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <FormSelect
                            options={["Активный", "Неактивный"]}
                            label="Статус"
                            onChange={inputChangeHandler}
                            value={state.status}
                            name="status"
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

export default AdminEditCategory;