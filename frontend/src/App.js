import React from 'react';
import AdminAddCategory from "./containers/AdminAddCategory/AdminAddCategory";
import Login from "./containers/Login/Login";
import Layout from "./components/UI/Layout/Layout";
import AdminAddProduct from "./containers/AdminAddProduct/AdminAddProduct";
import AdminEditProduct from "./containers/AdminEditProduct/AdminEditProduct";
import {Route, Switch} from "react-router-dom";

const App = () => {
    return (
        <Layout>
            <Switch>
                <Route path='/admin/add-new-category' exact component={AdminAddCategory}/>
                <Route path='/admin/add-new-product' exact component={AdminAddProduct}/>
                <Route path='/admin/edit-product/:id' exact component={AdminEditProduct}/>
                <Route path="/login" component={Login}/>
            </Switch>
        </Layout>
    );
};

export default App;