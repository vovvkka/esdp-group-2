import React from "react";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";

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
                        <h2 className="title">Контакты</h2>
                        <div className="location">
                            <Link to="/">Главная</Link>
                            <span>—</span>
                            <p className="location__page">Контакты</p>
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
                            {contacts?.phone.map((p,i) => (
                                <p key={i} className="contacts__info-sub-title">{p}</p>
                            ))}
                        </div>
                        <div className="contacts__info-block">
                            <p className="contacts__info-title">E-mail</p>
                            {contacts?.email.map((e,i) => (
                                <p key={i} className="contacts__info-sub-title">{e}</p>
                            ))}
                        </div>
                        <div className="contacts__info-block">
                            <p className="contacts__info-title">Адрес</p>
                            {contacts?.address.map((a,i) => (
                                <p key={i} className="contacts__info-sub-title">{a}</p>
                            ))}

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contacts;
