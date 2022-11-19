import React from 'react';
import theme from "../../theme";
import {Container, Stack, Typography, Box, useMediaQuery} from "@mui/material";
import {UIProvider} from "../../context/ui";
import Banner from "../../components/Banner/Banner";
import {ThemeProvider} from "@mui/system";
import Products from "../../components/Products/Products";

const MainPage = () => {
    const matches = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <ThemeProvider theme={theme}>
            <Container
                disableGutters
                maxWidth="xl"
                sx={{
                    background: "#fff",
                    marginTop: matches ? '200px' : 0
                }}
            >
                <Stack>
                    <UIProvider>
                        <Banner/>
                        <Box display="flex" justifyContent="center" sx={{p: 4}}>
                            <Typography variant="h4">Наши товары</Typography>
                        </Box>
                        <Products/>
                    </UIProvider>
                </Stack>
            </Container>
        </ThemeProvider>
    );
};

export default MainPage;