import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {clearCart, deleteProduct, increaseProduct, reduceProduct} from "../../store/slices/cartSlice";
import {Link, NavLink} from "react-router-dom";
import {apiUrl} from "../../config";

const CustomerCart = () => {
    const dispatch = useDispatch();
    const products = useSelector(state => state.cart.products);
    const total = products.reduce((acc, value) => {
        return acc + value.price * value.quantity;
    }, 0);

    return (
        <div className='customer-cart'>
            <h2 className="title">Корзина</h2>
            <div className="location">
                <Link to="/">Главная</Link>
                <span>—</span>
                <p className="location__page">Корзина</p>
            </div>
            <div className="location">
                {products.length ? null : 'Корзина пуста'}
            </div>
            <div className='customer-order__orders'>
                {products.length?<div className='customer-order__order customer-cart__order'>
                    <div>Товар</div>
                    <div>Цена</div>
                    <div>Кол<span>ичество</span></div>
                    <div>Всего</div>
                </div>:null}
                {products.map(i => [<div className='customer-order__order customer-cart__order' key={i._id}>
                    <div>
                        <button onClick={() => dispatch(deleteProduct(i._id))}>
                            x
                        </button>
                        <div><img
                            alt={i.title}
                            src={apiUrl +'/'+ i.image[0]}/>
                            <div>{i.title}</div>
                        </div>
                    </div>
                    <div>{i.price} c.</div>
                    <div>
                        <button onClick={() => dispatch(reduceProduct(i._id))}>
                            -
                        </button>
                        {i.quantity}
                        <button disabled={i.amount <= i.quantity} onClick={() => dispatch(increaseProduct(i._id))}>
                            +
                        </button>
                    </div>
                    <div>{i.price * i.quantity} c.</div>
                </div>,
                    <div key={i.title} className='customer-cart__order-total'>Подытог {i.price * i.quantity} c.</div>]
                )}
            </div>

            {products.length?<div className='customer-cart__button-wrapper'>
                <button className='button button--light' onClick={() => dispatch(clearCart())}>Очистить корзину</button>
            </div>:null}

            {products.length ? <div className='customer-cart__total-wrapper'>
                <div className='customer-cart__total customer-order__orders-total'>Итого <span>{total} с.</span></div>
                <NavLink className='button' to='/order-place'>Оформить заказ</NavLink>
            </div> : null}
        </div>
    );
};

export default CustomerCart;