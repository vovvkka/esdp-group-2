import React from 'react';
import {apiUrl} from "../../config";
import {Link} from "react-router-dom"

const ProductCard = ({product}) => {

    return (
        <div className='product-card'>
            <img src={apiUrl + '/' + product.image[0]} alt={product.title} className='product-card__picture'/>
            <div className='product-card__info'>
                <h5 className='product-card__title'>{product.title}</h5>
                <span className='product-card__price'>{product.price} сом</span>
                <Link  to={`/products/${product._id}`} className="product-card__overlay">
                    <div className='product-card__icon'>→</div>
                </Link>
            </div>
        </div>
    );
};

export default ProductCard;