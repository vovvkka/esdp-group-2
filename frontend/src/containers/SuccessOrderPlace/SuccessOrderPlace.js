import React from "react";
import { useDispatch } from "react-redux";
import { historyPush } from "../../store/actions/historyActions";
import {Link} from "react-router-dom";

const SuccessOrderPlace = () => {
    const dispatch = useDispatch();

    return (
        <div className="success-order">
            <div className="container">
                <div className="success-order__block">
                    <div className="success-order__title-block">
                        <h2 className="title">Заказ получен</h2>
                        <div className="location">
                            <Link to="/">Главная</Link> <span>—</span> <p className="location__page">Оформление заказа</p>
                            <span>—</span>
                            <p className="location__page">Заказ получен</p>
                        </div>
                    </div>

                    <div className="success-order__received">
                        <div className="success-order__received-info">
                            <div className="success-order__svg">
                                <svg
                                    width="72"
                                    height="84"
                                    viewBox="0 0 72 84"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M53.1219 30.8761C53.4013 31.1547 53.623 31.4858 53.7742 31.8502C53.9254 32.2147 54.0033 32.6054 54.0033 33.0001C54.0033 33.3947 53.9254 33.7854 53.7742 34.1499C53.623 34.5143 53.4013 34.8454 53.1219 35.1241L35.1219 53.124C34.8433 53.4034 34.5122 53.6251 34.1477 53.7763C33.7833 53.9276 33.3925 54.0054 32.9979 54.0054C32.6033 54.0054 32.2126 53.9276 31.8481 53.7763C31.4837 53.6251 31.1526 53.4034 30.8739 53.124L21.8739 44.1241C21.595 43.8451 21.3737 43.514 21.2228 43.1496C21.0718 42.7851 20.9941 42.3945 20.9941 42C20.9941 41.6056 21.0718 41.215 21.2228 40.8505C21.3737 40.4861 21.595 40.155 21.8739 39.876C22.1529 39.5971 22.484 39.3759 22.8484 39.2249C23.2129 39.074 23.6035 38.9963 23.9979 38.9963C24.3924 38.9963 24.783 39.074 25.1474 39.2249C25.5119 39.3759 25.843 39.5971 26.1219 39.876L32.9979 46.7581L48.8739 30.8761C49.1526 30.5967 49.4837 30.375 49.8481 30.2238C50.2126 30.0725 50.6033 29.9947 50.9979 29.9947C51.3925 29.9947 51.7833 30.0725 52.1477 30.2238C52.5122 30.375 52.8433 30.5967 53.1219 30.8761Z"
                                        fill="#6E9C9F"
                                    />
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M12 0H60C63.1826 0 66.2348 1.26428 68.4853 3.51472C70.7357 5.76516 72 8.8174 72 12V72C72 75.1826 70.7357 78.2348 68.4853 80.4853C66.2348 82.7357 63.1826 84 60 84H12C8.8174 84 5.76515 82.7357 3.51472 80.4853C1.26428 78.2348 0 75.1826 0 72V12C0 8.8174 1.26428 5.76516 3.51472 3.51472C5.76515 1.26428 8.8174 0 12 0ZM12 6C10.4087 6 8.88258 6.63214 7.75736 7.75736C6.63214 8.88258 6 10.4087 6 12V72C6 73.5913 6.63214 75.1174 7.75736 76.2426C8.88258 77.3679 10.4087 78 12 78H60C61.5913 78 63.1174 77.3679 64.2426 76.2426C65.3679 75.1174 66 73.5913 66 72V12C66 10.4087 65.3679 8.88258 64.2426 7.75736C63.1174 6.63214 61.5913 6 60 6H12Z"
                                        fill="#6E9C9F"
                                    />
                                </svg>
                            </div>

                            <div className="success-order__message">
                                <p className="success-order__message-title">
                                    Заказ успешно оформлен
                                </p>
                                <p className="success-order__message-sub-title">
                                    Мы свяжемся с вами в ближайшее время!
                                </p>
                            </div>
                        </div>

                        <div className="success-order__received-button">
                            <button
                                className="success-order__button"
                                onClick={() => dispatch(historyPush("/"))}
                            >
                                Перейти на главную
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SuccessOrderPlace;
