import React from 'react';
import AdminAddCategory from "./containers/AdminAddCategory/AdminAddCategory";
import Login from "./containers/Login/Login";
import Layout from "./components/UI/Layout/Layout";

const App = () => {
    return (
        <Layout>
            <Switch>
                <Route path='/admin/add-new-category' exact component={AdminAddCategory}/>
                <Route path="/login" component={Login}/>
            </Switch>
        </Layout>
    );
};

export default App;