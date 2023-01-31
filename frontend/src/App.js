import React, {useEffect} from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import Layout from "./components/UI/Layout/Layout";
import Login from "./containers/Login/Login";
import AdminAddCategory from "./containers/AdminAddCategory/AdminAddCategory";
import AdminAddProduct from "./containers/AdminAddProduct/AdminAddProduct";
import AdminEditProduct from "./containers/AdminEditProduct/AdminEditProduct";
import AdminCategories from "./containers/AdminCategories/AdminCategories";
import AdminEditCategory from "./containers/AdminEditCategory/AdminEditCategory";
import AdminMainPage from "./containers/AdminMainPage/AdminMainPage";
import AdminProducts from "./containers/AdminProducts/AdminProducts";
import CashierOpenShift from "./containers/CashierOpenShift/CashierOpenShift";
import AdminCashiers from "./containers/AdminCashiers/AdminCashiers";
import MainPage from "./containers/MainPage/MainPage";
import AdminAddCashier from "./containers/AdminAddCashier/AdminAddCashier";
import AdminAddNews from "./containers/AdminAddNews/AdminAddNews";
import AdminEditNews from "./containers/AdminEditNews/AdminEditNews";
import AdminEditCashier from "./containers/AdminEditCashier/AdminEditCashier";
import NewsPage from "./containers/NewsPage/NewsPage";
import AddOrderProduct from "./containers/AddOrderProduct/AddOrderProduct";
import CustomerCart from "./containers/CustomerCart/CustomerCart";
import NewsInfo from "./containers/NewsInfo/NewsInfo";
import CashierPanel from "./containers/CashierPanel/CashierPanel";
import AdminOrders from "./containers/AdminOrders/AdminOrders";
import './scss/app.scss';
import SingleProductPage from "./containers/SingleProductPage/SingleProductPage";
import SuccessOrderPlace from "./containers/SuccessOrderPlace/SuccessOrderPlace";
import {getContacts} from "./store/actions/contactsActions";
import Contacts from "./containers/Contacts/Contacts";
import AdminSettings from "./containers/AdminSettings/AdminSettings";
import AdminEditContacts from "./containers/AdminEditContacts/AdminEditContacts";
import AdminEditProfile from "./containers/AdminEditProfile/AdminEditProfile";
import AdminResetPassword from "./containers/AdminResetPassword/AdminResetPassword";
import AdminClients from "./containers/AdminClients/AdminClients";
import AdminAddClient from "./containers/AdminAddClient/AdminAddClient";
import AdminNews from "./containers/AdminNews/AdminNews";
import AdminJournal from "./containers/AdminJournal/AdminJournal";
import AdminEditClient from "./containers/AddminEditClient/AdminEditClient";
import ForgotPassword from "./containers/ForgotPassword/ForgotPassword";
import ResetPassword from "./containers/ResetPassword/ResetPassword";
import SearchPage from "./containers/SearchPage/SearchPage";
import ShopCatalog from "./containers/ShopCatalog/ShopCatalog";
import Purchases from "./containers/Purchases/Purchases";
import ReportZ from "./containers/ReportZ/ReportZ";
import Reports from "./containers/Reports/Reports";
import ScrollToTop from "./utils/ScrollToTop";

const ProtectedRoute = ({isAllowed, redirectTo, ...props}) => {
    return isAllowed ? <Route {...props} /> : <Redirect to={redirectTo?redirectTo:'/'}/>;
};

const LoginRedirectRoute = ({user, redirectTo, ...props}) => {
    if (!user) {
        return <Route {...props} />;
    }

    if (user.role === "admin") {
        return <Redirect to="/admin"/>;
    }

    if (user.role === "cashier") {
        return <Redirect to="/cashier"/>;
    }
};

const CashierRedirectRoute = ({user,shift, ...props}) => {
    if (!user) {
        return <Redirect to="/"/>;
    }
    if (user.role==='admin') {
        return <Redirect to="/admin"/>;
    }

    if (shift&&props.path==='/cashier') {
        return <Route {...props}/>;
    }else if(!shift&&props.path==='/cashier') {
        return <Redirect to="/cashier/open-shift"/>;
    }

    if (!shift&&props.path==='/cashier/open-shift') {
        return <Route {...props}/>;
    }else if(shift&&props.path==='/cashier/open-shift'){
        return <Redirect to="/cashier"/>
    }
};

