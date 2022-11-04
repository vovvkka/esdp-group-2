import React from 'react';
import AdminAddCategory from "./containers/AdminAddCategory/AdminAddCategory";
import {Route, Switch} from "react-router-dom";


const App = () => {
    return (
        <Switch>
            <Route path='/admin_add_category' exact component={AdminAddCategory}/>
        </Switch>
    );
};

export default App;