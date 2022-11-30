import React from 'react';
import {apiUrl} from "../../../config";

const ProductCard = ({product}) => {
    return (
        <div className='product-card'>
            <img src={apiUrl + '/' + product.image} alt={product.title} className='product-card__picture'/>
            <h5 className='product-card__title'>{product.title}</h5>
            <span className='product-card__price'>{product.price} сом</span>
            <div className="product-card__overlay">
                <span className='product-card__icon'>→</span>
            </div>
        </div>
    );
};

export default ProductCard;