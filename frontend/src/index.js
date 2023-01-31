import React from 'react';
import {Router} from "react-router-dom";
import ReactDOM from 'react-dom/client';
import {Provider} from "react-redux";
import {ThemeProvider} from "@mui/material";
import store from "./store/configureStore";
import App from './App';
import history from "./history";
import theme from "./theme";
import './index.css';

const app = (
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <Router history={history}>
                <App/>
            </Router>
        </ThemeProvider>
    </Provider>
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(app);