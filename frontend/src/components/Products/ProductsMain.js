import React from 'react';
import {useSelector} from "react-redux";
import ProductCard from "../NewShop/ProductCard/ProductCard";
import {Typography} from "@mui/material";
import Spinner from "../UI/Spinner/Spinner";

const ProductsMain = () => {
    const products = useSelector(state => state.products.products);
    const loading = useSelector(state => state.products.fetchLoading);

    const renderProducts = products.length > 0 ? products.map((product) => (
        <ProductCard key={product._id} product={product}/>
    )) : <Typography>Нет в наличии</Typography>;

    return loading ? <Spinner/> : (
        <div>
            <div className='products'>
                {renderProducts}
            </div>
        </div>
    );
}

export default ProductsMain;