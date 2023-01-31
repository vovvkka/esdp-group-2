import React, {useEffect} from "react";
import {Link} from "react-router-dom";
import logo from "../../../assets/logo.png";
import MenuIcon from "@mui/icons-material/Menu";
import Backdrop from "../Backdrop/Backdrop";
import {useDispatch, useSelector} from "react-redux";
import InstagramIcon from "@mui/icons-material/Instagram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import {toggleSidebar} from "../../../store/slices/appSlice";

const Sidebar = () => {
    const dispatch = useDispatch();
    const sidebar = useSelector(state => state.app.sidebarOpen);
    const contacts = useSelector((state) => state.contacts.contacts);

    const showSidebar = () => dispatch(toggleSidebar());

    useEffect(() => {
        sidebar ? document.body.classList.add('no-scroll') : document.body.classList.remove('no-scroll')
    }, [sidebar]);

    return (
        <>
            <Backdrop show={sidebar} clicked={showSidebar} />
            <div className="sidebar">
                <Link to="#" className="sidebar__menu-bars">
                    <MenuIcon onClick={showSidebar} />
                </Link>
            </div>
            <nav
                className={
                    sidebar
                        ? "sidebar__nav-menu sidebar__nav-menu--active"
                        : "sidebar__nav-menu"
                }
            >
                <div className="sidebar__menu-items">
                    <p className="sidebar__close-btn" onClick={showSidebar}>
                        &times;
                    </p>
                    <div className="sidebar__logo">
                        <Link to="/" onClick={showSidebar}>
                            <img src={logo} alt="Тай-Тай" width={200} />
                        </Link>
                    </div>
                    <ul className="sidebar__list">
                        <Link to="/" onClick={showSidebar}>
                            <li>Главная</li>
                        </Link>
                        <Link to="/news" onClick={showSidebar}>
                            <li>Новости</li>
                        </Link>
                        <Link to="/contacts" onClick={showSidebar}>
                            <li>Контакты</li>
                        </Link>
                        <Link to="/catalog" onClick={showSidebar}>
                            <li>Каталог</li>
                        </Link>
                    </ul>
                    <div className="sidebar__contacts">
                        <p>{contacts?.phone[0]}</p>
                        <p>{contacts?.address[0]}</p>
                        <div>
                            <a href="https://instagram.com/tay_tay_karakol?igshid=YmMyMTA2M2Y=">
                                <InstagramIcon fontSize="large" />
                            </a>
                            <a href="https://wa.me/996555911343">
                                <WhatsAppIcon fontSize="large" />
                            </a>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Sidebar;
