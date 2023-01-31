import React, { useEffect, useRef, useState } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { fetchOneProduct } from "../../store/actions/productsActions";
import {apiUrl} from "../../config";
import { addProduct } from "../../store/slices/cartSlice";
import Spinner from "../../components/UI/Spinner/Spinner";
import { clearProduct } from "../../store/slices/productsSlice";
import Share from "../../components/Share/Share";
import "@splidejs/react-splide/css";
import {addNotification} from "../../store/actions/notifierActions";

const SingleProductPage = () => {
    const match = useRouteMatch();
    const dispatch = useDispatch();
    const mainRef = useRef(null);
    const thumbsRef = useRef(null);
    const [error, setError] = useState(null);

    const product = useSelector((state) => state.products.product);
    const loading = useSelector((state) => state.products.fetchLoading);
    const [amount, setAmount] = useState(1);
    const cartProduct = { ...product };

    useEffect(() => {
        dispatch(fetchOneProduct(match.params.id));

        return () => {
            dispatch(clearProduct());
        };
    }, [dispatch, match.params.id]);

    useEffect(() => {
        if (mainRef.current && thumbsRef.current && thumbsRef.current.splide) {
            mainRef.current.sync(thumbsRef.current.splide);
        }
    });

    const addToCart = () => {
        cartProduct.quantity = amount;
        dispatch(addNotification("Товар успешно добавлен в корзину", "success"));
        dispatch(addProduct(cartProduct));
    };

    const changeAmount = (e) => {
        if (e.target.value > product.amount) {
            setError("Максимальное количество " + product.amount);
            setAmount(product.amount);
            return e.preventDefault();
        }
        setError(null);
        setAmount(e.target.value);
    };

    const mainOptions = {
        type: "fade",
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
        padding: "75px",
        isNavigation: true,
        gap: 1,
        focus: "none",
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
                padding: "60px",
            },
        },
    };

    if (loading) {
        return <Spinner />;
    }

    return (
        product && (
            <div className="single-product">
                <div className="single-product__top">
                    <h1 className="title">{product.title}</h1>
                    <div className="location">
                        <Link to="/">Главная</Link>
                        <span>—</span>
                        <Link to={`/catalog/?page=1&user=true`}>
                            {product.category.title}
                        </Link>
                        <span>—</span>
                        <p className="location__page"> {product.title}</p>
                    </div>
                </div>

                <div className="single-product__main">
                    <div className="single-product__slide">
                        {product.image.length > 1 ? (
                            <>
                                <Splide options={mainOptions} ref={mainRef}>
                                    {product.image.map((slide, index) => (
                                        <SplideSlide key={index}>
                                            <img
                                                src={apiUrl + "/" + slide}
                                                alt={product.title}
                                            />
                                        </SplideSlide>
                                    ))}
                                </Splide>

                                <Splide options={thumbsOptions} ref={thumbsRef}>
                                    {product.image.map((slide) => (
                                        <SplideSlide key={slide}>
                                            <img
                                                src={apiUrl + "/" + slide}
                                                alt={product.title}
                                            />
                                        </SplideSlide>
                                    ))}
                                </Splide>
                            </>
                        ) : (
                            <>
                                {product.image.map((slide) => (
                                    <img
                                        key={slide}
                                        className="single-product__image"
                                        src={apiUrl + "/" + slide}
                                        alt={product.title}
                                    />
                                ))}
                            </>
                        )}
                    </div>

                    <div className="single-product__info">
                        <h2 className="single-product__price">
                            Цена: {product.price} сом
                        </h2>

                        <h4 className="single-product__text item">
                            В наличии: {product.amount} {product.unit}
                        </h4>

                        {product.description ? (
                            <p className="item">
                                <b>Описание:</b> {product.description}
                            </p>
                        ) : null}

                        <div className="single-product__cart item">
                            {error ? (
                                <div className="single-product__error">
                                    {error}
                                </div>
                            ) : null}
                            <input
                                type="number"
                                required
                                min={1}
                                max={product.amount}
                                maxLength={4}
                                value={amount}
                                pattern="\d*"
                                onChange={changeAmount}
                                className="single-product__amount-input"
                            />
                            <button
                                className="button"
                                onClick={() => addToCart()}
                            >
                                Добавить в корзину
                            </button>
                            <div className='single-product__share'>
                                <Share url={window.location.href}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    );
};

export default SingleProductPage;
