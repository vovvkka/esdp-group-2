import React, {useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import {clearOrderError} from "../../store/slices/ordersSlice";

const OrderForm = ({onSubmit, error}) => {
    const dispatch = useDispatch();
    const [state, setState] = useState({
        customer: "",
        phone: "",
        address: "",
        comment: "",
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
                        <input
                            className='customer-order__form-input'
                            onChange={inputChangeHandler}
                            value={state.customer}
                            name="customer"
                            error={getFieldError('customer')}
                            required
                        />
                        <label className='customer-order__input-label'>Имя</label>
                    </div>
                    <div className='customer-order__input-wrapper'>
                        <input
                            type="tel"
                            className='customer-order__form-input'
                            onChange={inputChangeHandler}
                            value={state.phone}
                            name="phone"
                            error={getFieldError('phone')}
                            required
                        />
                        <label className='customer-order__input-label'>Телефон</label>
                    </div>
                    <div className='customer-order__input-wrapper'>
                        <input
                            className='customer-order__form-input'
                            onChange={inputChangeHandler}
                            value={state.address}
                            name="address"
                            error={getFieldError('address')}
                            required
                        />
                        <label className='customer-order__input-label'>Адрес</label>
                    </div>
                    <div className='customer-order__input-wrapper'>
                    <textarea
                        className='customer-order__form-textarea'
                        onChange={inputChangeHandler}
                        value={state.comment}
                        name="comment"
                        error={getFieldError('comment')}
                        required
                    />
                        <label className='customer-order__textarea-label'>Комментарии</label>
                    </div>
                </div>
                <div className='customer-order__form-block'>
                    <p className='customer-order__form-block-title'>Ваш заказ </p>
                    <p className='customer-order__form-block-title'>Способы оплаты</p>
                    <div className='customer-order__check-wrapper'>
                    <input className='customer-order__form-check' type="checkbox" id="pay" name="pay" value="pay"/>
                    <label className='customer-order__check-label' htmlFor="pay">Оплата наличными</label>
                    </div>
                    <button className='customer-order__button'>Разместить заказ</button>
                </div>
            </div>
        </form>
    );
};

export default OrderForm;