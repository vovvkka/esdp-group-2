import React from 'react';
import {Link, NavLink, useLocation} from "react-router-dom";
import logo from "../../../assets/logo.png";
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

const Footer = () => {
    const location = useLocation();

    if (location.pathname.includes('admin') || location.pathname.includes('cashier')) {
        return <></>;
    }

    return (
        <div className="footer">
            <div className="container">
                <div className="footer__toolbar">
                    <div className="footer__logo-block">
                        <Link to="/">
                            <img className='footer__logo' alt="Tay Tay logo" src={logo}/>
                        </Link>

                        <p className="footer__rights">© Все права защищены</p>
                    </div>

                    <ul className="footer__list">
                        <li className='footer__list-element'>
                            <NavLink to='/' className='footer__link' activeClassName='footer__link-active'
                                     exact>Главная</NavLink>
                        </li>
                        <li className='footer__list-element'>
                            <NavLink to='/news' className='footer__link'
                                     activeClassName='footer__link-active'>Новости</NavLink>
                        </li>
                        <li className='footer__list-element'>
                            <NavLink to='/contacts' className='footer__link'
                                     activeClassName='footer__link-active'>Контакты</NavLink>
                        </li>
                    </ul>

                    <div className="footer__contacts">
                        <p className='number'>+996 (555) 500 500</p>
                        <p className="email">hello@womazing.com</p>

                        <div className="footer__social">
                            <a href="https://instagram.com/tay_tay_karakol?igshid=YmMyMTA2M2Y="
                               className="footer__icon">
                                <InstagramIcon fontSize="large"/>
                            </a>

                            <a href="https://wa.me/996555911343" className="footer__icon">
                                <WhatsAppIcon fontSize="large"/>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;