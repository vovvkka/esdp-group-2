import React, {useEffect, useRef, useState} from 'react';
import {useRouteMatch} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {Splide, SplideSlide} from '@splidejs/react-splide';
import {fetchOneProduct} from "../../store/actions/productsActions";
import {apiUrl} from "../../config";
import {addProduct} from "../../store/slices/cartSlice";
import '@splidejs/react-splide/css';


const SingleProductPage = () => {
    const match = useRouteMatch();
    const dispatch = useDispatch();
    const mainRef = useRef(null);
    const thumbsRef = useRef(null);

    const product = useSelector(state => state.products.product);
    const [amount, setAmount] = useState(1);
    const cartProduct = {...product};

    useEffect(() => {
        dispatch(fetchOneProduct(match.params.id));
    }, [dispatch, match.params.id]);

    useEffect(() => {
        if (mainRef.current && thumbsRef.current && thumbsRef.current.splide) {
            mainRef.current.sync(thumbsRef.current.splide);
        }
    }, [mainRef.current, thumbsRef.current]);

    const addToCart = () => {
        cartProduct.quantity = amount;
        dispatch(addProduct(cartProduct));
    };

    const changeAmount = (e) => {
        if (e.target.value > product.amount) {
            return alert('Столько количества нету в складе')
        }
        setAmount(e.target.value);
    };

    const mainOptions = {
        type: 'fade',
        heightRatio: 0.5,
        fixedHeight: 500,
        pagination: false,
        arrows: false,
        cover: true,
        breakpoints: {
            780: {
                fixedHeight: 355,
            },
        },
    };
    const thumbsOptions = {
        rewind: false,
        fixedWidth: 104,
        fixedHeight: 110,
        padding: '75px',
        isNavigation: true,
        gap: 1,
        focus: 'none',
        pagination: false,
        cover: true,
        dragMinThreshold: {
            mouse: 4,
            touch: 10,
        },
        breakpoints: {
            780: {
                fixedWidth: 80,
                fixedHeight: 80,
                padding: '60px',
            },
        },
    };

    return product && (
        <div className='single-product'>
            <div className='single-product__top'>
                <h1 className='title'>{product.title}</h1>
                <div className='location'>Главная — {product.category.title} — <span
                    className='location__page'>{product.title}</span></div>
            </div>

            <div className='single-product__main'>
                <div className='single-product__slide'>
                    <Splide
                        options={mainOptions}
                        ref={mainRef}
                    >
                        {product.image.map((slide, index) => (
                            <SplideSlide key={index}>
                                <img src={apiUrl + '/' + slide} alt={product.title}/>
                            </SplideSlide>
                        ))}
                    </Splide>

                    <Splide
                        options={thumbsOptions}
                        ref={thumbsRef}
                    >
                        {product.image.map(slide => (
                            <SplideSlide key={slide}>
                                <img src={apiUrl + '/' + slide} alt={product.title}/>
                            </SplideSlide>
                        ))}
                    </Splide>
                </div>

                <div className='single-product__info'>
                    <h2 className='single-product__price'>Цена: {product.price} сом</h2>

                    <h4 className='single-product__text item'>В наличии: {product.amount} {product.unit}</h4>

                    {product.description ? <p className='item'><b>Описание:</b> {product.description}</p> : null}

                    <div className='single-product__cart item'>
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