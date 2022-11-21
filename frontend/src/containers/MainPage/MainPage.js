import React from 'react';
import theme from "../../theme";
import {Container, Stack, Typography, Box, useMediaQuery} from "@mui/material";
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
                    <Banner/>
                    <Box display="flex" justifyContent="center" sx={{p: 4}}>
                        <Typography variant="h4">Наши товары</Typography>
                    </Box>
                    <Products/>
                </Stack>
            </Container>
        </ThemeProvider>
    );
};

export default MainPage;