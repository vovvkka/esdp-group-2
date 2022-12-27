import React from 'react';
import {Grid, Tab, Tabs} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import {useEffect} from "react";
import {fetchProducts} from "../../store/actions/productsActions";
import {fetchCategories} from "../../store/actions/categoriesActions";

const CategoryBar = () => {
    const categories = useSelector(state => state.categories.categories);
    const dispatch = useDispatch();
    const [value, setValue] = useState(0);

    useEffect(()=>{
        if (categories.length) {
            if (!value){
                dispatch(fetchProducts('/main'));
            }else {
                dispatch(fetchProducts('/main?category=' + categories[value-1]._id));
            }
        }
    },[dispatch,categories,value]);

    useEffect(() => {
        dispatch(fetchCategories());

    }, [dispatch]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Grid container justifyContent='center' sx={{marginBottom: '30px'}}>
        <Tabs
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="auto"
            aria-label="scrollable auto tabs example"
        >
                <Tab label="Все"/>
                {categories && categories.map(i =>
                    <Tab key={i._id} label={i.title}/>
                )}
        </Tabs>
        </Grid>
    );
};

export default CategoryBar;