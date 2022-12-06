import React, { useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
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
import AdminAddSubCategory from "./containers/AdminAddSubCategory/AdminAddSubCategory";
import './scss/app.scss';
import SingleProductPage from "./containers/SingleProductPage/SingleProductPage";
import SuccessOrderPlace from "./containers/SuccessOrderPlace/SuccessOrderPlace";
import { getContacts } from "./store/actions/contactsActions";
import Contacts from "./containers/Contacts/Contacts";
import AdminClients from "./containers/AdminClients/AdminClients";
import AdminAddClient from "./containers/AdminAddClient/AdminAddClient";

const ProtectedRoute = ({ isAllowed, redirectTo, ...props }) => {
   return isAllowed ? <Route {...props} /> : <Redirect to="/" />;
};

const LoginRedirectRoute = ({ user, redirectTo, ...props }) => {
   if (!user) {
      return <Route {...props} />;
   }

   if (user.role === "admin") {
      return <Redirect to="/admin" />;
   }

   if (user.role === "cashier") {
      return <Redirect to="/cashier/open-shift" />;
   }
};

const App = () => {
   const dispatch = useDispatch();
   const user = useSelector((state) => state.users.user);

   useEffect(() => {
      dispatch(getContacts());
   }, [dispatch]);

   return (
      <Layout>
         <Switch>
            <Route path="/" exact component={MainPage} />
            <Route path="/news" exact component={NewsPage} />
            <Route path="/cart" exact component={CustomerCart} />
            <Route path="/order-place" component={AddOrderProduct} />
             <Route path="/news/:id" component={NewsInfo}/>
             <Route path="/products/:id" component={SingleProductPage}/>
            <Route path="/order-place" exact component={AddOrderProduct} />
            <Route path="/news/:id" component={NewsInfo} />
            <Route path="/order-place/success" component={SuccessOrderPlace}/>
            <Route path="/contacts" component={Contacts}/>

            <ProtectedRoute
                isAllowed={user}
                path="/admin"
                exact
                component={AdminMainPage}
            />

            <ProtectedRoute
                isAllowed={user}
                path="/admin/categories"
                exact
                component={AdminCategories}
            />

            <ProtectedRoute
                isAllowed={user}
                path="/admin/clients"
                exact
                component={AdminClients}
            />
            <ProtectedRoute
                isAllowed={user}
                path="/admin/clients/add-new-client"
                exact
                component={AdminAddClient}
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
                path="/admin/categories/add-new-subcategory"
                component={AdminAddSubCategory}
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
               path="/admin/orders"
               component={AdminOrders}
            />

            <ProtectedRoute
               isAllowed={user}
               path="/admin/orders/archive"
               component={AdminOrders}
            />

            <ProtectedRoute
               isAllowed={user}
               exact
               path="/cashier/open-shift"
               component={CashierOpenShift}
            />

            <ProtectedRoute
               isAllowed={user}
               path="/cashier"
               component={CashierPanel}
            />

            <LoginRedirectRoute user={user} path="/login" component={Login} />
         </Switch>
      </Layout>
   );
};

export default App;
