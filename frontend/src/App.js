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
import Cashiers from "./containers/Cashiers/Cashiers";

const ProtectedRoute = ({isAllowed, redirectTo, ...props}) => {
  return isAllowed ?
        <Route {...props}/> :
        <Redirect to="/"/>
};

const App = () => {
    const user = useSelector(state => state.users.user);
    return (
        <Layout>
            <Switch>
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
                    path="/cashier/open-shift"
                    component={CashierOpenShift}
                />

                <ProtectedRoute
                    isAllowed={user}
                    path="/admin/cashiers"
                    component={Cashiers}
                />

                <Route path="/login" component={Login}/>
            </Switch>
        </Layout>
    );
};

export default App;