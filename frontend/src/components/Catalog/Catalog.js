import React, {useEffect, useState} from 'react';
import {Avatar, Grid, Tab, Tabs, TextField} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {fetchCategories} from "../../store/actions/categoriesActions";
import {apiUrl} from "../../config";
import {fetchProducts} from "../../store/actions/productsActions";
import {addProductToCashbox} from "../../store/slices/cashboxSlice";

const Catalog = () => {
    const categories = useSelector(state => state.categories.categories);
    const products = useSelector(state => state.products.products);
    const user = useSelector(state => state.users.user);
    const dispatch = useDispatch();

    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    useEffect(()=>{
        if (categories.length) {
            if (!value) {
                dispatch(fetchProducts());
            } else {
                dispatch(fetchProducts('?category=' + categories[value-1]._id));
            }
        }
    },[dispatch,categories,value])

    const onSearch = e => {
        if (e.target.value) {
            if (e.target.value.replace(/\s/g, '')) {
                if (!value) {
                    dispatch(fetchProducts('?key=' + e.target.value));
                } else {
                    dispatch(fetchProducts('?key=' + e.target.value+'&category='+categories[value-1]._id));
                }
            }
        } else {
            if (value) {
                dispatch(fetchProducts('?category=' + categories[value - 1]._id));
            } else {
                dispatch(fetchProducts());
            }
        }
    };

    const handleClick = (item) => {
        if (user.role === 'cashier') {
            dispatch(addProductToCashbox(item));
        }
    }

    return (
        <Grid item xs={6} sx={{backgroundColor: '#e0e0e0', padding: '15px'}}>
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
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignContent: 'flex-start',
                    flexWrap: 'wrap',
                    marginTop: '15px',
                    paddingRight: '10px',
                    overflowY: 'scroll',
                    height: '680px',
                }}
            >
                <TextField onChange={onSearch} id="outlined-basic" label="Поиск" variant="outlined" margin="normal"/>
                {products && products.map(item =>
                    <div onClick={() => handleClick(item)} key={item._id} style={{
                        cursor: 'pointer',
                        display: 'flex',
                        width: '48%',
                        marginBottom: '15px',
                        backgroundColor: 'white',
                        borderRadius: '5px',
                        padding: '10px',
                        alignSelf: 'start',
                    }}>
                        <Avatar src={apiUrl + '/' + item.image}
                                alt='image'
                                sx={{width: 70, height: 70}}
                        />

                        <div style={{marginLeft: '15px'}}>
                            <b>{item.title}</b>
                            <div>{item.barcode}</div>
                        </div>
                    </div>
                )}
            </div>
        </Grid>
    );
};

export default Catalog;