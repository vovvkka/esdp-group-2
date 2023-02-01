import React, { useEffect, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchXReport,
    fetchZReport,
} from "../../store/actions/operationsActions";
import { clearReport } from "../../store/slices/operationsSlice";

const Receipt = ({
    xReport,
    zReport,
    displayName,
    shiftNumber,
    shiftId,
    receipt,
    handleClose,
    openShift,
    purchaseActive,
    insertActive,
    withdrawActive,
}) => {
    const dispatch = useDispatch();
    const componentRef = useRef();
    const xReportInfo = useSelector((state) => state.operations.xReport);
    const zReportInfo = useSelector((state) => state.operations.zReport);
    const shift = useSelector((state) => state.shifts.shift);
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    useEffect(() => {
        return () => {
            dispatch(clearReport());
        };
    }, [dispatch]);

    useEffect(() => {
        if (shiftId && zReport) {
            dispatch(fetchZReport(shiftId));
        }
    }, [dispatch, zReport, shiftId]);

    useEffect(() => {
        if (shift && xReport) {
            dispatch(fetchXReport(shift._id));
        }
    }, [dispatch, shift, xReport]);

    let children;

    if (xReport) {
        children = (
            <div className="receipt__ticket">
                <div className="receipt__header">
                    <p className="receipt__center-text receipt__center-text--upper">
                        X-отчет
                    </p>
                    <p className="receipt__center-text">
                        {new Date().toLocaleString()}
                    </p>
                    <hr className="receipt__line" />
                    <p className="receipt__center-text">
                        Магазин для новорожденных <br /> "ТАЙ-ТАЙ"
                    </p>
                    <p className="receipt__center-text">
                        г.Каракол, ул.Карла Маркса б/н <br />
                        ТЦ "Мега Молл", 2 этаж
                    </p>
                    <hr className="receipt__line" />
                    <div className="receipt__flex">
                        <p className="receipt__text">Кассир:</p>
                        <p className="receipt__text">
                            {xReportInfo?.shift.cashier.displayName}
                        </p>
                    </div>
                    <div className="receipt__flex">
                        <p className="receipt__text">Смена:</p>
                        <p className="receipt__text">
                            {xReportInfo?.shift.shiftNumber}
                        </p>
                    </div>
                    <hr className="receipt__line" />
                    <p className="receipt__center-text receipt__center-text--upper">
                        Смена
                    </p>
                    <hr className="receipt__line receipt__line--dotted" />
                    <p className="receipt__center-text receipt__center-text--upper">
                        Продажа
                    </p>
                    <hr className="receipt__line receipt__line--dotted" />
                    <div className="receipt__flex">
                        <p className="receipt__text">Чеки:</p>
                        <p className="receipt__text">{xReportInfo?.salesNum}</p>
                    </div>
                    <div className="receipt__flex">
                        <p className="receipt__text">Сумма:</p>
                        <p className="receipt__text">
                            {xReportInfo?.salesTotal.toFixed(2)}
                        </p>
                    </div>
                    <div className="receipt__flex">
                        <p className="receipt__text">НДС:</p>
                        <p className="receipt__text">0.00</p>
                    </div>
                    <div className="receipt__flex">
                        <p className="receipt__text">НоП:</p>
                        <p className="receipt__text">0.00</p>
                    </div>
                    <hr className="receipt__line receipt__line--dotted" />
                    <p className="receipt__center-text receipt__center-text--upper">
                        Возврат продажи
                    </p>
                    <hr className="receipt__line receipt__line--dotted" />
                    <div className="receipt__flex">
                        <p className="receipt__text">Чеки:</p>
                        <p className="receipt__text">
                            {xReportInfo?.returnsNum}
                        </p>
                    </div>
                    <div className="receipt__flex">
                        <p className="receipt__text">Сумма:</p>
                        <p className="receipt__text">
                            {xReportInfo?.returnsTotal.toFixed(2)}
                        </p>
                    </div>
                    <div className="receipt__flex">
                        <p className="receipt__text">НДС:</p>
                        <p className="receipt__text">0.00</p>
                    </div>
                    <div className="receipt__flex">
                        <p className="receipt__text">НоП:</p>
                        <p className="receipt__text">0.00</p>
                    </div>
                    <hr className="receipt__line receipt__line--dotted" />
                    <p className="receipt__center-text receipt__center-text--upper">
                        Общая итоговая сумма
                    </p>
                    <hr className="receipt__line receipt__line--dotted" />
                    <div className="receipt__flex">
                        <p className="receipt__text">Наличные:</p>
                        <p className="receipt__text">
                            {(
                                xReportInfo?.salesTotal -
                                xReportInfo?.returnsTotal
                            ).toFixed(2)}
                        </p>
                    </div>
                    <div className="receipt__flex">
                        <p className="receipt__text">Итого:</p>
                        <p className="receipt__text">
                            {(
                                xReportInfo?.salesTotal -
                                xReportInfo?.returnsTotal
                            ).toFixed(2)}
                        </p>
                    </div>
                    <hr className="receipt__line receipt__line--dotted" />
                    <div className="receipt__flex">
                        <p className="receipt__text">Наличные в кассе</p>
                        <p className="receipt__text">
                            {xReportInfo?.cash.toFixed(2)}
                        </p>
                    </div>
                    <hr className="receipt__line receipt__line--dotted" />
                </div>
            </div>
        );
    } else if (zReport) {
        children = (
            <div className="receipt__ticket">
                <div className="receipt__header">
                    <p className="receipt__center-text receipt__center-text--upper">
                        Дубликат
                    </p>
                    <p className="receipt__center-text receipt__center-text--upper">
                        Z-отчет
                    </p>
                    <p className="receipt__center-text">
                        {new Date(
                            zReportInfo?.shift.updatedAt
                        ).toLocaleString()}
                    </p>
                    <hr className="receipt__line" />
                    <p className="receipt__center-text">
                        Магазин для новорожденных <br /> "ТАЙ-ТАЙ"
                    </p>
                    <p className="receipt__center-text">
                        г.Каракол, ул.Карла Маркса б/н <br />
                        ТЦ "Мега Молл", 2 этаж
                    </p>
                    <hr className="receipt__line" />
                    <div className="receipt__flex">
                        <p className="receipt__text">Кассир:</p>
                        <p className="receipt__text">
                            {zReportInfo?.shift.cashier.displayName}
                        </p>
                    </div>
                    <div className="receipt__flex">
                        <p className="receipt__text">Смена:</p>
                        <p className="receipt__text">
                            {zReportInfo?.shift.shiftNumber}
                        </p>
                    </div>
                    <hr className="receipt__line" />
                    <p className="receipt__center-text receipt__center-text--upper">
                        Смена
                    </p>
                    <hr className="receipt__line receipt__line--dotted" />
                    <p className="receipt__center-text receipt__center-text--upper">
                        Продажа
                    </p>
                    <hr className="receipt__line receipt__line--dotted" />
                    <div className="receipt__flex">
                        <p className="receipt__text">Чеки:</p>
                        <p className="receipt__text">{zReportInfo?.salesNum}</p>
                    </div>
                    <div className="receipt__flex">
                        <p className="receipt__text">Сумма:</p>
                        <p className="receipt__text">
                            {zReportInfo?.salesTotal.toFixed(2)}
                        </p>
                    </div>
                    <div className="receipt__flex">
                        <p className="receipt__text">НДС:</p>
                        <p className="receipt__text">0.00</p>
                    </div>
                    <div className="receipt__flex">
                        <p className="receipt__text">НоП:</p>
                        <p className="receipt__text">0.00</p>
                    </div>
                    <hr className="receipt__line receipt__line--dotted" />
                    <p className="receipt__center-text receipt__center-text--upper">
                        Возврат продажи
                    </p>
                    <hr className="receipt__line receipt__line--dotted" />
                    <div className="receipt__flex">
                        <p className="receipt__text">Чеки:</p>
                        <p className="receipt__text">
                            {zReportInfo?.returnsNum}
                        </p>
                    </div>
                    <div className="receipt__flex">
                        <p className="receipt__text">Сумма:</p>
                        <p className="receipt__text">
                            {zReportInfo?.returnsTotal.toFixed(2)}
                        </p>
                    </div>
                    <div className="receipt__flex">
                        <p className="receipt__text">НДС:</p>
                        <p className="receipt__text">0.00</p>
                    </div>
                    <div className="receipt__flex">
                        <p className="receipt__text">НоП:</p>
                        <p className="receipt__text">0.00</p>
                    </div>
                    <hr className="receipt__line receipt__line--dotted" />
                    <p className="receipt__center-text receipt__center-text--upper">
                        Общая итоговая сумма
                    </p>
                    <hr className="receipt__line receipt__line--dotted" />
                    <div className="receipt__flex">
                        <p className="receipt__text">Наличные:</p>
                        <p className="receipt__text">
                            {(
                                zReportInfo?.salesTotal -
                                zReportInfo?.returnsTotal
                            ).toFixed(2)}
                        </p>
                    </div>
                    <div className="receipt__flex">
                        <p className="receipt__text">Итого:</p>
                        <p className="receipt__text">
                            {(
                                zReportInfo?.salesTotal -
                                zReportInfo?.returnsTotal
                            ).toFixed(2)}
                        </p>
                    </div>
                    <hr className="receipt__line" />
                    <p className="receipt__center-text receipt__center-text--upper">
                        Необнуляемые суммы на конец смены
                    </p>
                    <hr className="receipt__line receipt__line--dotted" />
                    <p className="receipt__center-text receipt__center-text--upper">
                        Продажа
                    </p>
                    <hr className="receipt__line receipt__line--dotted" />
                    <div className="receipt__flex">
                        <p className="receipt__text">Чеки</p>
                        <p className="receipt__text">
                            {zReportInfo?.report.salesCount ? zReportInfo?.report.salesCount : '0.00'}
                        </p>
                    </div>
                    <div className="receipt__flex">
                        <p className="receipt__text">Сумма</p>
                        <p className="receipt__text">
                            {zReportInfo?.report.salesTotal ? zReportInfo?.report.salesTotal.toFixed(2): '0.00'}
                        </p>
                    </div>
                </div>
            </div>
        );
    } else if (insertActive || withdrawActive) {
        children = (
            <div className="receipt__ticket">
                <div className="receipt__header">
                    <p className="receipt__center-text receipt__center-text--upper">
                        Дубликат
                    </p>
                    <p className="receipt__center-text receipt__center-text--upper">
                        {insertActive ? 'Внесение наличных' : 'Изъятие наличных'}
                    </p>
                    <p className="receipt__center-text">
                        {new Date(receipt?.dateTime).toLocaleString()}
                    </p>
                    <hr className="receipt__line" />
                    <p className="receipt__center-text">
                        Магазин для новорожденных <br /> "ТАЙ-ТАЙ"
                    </p>
                    <p className="receipt__center-text">
                        г.Каракол, ул.Карла Маркса б/н <br />
                        ТЦ "Мега Молл", 2 этаж
                    </p>
                    <hr className="receipt__line" />
                    <div className="receipt__flex">
                        <p className="receipt__text">Кассир:</p>
                        <p className="receipt__text">
                            {receipt?.shift.cashier.displayName}
                        </p>
                    </div>
                    <div className="receipt__flex">
                        <p className="receipt__text">Смена:</p>
                        <p className="receipt__text">
                            {receipt?.shift.shiftNumber}
                        </p>
                    </div>
                    <hr className="receipt__line receipt__line--dotted" />
                    <p className="receipt__center-text receipt__center-text--upper">
                        {insertActive ? 'Внесение наличных' : 'Изъятие наличных'}
                    </p>
                    <hr className="receipt__line receipt__line--dotted" />
                    <div className="receipt__flex">
                        <p className="receipt__text">Сумма:</p>
                        <p className="receipt__text">
                            {receipt?.additionalInfo.amountOfMoney} сом
                        </p>
                    </div>
                    <div className="receipt__flex">
                        <p className="receipt__text">Касса:</p>
                        <p className="receipt__text">
                            {receipt?.additionalInfo.cash} сом
                        </p>
                    </div>
                    <hr className="receipt__line receipt__line" />
                </div>
            </div>
        );
    } else if (openShift) {
        children = (
            <div className="receipt__ticket">
                <div className="receipt__header">
                    <p className="receipt__center-text receipt__center-text--upper">
                        Дубликат
                    </p>
                    <p className="receipt__center-text receipt__center-text--upper">
                        Открытие смены
                    </p>
                    <p className="receipt__center-text">
                        {new Date(receipt?.dateTime).toLocaleString()}
                    </p>
                    <hr className="receipt__line" />
                    <p className="receipt__center-text">
                        Магазин для новорожденных <br /> "ТАЙ-ТАЙ"
                    </p>
                    <p className="receipt__center-text">
                        г.Каракол, ул.Карла Маркса б/н <br />
                        ТЦ "Мега Молл", 2 этаж
                    </p>
                    <hr className="receipt__line" />
                    <div className="receipt__flex">
                        <p className="receipt__text">Кассир:</p>
                        <p className="receipt__text">
                            {receipt?.shift.cashier.displayName}
                        </p>
                    </div>
                    <div className="receipt__flex">
                        <p className="receipt__text">Смена:</p>
                        <p className="receipt__text">
                            {receipt?.shift.shiftNumber}
                        </p>
                    </div>
                </div>
            </div>
        );
    } else {
        children = (
            <>
                <div className="receipt__ticket">
                    {purchaseActive && (
                        <p className="receipt__center-text receipt__center-text--upper">
                            Дубликат
                        </p>
                    )}
                    <div className="receipt__header">
                        <p className="receipt__center-text">
                            Магазин для новорожденных <br /> "ТАЙ-ТАЙ"
                        </p>
                        <p className="receipt__center-text">
                            г.Каракол, ул.Карла Маркса б/н <br />
                            ТЦ "Мега Молл", 2 этаж
                        </p>
                    </div>

                    <div className="receipt__main">
                        <div className="receipt__about-cashier">
                            <div className="receipt__flex">
                                <p className="receipt__text">
                                    Чек №{receipt.operationNumber}
                                </p>
                                <p className="receipt__text">
                                    {new Date(
                                        receipt.dateTime
                                    ).toLocaleString()}
                                </p>
                            </div>
                            <div className="receipt__flex">
                                <p className="receipt__text">Кассир:</p>
                                <p className="receipt__text">
                                    {purchaseActive
                                        ? receipt.shift.cashier.displayName
                                        : displayName}
                                </p>
                            </div>
                            <div className="receipt__flex">
                                <p className="receipt__text">Смена:</p>
                                <p className="receipt__text">
                                    {purchaseActive
                                        ? receipt.shift.shiftNumber
                                        : shiftNumber}
                                </p>
                            </div>
                        </div>

                        <div className="receipt__products">
                            <div className="receipt__product-item ">
                                <div className="receipt__flex">
                                    <p className="receipt__text">[Штрих код]</p>
                                    <p className="receipt__text">
                                        Название товара
                                    </p>
                                </div>

                                <div className="receipt__flex">
                                    <p className="receipt__text">
                                        Кол-во * цена
                                    </p>
                                    <p className="receipt__text">сумма</p>
                                </div>
                            </div>

                            {receipt?.additionalInfo?.completePurchaseInfo?.map(
                                (product) => (
                                    <div
                                        className="receipt__product-item"
                                        key={product._id}
                                    >
                                        <div className="receipt__flex">
                                            <p className="receipt__text">
                                                {product.barcode}
                                            </p>
                                            <p className="receipt__text">
                                                {product.title}
                                            </p>
                                        </div>

                                        <div className="receipt__flex">
                                            <p className="receipt__text">
                                                {product.quantity} *{" "}
                                                {product.price}{" "}
                                                {product.discount
                                                    ? `- ${product.discount}%`
                                                    : null}
                                            </p>
                                            <p className="receipt__text">
                                                {product.discount
                                                    ? product.quantity *
                                                          product.price -
                                                      (product.quantity *
                                                          product.price *
                                                          product.discount) /
                                                          100
                                                    : product.quantity *
                                                      product.price}
                                            </p>
                                        </div>
                                    </div>
                                )
                            )}
                        </div>
                    </div>

                    <div className="receipt__total">
                        <div>
                            <div className="receipt__flex">
                                <p>общая сумма:</p>
                                <p>
                                    {receipt?.additionalInfo?.amountOfMoney +
                                        receipt?.additionalInfo?.discount}
                                </p>
                            </div>
                            <div className="receipt__flex">
                                <p>скидка:</p>
                                <p>{receipt?.additionalInfo?.discount}</p>
                            </div>
                        </div>
                        <p className="receipt__center-text total">
                            <b>
                                Итого: {receipt?.additionalInfo?.amountOfMoney}{" "}
                                сом
                            </b>
                        </p>
                    </div>
                    {!purchaseActive && (
                        <div className="receipt__footer">
                            <p className="receipt__center-text">
                                <b>Спасибо за покупку!</b>
                            </p>
                        </div>
                    )}
                </div>
            </>
        );
    }

    return (
        <div className="receipt" ref={componentRef}>
            {children}
            <div className="receipt__flex">
                <button
                    id="btnPrint"
                    className="hidden-print button receipt__button"
                    onClick={handlePrint}
                >
                    Печать
                </button>
                <button
                    id="btnPrint"
                    className="hidden-print button receipt__button"
                    onClick={handleClose}
                >
                    Закрыть
                </button>
            </div>
        </div>
    );
};

export default Receipt;
