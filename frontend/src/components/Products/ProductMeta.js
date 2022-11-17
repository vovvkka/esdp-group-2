import React from 'react';
import {ProductMetaWrapper} from "../../styles/Product/styledProduct";
import {Typography} from "@mui/material";

const ProductMeta = ({product, matches}) => {
    return (
        <ProductMetaWrapper>
            <Typography variant={matches ? "h6" : "h5"} lineHeight={2}>
                {product.title}
            </Typography>
            <Typography variant={matches ? "caption" : "body1"}>
                {product.price} сом
            </Typography>
        </ProductMetaWrapper>
    );
};

export default ProductMeta;