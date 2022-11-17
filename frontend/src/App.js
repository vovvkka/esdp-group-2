import React from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import Layout from "./components/UI/Layout/Layout";
import Login from "./containers/Login/Login";
import AdminAddCategory from "./containers/AdminAddCategory/AdminAddCategory";
import AdminAddProduct from "./containers/AdminAddProduct/AdminAddProduct";
import AdminEditProduct from "./containers/AdminEditProduct/AdminEditProduct";
import AdminCategories from "./containers/AdminCategories/AdminCategories";
import AdminEditCategory from "./containers/AdminEditCategory/AdminEditCategory";
import AdminPanel from "./containers/AdminPanel/AdminPanel";
import AdminProducts from "./containers/AdminProducts/AdminProducts";
import {useSelector} from "react-redux";
import CashierOpenShift from "./containers/CashierOpenShift/CashierOpenShift";
import AdminCashiers from "./containers/AdminCashiers/AdminCashiers";
import MainPage from "./containers/MainPage/MainPage";
import AdminAddCashier from "./containers/AdminAddCashier/AdminAddCashier";
import AdminAddNews from "./containers/AdminAddNews/AdminAddNews";
import AdminEditNews from "./containers/AdminEditNews/AdminEditNews";
import AdminEditCashier from "./containers/AdminEditCashier/AdminEditCashier";
import NewsPage from "./containers/NewsPage/NewsPage";

const ProtectedRoute = ({isAllowed, redirectTo, ...props}) => {
    return isAllowed ?
        <Route {...props}/> :
        <Redirect to="/"/>
};

const LoginRedirectRoute = ({user, redirectTo, ...props}) => {
    if (!user) {
        return <Route {...props}/>;
    }

    if (user.role === 'admin') {
        return <Redirect to="/admin"/>;
    }

    if (user.role === 'cashier') {
        return <Redirect to="/cashier"/>;
    }
};

const App = () => {
    const user = useSelector(state => state.users.user);
    return (
        <Layout>
            <Switch>
                <Route path="/" exact component={MainPage}/>
                <Route path="/news" exact component={NewsPage}/>
                <ProtectedRoute
                    isAllowed={user}
                    path="/admin"
                    exact
                    component={AdminPanel}
                />

                <ProtectedRoute
                    isAllowed={user}
                    path="/admin/categories"
                    exact
                    component={AdminCategories}
                />

                <ProtectedRoute
                    isAllowed={user}
                    path="/admin/categories/edit-category/:id"
                    component={AdminEditCategory}
                />

                <ProtectedRoute
                    isAllowed={user}
                    path="/admin/categories/add-new-category"
                    component={AdminAddCategory}
                />

                <ProtectedRoute
                    isAllowed={user}
                    path="/admin/products"
                    exact
                    component={AdminProducts}
                />

                <ProtectedRoute
                    isAllowed={user}
                    path="/admin/products/add-new-product"
                    component={AdminAddProduct}
                />

                <ProtectedRoute
                    isAllowed={user}
                    path="/admin/products/edit-product/:id"
                    component={AdminEditProduct}
                />

                <ProtectedRoute
                    isAllowed={user}
                    path="/admin/news/add-news"
                    component={AdminAddNews}
                />

                <ProtectedRoute
                    isAllowed={user}
                    path="/admin/news/edit-news/:id"
                    component={AdminEditNews}
                />

                <ProtectedRoute
                    isAllowed={user}
                    exact
                    path="/admin/cashiers"
                    component={AdminCashiers}
                />

                <ProtectedRoute
                    isAllowed={user}
                    path="/admin/cashiers/add-new-cashier"
                    component={AdminAddCashier}
                />

                <ProtectedRoute
                    isAllowed={user}
                    path="/admin/cashiers/edit-cashier/:id"
                    component={AdminEditCashier}
                />

                <ProtectedRoute
                    isAllowed={user}
                    path="/cashier/open-shift"
                    component={CashierOpenShift}
                />

                <LoginRedirectRoute
                    user={user}
                    path="/login"
                    component={Login}
                />
            </Switch>
        </Layout>
    );
};

export default App;
