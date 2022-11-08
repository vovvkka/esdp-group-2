import React from 'react';
import {Route, Switch} from "react-router-dom";
import Layout from "./components/UI/Layout/Layout";
import Login from "./containers/Login/Login";
import AdminAddCategory from "./containers/AdminAddCategory/AdminAddCategory";
import AdminAddProduct from "./containers/AdminAddProduct/AdminAddProduct";
import AdminEditProduct from "./containers/AdminEditProduct/AdminEditProduct";
import AdminCategories from "./containers/AdminCategories/AdminCategories";
import AdminEditCategory from "./containers/AdminEditCategory/AdminEditCategory";

const App = () => {
    return (
        <Layout>
            <Switch>
                <Route path='/admin/categories' exact component={AdminCategories}/>
                <Route path='/admin/categories/edit-category/:id' exact component={AdminEditCategory}/>
                <Route path='/admin/categories/add-new-category' exact component={AdminAddCategory}/>
                <Route path='/admin/products/add-new-product' exact component={AdminAddProduct}/>
                <Route path='/admin/products/edit-product/:id' exact component={AdminEditProduct}/>
                <Route path="/login" component={Login}/>
            </Switch>
        </Layout>
    );
};

export default App;