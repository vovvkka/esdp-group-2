import React, {useEffect, useState} from 'react';
import logo from '../../assets/logo.png';
import {Link, NavLink, useLocation} from "react-router-dom";
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import {useDispatch, useSelector} from "react-redux";
import Carousel from "../Carousel/NewsCarousel";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {Autocomplete, Box, ClickAwayListener, TextField, Tooltip, useMediaQuery} from "@mui/material";
import {apiUrl} from "../../config";
import {setKey} from "../../store/slices/productsSlice";
import axiosApi from "../../axiosApi";
import SearchIcon from "@mui/icons-material/Search";
import {historyPush} from "../../store/actions/historyActions";
import Sidebar from "../UI/Sidebar/Sidebar";

const Header = () => {
    const user = useSelector(state => state.users.user);
    const cartProducts = useSelector(state => state.cart.products);
    const contacts = useSelector(state => state.contacts.contacts);
    const sidebar = useSelector(state => state.app.sidebarOpen);
    const location = useLocation();
    const [value, setValue] = useState(null);
    const [productsList, setProductsList] = useState([]);
    const [search, setSearch] = useState(false);
    const matches = useMediaQuery('(min-width:1160px)');
    const desktop = useMediaQuery('(min-width:1000px)');
    const dispatch = useDispatch();

    useEffect(() => {
        if (sidebar) {
            setSearch(false);
        }
    }, [sidebar]);

    const onInputChange = async (e) => {
        if (e) {
            if(e.type === 'click'){
                setSearch(false);
                setValue(null);
            }else {
                setValue(e.target.value);
                if (e.target.value?.length <= 2) {
                    return setProductsList([]);
                } else {
                    const response = await axiosApi(`/products/search?key=${e.target.value}&shop=true`);
                    const data = response.data.map(i => {
                            return {...i, label: i.title};
                        }
                    );
                    setProductsList(data);
                }
            }
        }
    };
    const onSearchClick = () => {
        if (!search && !value) {
            setSearch(true)
        } else if (search && value) {
            if (value.replace(/\s/g, '')) {
                dispatch(setKey(value));
                setProductsList([]);
                setValue(null);
                dispatch(historyPush('/search'));
                setValue(null);
                setProductsList([]);
                setSearch(false);
            } else {
                setValue(null);
            }
        } else if (!search && value) {
            if (value.replace(/\s/g, '')) {
                dispatch(setKey(value));
                setValue(null);
                setProductsList([]);
                dispatch(historyPush('/search'));
                setValue(null);
                setProductsList([]);
                setSearch(false);
            } else {
                setValue(null);
            }
        } else {
            setSearch(false);
        }
    }
    const SearchBar =
        <ClickAwayListener onClickAway={()=>setSearch(false)}>
        <Autocomplete
            sx={!matches ? {width: '92%', marginBottom: '15px', backgroundColor: 'white',position: "absolute",zIndex:'10000'} : {
                marginLeft: 'auto',
                width: '38%',
                marginBottom: '15px',
                backgroundColor: 'white',
                position: "absolute",
                left:'60%',
                top:'85px',
                zIndex:'10000'
            }}
            options={productsList}
            freeSolo
            value={{label: value ? value : ''}}
            isOptionEqualToValue={() => true}
            getOptionLabel={(option) => option.label}
            onInputChange={e => (onInputChange(e))}
            renderOption={(props, option) => (
                <Link to={`/products/${option._id}`}
                      className="product-card__overlay" {...props}>
                    <Box component="li" sx={{'& > img': {mr: 2, flexShrink: 0}}}>
                        <img
                            loading="lazy"
                            width="20"
                            src={apiUrl + '/' + option.image[0]}
                            srcSet={apiUrl + '/' + option.image[0]}
                            alt=""
                        />
                        {option.title}
                    </Box>
                </Link>

            )}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Поиск"
                    value={value}
                    autoFocus={true}
                    className="header__search"
                    inputProps={{
                        ...params.inputProps,
                        onKeyDown: (e) => {
                            if (e.key === 'Enter') {
                                e.stopPropagation();
                                if (value.replace(/\s/g, '')) {
                                    dispatch(setKey(value));
                                    dispatch(historyPush('/search'));
                                    setSearch(false);
                                    setValue(null);
                                }
                            }
                        },
                    }}
                />
            )}
        />
        </ClickAwayListener>;

    const amount = cartProducts.reduce((acc, value) => {
        return acc + value.quantity;
    }, 0);

    return (
        <div className='header'>
            <div className='container' style={{position:'relative'}}>
                {!desktop ? <div className='header__toolbar'>
                    <div className={!desktop ? 'header__logo-wrapper' : ''}>
                        <div className="header__hidden"></div>
                        <Link to="/">
                            <img className='header__logo' alt="Tay Tay logo" src={logo}/>
                        </Link>
                       <Sidebar/>
                    </div>
                    <div className='header__info'>
                        {<>
                            <LocalPhoneIcon className='header__icon header__icon--phone'/>
                            <a href={'tel:' + contacts?.phone} className='number'>{contacts?.phone[0]}</a>
                            <Tooltip title="Корзина">
                                <Link to='/cart' className='header__cart'>
                                    {amount ? <div className='header__cart-badge'>{amount}</div> : null}
                                    <ShoppingCartOutlinedIcon className='header__icon header__icon--cart'/>
                                </Link>
                            </Tooltip>
                            <SearchIcon sx={{marginLeft: '20px', cursor: "pointer"}} onClick={onSearchClick}/>
                            {search ? null : <span onClick={() => setSearch(true)} style={value ? {
                                verticalAlign: 'top',
                                marginLeft: '5px',
                                border: '1px solid black',
                                borderRadius: '5px',
                                padding: '0 5px',
                                minWidth: '55px'
                            } : null}>{value?.length > 5 ? value.slice(0, 5) + '...' : value}</span>}

                            {user?.role === 'admin' || user?.role === 'cashier' ?
                                <Tooltip title="Личный кабинет">
                                    <Link to={`/${user?.role}`} className='header__cabinet'>
                                        <LockOutlinedIcon className='header__icon header__icon--lock' fontSize='large'/>
                                    </Link>
                                </Tooltip>
                                : null}
                        </>}
                    </div>
                </div> : <div className='header__toolbar'>
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
                        <li className='header__list-element'>
                            <NavLink to='/catalog' className='header__link'
                                     activeClassName='header__link-active'>Каталог</NavLink>
                        </li>
                        <li className='header__list-element'>
                            <SearchIcon onClick={onSearchClick}/>
                        </li>
                        <li>{search ? null : <span onClick={() => setSearch(true)} style={value ? {
                            verticalAlign: 'top',
                            marginLeft: '5px',
                            border: '1px solid black',
                            borderRadius: '5px',
                            padding: '5px 10px'
                        } : null}>{value?.length > 5 ? value.slice(0, 5) + '...' : value}</span>}</li>
                    </ul>
                    <div className='header__info'>
                        {<><LocalPhoneIcon className='header__icon header__icon--phone'/>
                            <a href={'tel:' + contacts?.phone} className='number'>{contacts?.phone[0]}</a>
                            <Tooltip title="Корзина">
                                <Link to='/cart' className='header__cart'>
                                    {amount ? <div className='header__cart-badge'>{amount}</div> : null}
                                    <ShoppingCartOutlinedIcon className='header__icon header__icon--cart'/>
                                </Link>
                            </Tooltip>
                        </>}
                    </div>
                </div>}
                {search ? SearchBar : null}
                {location.pathname === '/' ? <Carousel/> : null}
            </div>
        </div>
    );
};

export default Header;