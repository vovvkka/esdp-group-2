import React from "react";
import {useSelector} from "react-redux";

const Contacts = () => {
    const contacts = useSelector((state) => state.contacts.contacts);

    const generateMapUrl = () => {
        const place = contacts?.address[0].split("(").join(" ").split(")").join(" ").split(" ").join("+");

        return `https://maps.google.com/maps?q=${place}=UTF8&iwloc=&output=embed`;
    };

    return (
        <div className="contacts">
            <div className="container">
                <div className="contacts__block">
                    <div className="contacts__title-block">
                        <h2 className="contacts__title">Контакты</h2>
                        <div className="contacts__location">
                            Главная —{" "}
                            <span className="contacts__location-page"> Контакты</span>
                        </div>
                    </div>

                    <div className="contacts__map-block">
                        {/* eslint-disable-next-line jsx-a11y/iframe-has-title */}
                        <iframe
                            className="contacts__iframe"
                            width="850"
                            height="475"
                            src={generateMapUrl()}
                        />
                    </div>

                    <div className="contacts__info">
                        <div className="contacts__info-block">
                            <p className="contacts__info-title">Телефон</p>
                            <p className="contacts__info-sub-title">{contacts?.phone}</p>
                        </div>
                        <div className="contacts__info-block">
                            <p className="contacts__info-title">E-mail</p>
                            <p className="contacts__info-sub-title">{contacts?.email}</p>
                        </div>
                        <div className="contacts__info-block">
                            <p className="contacts__info-title">Адрес</p>
                            <p className="contacts__info-sub-title">{contacts?.address[0]}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contacts;
