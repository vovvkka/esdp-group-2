import React from 'react';

const Receipt = ({displayName, shiftNumber, receipt}) => {
    console.log(receipt);

    return (
        <div className='receipt'>
            <div className="receipt__ticket">
                <div className='receipt__header'>
                    <p className="receipt__center-text">
                        Магазин для новорожденных <br/> "ТАЙ-ТАЙ"
                    </p>
                    <p className='receipt__center-text'>
                        г.Каракол, ул.Карла Маркса б/н <br/>
                        ТЦ "Мега Молл", 2 этаж
                    </p>
                </div>

                <div className='receipt__main'>
                    <div className='receipt__about-cashier'>
                        <div className='receipt__flex'>
                            <p className="receipt__text">Чек №{receipt.operationNumber}</p>
                            <p className="receipt__text">{new Date(receipt.dateTime).toLocaleString()}</p>
                        </div>
                        <div className='receipt__flex'>
                            <p className="receipt__text">Кассир:</p>
                            <p className="receipt__text">{displayName}</p>
                        </div>
                        <div className='receipt__flex'>
                            <p className="receipt__text">Смена:</p>
                            <p className="receipt__text">{shiftNumber}</p>
                        </div>
                    </div>

                    <div className='receipt__products'>
                        <div className='receipt__product-item '>
                            <div className='receipt__flex'>
                                <p className="receipt__text">[Штрих код]</p>
                                <p className="receipt__text">Название товара</p>
                            </div>

                            <div className='receipt__flex'>
                                <p className="receipt__text">
                                    Кол-во * цена
                                </p>
                                <p className="receipt__text">
                                    сумма
                                </p>
                            </div>
                        </div>

                        {receipt?.additionalInfo?.completePurchaseInfo?.map(product => (
                            <div className='receipt__product-item' key={product._id}>
                                <div className='receipt__flex'>
                                    <p className="receipt__text">{product.barcode}</p>
                                    <p className="receipt__text">{product.title}</p>
                                </div>

                                <div className='receipt__flex'>
                                    <p className="receipt__text">
                                        {product.quantity} * {product.price} {product.discount ? `- ${product.discount}%` : null}
                                    </p>
                                    <p className="receipt__text">
                                        {product.discount ?
                                            product.quantity * product.price * product.discount / 100 :
                                            product.quantity * product.price}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className='receipt__total'>
                    <div className='receipt__flex'>
                        <p>итого:</p>
                        <p>
                            общая сумма: {} <br/>
                            скидка:
                        </p>
                    </div>
                    <p className="receipt__center-text">
                        <b>Итого: {receipt?.additionalInfo?.amountOfMoney}</b>
                    </p>
                </div>


                <div className='receipt__footer'>
                    <p className="receipt__center-text">
                        <b>Спасибо за покупку!</b>
                    </p>
                </div>
            </div>
            <div className='receipt__flex'>
                <button id="btnPrint" className="hidden-print button" onClick={() => window.print()}>Печать</button>
                <button id="btnPrint" className="hidden-print button">Закрыть</button>
            </div>
        </div>
    );
};

export default Receipt;