import React from 'react';
import {apiUrl} from "../../../config";
import {Link} from "react-router-dom"

const ProductCard = ({product}) => {

    return (
        <div className='product-card'>
            <img src={apiUrl + '/' + product.image} alt={product.title} className='product-card__picture'/>
            <h5 className='product-card__title'>{product.title}</h5>
            <span className='product-card__price'>{product.price} сом</span>
            <Link  to={`/products/${product._id}`} className="product-card__overlay">
                <div className='product-card__icon'>→</div>
            </Link>
        </div>
    );
};

export default ProductCard;