const App = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.users.user);
    const shift = useSelector((state) => state.shifts.shift);

    useEffect(() => {
        dispatch(getContacts());
    }, [dispatch]);

    return (
        <Layout>
            <ScrollToTop/>
            <Switch>
                <Route path="/" exact component={MainPage}/>
                <Route path="/news" exact component={NewsPage}/>
                <Route path="/cart" exact component={CustomerCart}/>
                <Route path="/catalog" exact component={ShopCatalog}/>
                <Route path="/news/:id" component={NewsInfo}/>
                <Route path="/products/:id" component={SingleProductPage}/>
                <Route path="/order-place" exact component={AddOrderProduct}/>
                <Route path="/order-place/success" exact component={SuccessOrderPlace}/>
                <Route path="/news/:id" component={NewsInfo}/>
                <Route path="/contacts" component={Contacts}/>
                <Route path="/search" component={SearchPage}/>
                <Route path="/forgot-password" exact component={ForgotPassword}/>
                <Route path="/reset-password/:id/:token" exact component={ResetPassword}/>
                <LoginRedirectRoute user={user} path="/login" component={Login}/>

                <ProtectedRoute
                    isAllowed={user?.role==='admin'}
                    path="/admin"
                    exact
                    component={AdminMainPage}
                />

                <ProtectedRoute
                    isAllowed={user?.role==='admin'}
                    path="/admin/categories"
                    exact
                    component={AdminCategories}
                />

                <ProtectedRoute
                    isAllowed={user?.role==='admin'}
                    path="/admin/clients"
                    exact
                    component={AdminClients}
                />

                <ProtectedRoute
                    isAllowed={user?.role==='admin'}
                    path="/admin/clients/add-new-client"
                    exact
                    component={AdminAddClient}
                />
                <ProtectedRoute
                    isAllowed={user?.role==='admin'}
                    path="/admin/clients/edit-client/:id"
                    exact
                    component={AdminEditClient}
                />

                <ProtectedRoute
                    isAllowed={user}
                    path="/admin/journal"
                    exact
                    component={AdminJournal}
                />
                <ProtectedRoute
                    isAllowed={user}
                    path="/admin/purchases"
                    exact
                    component={Purchases}
                />

                <ProtectedRoute
                    isAllowed={user&&!shift}
                    path="/admin/report-z"
                    redirectTo='/login'
                    exact
                    component={ReportZ}
                />

                <ProtectedRoute
                    isAllowed={user&&!shift}
                    path="/admin/reports"
                    redirectTo='/login'
                    exact
                    component={Reports}
                />

                <ProtectedRoute
                    isAllowed={user?.role==='admin'}
                    path="/admin/categories/edit-category/:id"
                    component={AdminEditCategory}
                />

                <ProtectedRoute
                    isAllowed={user?.role==='admin'}
                    path="/admin/categories/add-new-category"
                    component={AdminAddCategory}
                />

                <ProtectedRoute
                    isAllowed={user?.role==='admin'}
                    path="/admin/products"
                    exact
                    component={AdminProducts}
                />

                <ProtectedRoute
                    isAllowed={user?.role==='admin'}
                    path="/admin/products/add-new-product"
                    component={AdminAddProduct}
                />

                <ProtectedRoute
                    isAllowed={user?.role==='admin'}
                    path="/admin/products/edit-product/:id"
                    component={AdminEditProduct}
                />

                <ProtectedRoute
                    isAllowed={user?.role==='admin'}
                    path="/admin/news/edit-news/:id"
                    component={AdminEditNews}
                />

                <ProtectedRoute
                    isAllowed={user?.role==='admin'}
                    exact
                    path="/admin/cashiers"
                    component={AdminCashiers}
                />

                <ProtectedRoute
                    isAllowed={user?.role==='admin'}
                    path="/admin/cashiers/add-new-cashier"
                    component={AdminAddCashier}
                />

                <ProtectedRoute
                    isAllowed={user?.role==='admin'}
                    path="/admin/cashiers/edit-cashier/:id"
                    component={AdminEditCashier}
                />

                <ProtectedRoute
                    isAllowed={user?.role==='admin'}
                    path="/admin/orders"
                    component={AdminOrders}
                />

                <ProtectedRoute
                    isAllowed={user?.role==='admin'}
                    path="/admin/news"
                    exact
                    component={AdminNews}
                />

                <ProtectedRoute
                    isAllowed={user?.role==='admin'}
                    path="/admin/news/add-new-news"
                    component={AdminAddNews}
                />

                <ProtectedRoute
                    isAllowed={user?.role==='admin'}
                    path="/admin/settings"
                    component={AdminSettings}
                />

                <ProtectedRoute
                    isAllowed={user?.role==='admin'}
                    path="/admin/edit-contacts"
                    component={AdminEditContacts}
                />

                <ProtectedRoute
                    isAllowed={user?.role==='admin'}
                    path="/admin/edit-profile"
                    component={AdminEditProfile}
                />

                <ProtectedRoute
                    isAllowed={user?.role==='admin'}
                    path="/admin/reset-password"
                    component={AdminResetPassword}
                />

                <CashierRedirectRoute
                    user={user}
                    shift={shift}
                    path="/cashier/open-shift"
                    component={CashierOpenShift}
                />

                <CashierRedirectRoute
                    user={user}
                    shift={shift}
                    path="/cashier"
                    component={CashierPanel}
                />
            </Switch>
        </Layout>
    );
};

export default App;
