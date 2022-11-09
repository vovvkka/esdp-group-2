import React, {useEffect, useState} from 'react';
import {Avatar, Grid, Tab, Tabs} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {fetchCategories} from "../../store/actions/categoriesActions";
import {apiUrl} from "../../config";
import {fetchProducts} from "../../store/actions/productsActions";

const Catalog = () => {
    const categories = useSelector(state => state.categories.categories);
    const products = useSelector(state => state.products.products);
    const dispatch = useDispatch();

    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    useEffect(() => {
        dispatch(fetchCategories());
        dispatch(fetchProducts());
    }, [dispatch])

    return (
        <Grid item xs={6} sx={{backgroundColor: '#e0e0e0', padding: '15px'}}>
            <Tabs
                value={value}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons="auto"
                aria-label="scrollable auto tabs example"
            >
                {categories && categories.map(i =>
                    <Tab key={i._id} label={i.title}/>
                )}
            </Tabs>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    marginTop: '15px',
                    paddingRight: '10px',
                    overflowY: 'scroll'
                }}
            >
                {products && products.map(item =>
                    <div key={item._id} style={{
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        width: '48%',
                        marginBottom: '15px',
                        backgroundColor: 'white',
                        borderRadius: '5px',
                        padding: '10px'
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