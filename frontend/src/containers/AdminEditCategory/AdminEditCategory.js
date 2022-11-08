import React, {useEffect} from "react";
import {Container, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {editCategory, fetchCategory} from "../../store/actions/categoriesActions";
import CategoryForm from "../../components/CategoryForm/CategoryForm";

const AdminEditCategory = ({match}) => {
    const category = useSelector(state => state.categories.category);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCategory(match.params.id));
    }, [match.params.id, dispatch]);

    const onSubmitForm = data => {
        dispatch(editCategory(category._id, data));
    };

    return (
        <Container>
            <Typography
                textAlign="left"
                marginBottom="30px"
                variant="h4"
            >
                Редактировать категорию
            </Typography>
            <CategoryForm onSubmit={data => onSubmitForm(data)} data={category}/>
        </Container>
    );
};

export default AdminEditCategory;