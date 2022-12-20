import React from 'react';
import logo from '../../../assets/logo.png';
import {Link, NavLink, useLocation} from "react-router-dom";
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import {useSelector} from "react-redux";
import Carousel from "../Carousel/NewsCarousel";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import SearchIcon from '@mui/icons-material/Search';
import {Tooltip} from "@mui/material";

const Header = () => {
    const user = useSelector(state => state.users.user);
    const cartProducts = useSelector(state => state.cart.products);
    const contacts = useSelector(state => state.contacts.contacts);
    const location = useLocation();

    const amount = cartProducts.reduce((acc, value) => {
        return acc + value.quantity;
    }, 0);

    return (
        <div className='header'>
            <div className='container'>
                <div className='header__toolbar'>
                    <Link to="/">
                        <img className='header__logo' alt="Tay Tay logo" src={logo}/>
                    </Link>
                    <ul className='header__list'>
                        <li className='header__list-element'>
                            <NavLink to='/' className='header__link' activeClassName='header__link-active'
                                     exact>Главная</NavLink>
                        </li>
                        <li className='header__list-element'>
                            <NavLink to='/news' className='header__link'
                                     activeClassName='header__link-active'>Новости</NavLink>
                        </li>
                        <li className='header__list-element'>
                            <NavLink to='/contacts' className='header__link'
                                     activeClassName='header__link-active'>Контакты</NavLink>
                        </li>
                        <Tooltip title="Поиск">
                            <li className='header__list-element'>
                                <NavLink to='/search' className='header__link'
                                         activeClassName='header__link-active'><SearchIcon/></NavLink>
                            </li>
                        </Tooltip>
                    </ul>
                    <div className='header__info'>
                        <LocalPhoneIcon className='header__icon header__icon--phone'/>
                        <a href={'tel:' + contacts?.phone} className='number'>{contacts?.phone[0]}</a>
                        <Tooltip title="Корзина">
                            <Link to='/cart' className='header__cart'>
                                {amount ? <div className='header__cart-badge'>{amount}</div> : null}
                                <ShoppingCartOutlinedIcon className='header__icon header__icon--cart'/>
                            </Link>
                        </Tooltip>
                        {user?.role === 'admin' || user?.role === 'cashier' ?
                            <Tooltip title="Личный кабинет">
                                <Link to={`/${user?.role}`} className='header__cabinet'>
                                    <LockOutlinedIcon className='header__icon header__icon--lock' fontSize='large'/>
                                </Link>
                            </Tooltip>
                            : null}
                    </div>
                </div>
                {location.pathname === '/' ? <Carousel/> : null}
            </div>
        </div>
    );
};

export default Header;