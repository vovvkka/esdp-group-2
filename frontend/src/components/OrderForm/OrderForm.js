import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import InputMask from 'react-input-mask';
import {clearOrderError} from "../../store/slices/ordersSlice";

const OrderForm = ({onSubmit, error}) => {
    const dispatch = useDispatch();
    const cart = useSelector(state=>state.cart.products);
    const [state, setState] = useState({
        customer: "",
        phone: "",
        address: "",
        comment: "",
        cashPay: true,
    });
    useEffect(() => {
        return () => {
            dispatch(clearOrderError());
        };
    }, [dispatch]);

    const getFieldError = fieldName => {
        try {
            return error.error[fieldName].message;
        } catch {
            return undefined;
        }
    };
    const onSubmitHandler = e => {
        e.preventDefault();
        if (state.customer && state.phone && state.address) {
            onSubmit({...state});
        }
    };

    const inputChangeHandler = e => {
        const {name, value} = e.target;

        setState(prevState => {
            return {...prevState, [name]: value};
        });
    };


    return (
        <form
            autoComplete="off"
            onSubmit={onSubmitHandler}
        >
            <div className='customer-order__form'>
                <div className='customer-order__form-block'>
                    <p className='customer-order__form-block-title'>Данные покупателя</p>
                    <div className='customer-order__input-wrapper'>
                        {getFieldError('customer')?<div className='customer-order__form-error'>{getFieldError('customer')}</div>:null}
                        <input
                            className='customer-order__form-input'
                            onChange={inputChangeHandler}
                            value={state.customer}
                            name="customer"
                            required
                        />
                        <label className='customer-order__input-label'>Имя</label>
                    </div>
                    <div className='customer-order__input-wrapper'>
                        {getFieldError('phone')?<div className='customer-order__form-error'>{getFieldError('phone')}</div>:null}
                        <InputMask mask="+\9\96(999)99-99-99" value={state?.phone} onChange={inputChangeHandler}>
                            {
                                inputProps => <input {...inputProps}
                                    type="tel"
                                    className="customer-order__form-input"
                                    name="phone"
                                    required
                                />
                            }
                        </InputMask>
                        <label className='customer-order__input-label'>Телефон</label>
                    </div>
                    <div className='customer-order__input-wrapper'>
                        {getFieldError('address')?<div className='customer-order__form-error'>{getFieldError('address')}</div>:null}
                        <input
                            className='customer-order__form-input'
                            onChange={inputChangeHandler}
                            value={state.address}
                            name="address"
                            required
                        />
                        <label className='customer-order__input-label'>Адрес</label>
                    </div>
                    <div className='customer-order__input-wrapper'>
                        {getFieldError('comment')?<div className='customer-order__form-error'>{getFieldError('comment')}</div>:null}
                        <textarea
                        className='customer-order__form-textarea'
                        onChange={inputChangeHandler}
                        value={state.comment}
                        name="comment"
                    />
                        <label className='customer-order__textarea-label'>Комментарии</label>
                    </div>
                </div>
                <div className='customer-order__form-block'>
                    <p className='customer-order__form-block-title'>Ваш заказ </p>
                    <div className='customer-order__orders'>
                        <div className='customer-order__order'><div>Товар</div><div>Кол<span>ичество</span></div><div>Цена</div></div>
                        {cart.map(i=>
                            [<div  className='customer-order__order' key={i._id}>
                                <div>{i.title}</div><div>{i.quantity}</div><div>{i.price} c.</div>
                            </div>,
                            <div key={i.title} className='customer-order__order-total'>Подытог <span>{i.price * i.quantity} c.</span></div>]
                        )}
                        <div className='customer-order__orders-total'>Итого <span>{cart.reduce((acc,value)=>{
                            return acc + value.price*value.quantity;
                        },0)} с.</span></div>
                    </div>
                    <p className='customer-order__form-block-title'>Способы оплаты</p>
                    <div className='customer-order__check-wrapper'>
                        <input className='customer-order__form-check' onChange={()=>{setState(prevState => {
                            return {...prevState, cashPay : !state.cashPay
                            };
                        })}} type="checkbox" checked={state.cashPay} id="pay" name="pay" value="pay"/>
                        <label className='customer-order__check-label' htmlFor="pay">Оплата наличными</label>
                    </div>
                    <div className='customer-order__button-wrapper'>
                        <button  className='button'>Разместить заказ</button>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default OrderForm;