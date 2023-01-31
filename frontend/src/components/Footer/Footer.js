import React from 'react';
import {Link, NavLink, useLocation} from "react-router-dom";
import logo from "../../assets/logo.png";
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import {useSelector} from "react-redux";

const Footer = () => {
    const location = useLocation();
    const contacts = useSelector(state => state.contacts.contacts);
    const user = useSelector(state => state.users.user);

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
                        <Link to={`${user?.role === 'admin' || user?.role === 'cashier' ? `/${user.role}` : '/login'}`} className='footer__cabinet'>Для сотрудников</Link>
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
                        <li className='footer__list-element'>
                            <NavLink to='/catalog' className='footer__link'
                                     activeClassName='footer__link-active'>Каталог</NavLink>
                        </li>
                    </ul>

                    <div className="footer__contacts">
                        <a href={'tel:' + contacts?.phone} className='number'>{contacts?.phone[0]}</a>
                        <p className="email">hello@womazing.com</p>
                        <div className="footer__social">
                            <a href="https://instagram.com/tay_tay_karakol?igshid=YmMyMTA2M2Y="
                               className="footer__icon" target="_blank" rel="noreferrer">
                                <InstagramIcon fontSize="large"/>
                            </a>

                            <a href="https://wa.me/996555911343" className="footer__icon" target="_blank" rel="noreferrer">
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