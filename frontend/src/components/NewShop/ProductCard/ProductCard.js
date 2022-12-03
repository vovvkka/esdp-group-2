import React from 'react';
import {apiUrl} from "../../../config";
import {Link} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux";
import {addNotification} from "../../../store/actions/notifierActions";
import {addProduct} from "../../../store/slices/cartSlice";

const ProductCard = ({product}) => {
    const dispatch = useDispatch();
    const products = useSelector(state => state.cart.products);
    const itemInCart = products.find((item) => item._id === product._id);

    const onAddToCart = () => {
        dispatch(addNotification(`Добавлено.`,'success', {autoClose: 1000}));
        dispatch(addProduct(product));
    };

    return (
        <div className='product-card'>
            <img src={apiUrl + '/' + product.image} alt={product.title} className='product-card__picture'/>
            <h5 className='product-card__title'>{product.title}</h5>
            <span className='product-card__price'>{product.price} сом</span>
            <div className="product-card__overlay">
                <Link className='product-card__icon' to={`/products/${product._id}`}>→</Link>
            </div>
            <button disabled={product.amount<=itemInCart?.quantity} onClick={onAddToCart} className='button button--product'>В корзину</button>
        </div>
    );
};

export default ProductCard;