import React, {useEffect, useState} from 'react';
import {useRouteMatch} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchOneProduct} from "../../store/actions/productsActions";
import {apiUrl} from "../../config";
import {addProduct} from "../../store/slices/cartSlice";

const SingleProductPage = () => {
    const match = useRouteMatch();
    const dispatch = useDispatch();
    const product = useSelector(state => state.products.product);
    const [size, setSize] = useState(null);
    const [color, setColor] = useState(null);
    const [amount, setAmount] = useState(1);
    const cartProduct = {...product};

    useEffect(() => {
        dispatch(fetchOneProduct(match.params.id));
    }, [dispatch, match.params.id]);

    const addToCart = () => {
        cartProduct.size = size;
        cartProduct.color = color;
        cartProduct.quantity = amount;
        dispatch(addProduct(cartProduct));
    };

    const changeColor = (e, color) => {
        e.target.className = e.target.className + ' isActive';
        setColor(color);
    };

    const changeAmount = (e) => {
        if (e.target.value > product.amount) {
            return alert('Столько количества нету в складе')
        }
        setAmount(e.target.value);
    };

    return product && (
        <div className='single-product'>
            <div className='single-product__top'>
                <h1 className='title'>{product.title}</h1>
                <div className='location'>Главная — {product.category.title} — <span
                    className='location__page'>{product.title}</span></div>
            </div>

            <div className='single-product__main'>
                <div>
                    <img className='single-product__image' src={apiUrl + '/' + product.image} alt={product.title}/>
                </div>

                <div className='single-product__info'>
                    <h2 className='single-product__price'>Цена: {product.price} сом</h2>

                    <div className='single-product__choose'>
                        <h4 className='single-product__text'>Выберите размер</h4>
                        <div>
                            <button className='single-product__size' onClick={() => setSize('S')}>S</button>
                            <button className='single-product__size' onClick={() => setSize('M')}>M</button>
                            <button className='single-product__size' onClick={() => setSize('L')}>L</button>
                            <button className='single-product__size' onClick={() => setSize('XL')}>XL</button>
                        </div>
                    </div>

                    <div className='single-product__choose'>
                        <h4 className='single-product__text'>Выберите цвет</h4>
                        <div>
                            <button className='single-product__size' onClick={(e) => changeColor(e, 'синий')}>синий
                            </button>
                            <button className='single-product__size' onClick={(e) => changeColor(e, 'серый')}>серый
                            </button>
                            <button className='single-product__size'
                                    onClick={(e) => changeColor(e, 'красный')}>красный
                            </button>
                            <button className='single-product__size'
                                    onClick={(e) => changeColor(e, 'оранжевый')}>оранжевый
                            </button>
                        </div>
                    </div>

                    <div>
                        <input type="number" required min={1} max={product.amount} maxLength={4} value={amount}
                               onChange={changeAmount} className='single-product__amount-input'/>
                        <button className='button' onClick={() => addToCart()}>Добавить в корзину</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleProductPage;