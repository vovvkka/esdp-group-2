import React, {useState} from 'react';
import logo from '../../../assets/logo.png';
import {Link, NavLink, useLocation} from "react-router-dom";
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import {useDispatch, useSelector} from "react-redux";
import Carousel from "../Carousel/NewsCarousel";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {Autocomplete, Box, Grow, IconButton, Menu, TextField, Tooltip, useMediaQuery} from "@mui/material";
import {apiUrl} from "../../../config";
import {setKey} from "../../../store/slices/productsSlice";
import {fetchProductsSearch} from "../../../store/actions/productsActions";
import axiosApi from "../../../axiosApi";
import SearchIcon from "@mui/icons-material/Search";
import {historyPush} from "../../../store/actions/historyActions";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from '@mui/icons-material/Menu';

const Header = () => {
    const user = useSelector(state => state.users.user);
    const cartProducts = useSelector(state => state.cart.products);
    const contacts = useSelector(state => state.contacts.contacts);
    const location = useLocation();
    const [value, setValue] = useState(null);
    const [productsList, setProductsList] = useState([]);
    const [search, setSearch] = useState(false);
    const matches = useMediaQuery('(min-width:1100px)');
    const dispatch = useDispatch();

    const [anchorEl, setAnchorEl] = useState(null);

    const open = Boolean(anchorEl);
    const handleClick = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    const onInputChange = async (e) => {
        if (e.type === 'click') {
            setValue(null);
            setProductsList([]);
            setSearch(false);
        } else {
            setValue(e.target.value);
            if (e.target.value.length <= 2) {
                return setProductsList([]);
            } else {
                const response = await axiosApi(`/products/search?key=${e.target.value}`);
                const data = response.data.map(i => {
                        return {...i, label: i.title};
                    }
                );
                setProductsList(data);
            }
        }
    };
    const SearchBar = <Grow timeout={"auto"} in={search}>
        <Autocomplete
            sx={{width: '98%'}}
            options={productsList}
            freeSolo
            isOptionEqualToValue={() => true}
            selectOnFocus={true}
            clearOnEscape={true}
            onClose={() => {
                setValue(null);
                setProductsList([]);
                setSearch(false);
            }}
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
                    inputProps={{
                        ...params.inputProps,
                        onKeyDown: (e) => {
                            if (e.key === 'Enter') {
                                e.stopPropagation();
                                if (value.replace(/\s/g, '')) {
                                    dispatch(setKey(value));
                                    dispatch(fetchProductsSearch('?key=' + value));
                                    dispatch(historyPush('/search'));
                                    setSearch(false);
                                }
                            }
                        },
                    }}
                />
            )}
        />
    </Grow>;

    const amount = cartProducts.reduce((acc, value) => {
        return acc + value.quantity;
    }, 0);

    return (
        <div className='header'>
            <div className='container'>
                {!matches ? <div className='header__toolbar'>
                    <div className='header__logo-wrapper'>
                        <Link to="/">
                            <img className='header__logo' alt="Tay Tay logo" src={logo}/>
                        </Link>
                        <IconButton
                            className='header__logo-wrapper__button'
                            aria-label="more"
                            id="long-button"
                            aria-controls={open ? 'long-menu' : undefined}
                            aria-expanded={open ? 'true' : undefined}
                            aria-haspopup="true"
                            onClick={handleClick}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                        >
                            <MenuItem onClick={handleClose} component={Link} to={"/"}>Главная</MenuItem>
                            <MenuItem onClick={handleClose} component={Link} to={"/news"}>Новости</MenuItem>
                            <MenuItem onClick={handleClose} component={Link} to={"/contacts"}>Контакты</MenuItem>
                            <MenuItem onClick={handleClose} component={Link} to={"/catalog"}>Каталог</MenuItem>
                        </Menu>
                    </div>
                    {search ?
                        SearchBar
                        : null}
                    <div className='header__info'>
                        {!search ? <>
                            <LocalPhoneIcon className='header__icon header__icon--phone'/>
                            <a href={'tel:' + contacts?.phone} className='number'>{contacts?.phone[0]}</a>
                            <Tooltip title="Корзина">
                                <Link to='/cart' className='header__cart'>
                                    {amount ? <div className='header__cart-badge'>{amount}</div> : null}
                                    <ShoppingCartOutlinedIcon className='header__icon header__icon--cart'/>
                                </Link>
                            </Tooltip>
                            <Tooltip title="Поиск">
                                <SearchIcon sx={{marginLeft:'20px'}} onClick={() => setSearch(true)}/>
                            </Tooltip>
                            {user?.role === 'admin' || user?.role === 'cashier' ?
                                <Tooltip title="Личный кабинет">
                                    <Link to={`/${user?.role}`} className='header__cabinet'>
                                        <LockOutlinedIcon className='header__icon header__icon--lock' fontSize='large'/>
                                    </Link>
                                </Tooltip>
                                : null}
                        </> : null}
                    </div>
                </div> : <div className='header__toolbar'>
                    <Link to="/">
                        <img className='header__logo' alt="Tay Tay logo" src={logo}/>
                    </Link>
                    {search ?
                        SearchBar
                        :
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
                            <Tooltip title="Поиск">
                                <li className='header__list-element'>
                                    <SearchIcon onClick={() => setSearch(true)}/>
                                </li>
                            </Tooltip>
                        </ul>}
                    <div className='header__info'>
                        {!search ? <><LocalPhoneIcon className='header__icon header__icon--phone'/>
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
                        </> : null}
                    </div>
                </div>}
                {location.pathname === '/' ? <Carousel/> : null}
            </div>
        </div>
    );
};

export default Header;