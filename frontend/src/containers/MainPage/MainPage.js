import React from 'react';
import theme from "../../theme";
import {Container, Stack, Typography, Box} from "@mui/material";
import {UIProvider} from "../../context/ui";
import Banner from "../../components/Banner/Banner";
import {ThemeProvider} from "@mui/system";
import Products from "../../components/Products/Products";
import Footer from "../../components/footer";
import AppDrawer from "../../components/Drawer/Drawer";

const MainPage = () => {
    return (
        <ThemeProvider theme={theme}>
            <Container
                disableGutters
                maxWidth="xl"
                sx={{
                    background: "#fff",
                    marginTop: '130px'
                }}
            >
                <Stack>
                    <UIProvider>
                        <Banner/>
                        <Box display="flex" justifyContent="center" sx={{p: 4}}>
                            <Typography variant="h4">Наши товары</Typography>
                        </Box>
                        <Products/>
                        <Footer/>
                        <AppDrawer/>
                    </UIProvider>
                </Stack>
            </Container>
        </ThemeProvider>
    );
};

export default MainPage;