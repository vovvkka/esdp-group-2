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
                        <h2 className="title">Контакты</h2>
                        <div className="location">
                            Главная —{" "}
                            <span className="location__page"> Контакты</span>
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
                            {contacts.phone.map(p => (
                                <p key={p._id} className="contacts__info-sub-title">{p}</p>
                            ))}
                        </div>
                        <div className="contacts__info-block">
                            <p className="contacts__info-title">E-mail</p>
                            {contacts.email.map(e => (
                                <p key={e._id} className="contacts__info-sub-title">{e}</p>
                            ))}
                        </div>
                        <div className="contacts__info-block">
                            <p className="contacts__info-title">Адрес</p>
                            {contacts.address.map(a => (
                                <p key={a} className="contacts__info-sub-title">{a}</p>
                            ))}

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contacts;
