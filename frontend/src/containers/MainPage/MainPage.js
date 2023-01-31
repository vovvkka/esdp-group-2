import React from "react";
import theme from "../../theme";
import { Stack } from "@mui/material";
import { ThemeProvider } from "@mui/system";
import CategoryBar from "../../components/CategoryBar/CategoryBar";
import Products from "../../components/Products/Products";

const MainPage = () => {
    return (
        <ThemeProvider theme={theme}>
            <Stack>
                <h2 className="title title-main">Последние поступления</h2>
                <CategoryBar />
                <Products />
            </Stack>
        </ThemeProvider>
    );
};

export default MainPage;
