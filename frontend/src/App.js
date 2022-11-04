import React from 'react';
import {Route, Switch} from "react-router-dom";
import Login from "./containers/Login/Login";
import Layout from "./components/UI/Layout/Layout";

const App = () => {
    return (
        <Layout>
            <Switch>
                <Route path="/login" component={Login}/>
            </Switch>
        </Layout>
    );
};

export default App;