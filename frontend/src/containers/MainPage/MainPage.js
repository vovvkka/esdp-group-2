import React from 'react';
import theme from "../../theme";
import {Stack} from "@mui/material";
import {ThemeProvider} from "@mui/system";
import Products from "../../components/Products/Products";
import CategoryBar from "../../components/CategoryBar/CategoryBar";

const MainPage = () => {
    return (
        <ThemeProvider theme={theme}>
                <Stack>
                    <CategoryBar/>
                    <Products/>
                </Stack>
        </ThemeProvider>
    );
};

export default MainPage;