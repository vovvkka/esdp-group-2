import {Container, Grid, Typography} from "@mui/material";
import SingleProduct from "./SingleProduct";
import {useTheme} from "@mui/material/styles";
import {useMediaQuery} from "@mui/material";
import SingleProductDesktop from "./SingleProductDesktop";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {fetchProducts} from "../../store/actions/productsActions";

const Products = () => {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down("md"));
    const products = useSelector(state=>state.products.products);
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(fetchProducts());
    },[dispatch]);

    const renderProducts = products.length > 0 ? products.map((product) => (
        <Grid item key={product._id} xs={2} sm={4} md={4} display="flex" flexDirection={'column'} alignItems="center">
            {matches ? (
                <SingleProduct product={product} matches={matches}/>
            ) : (
                <SingleProductDesktop product={product} matches={matches}/>
            )}
        </Grid>
    )) : <Typography>Товар не найден</Typography>
    return (
        <Container>
            <Grid
                container
                spacing={{xs: 2, md: 3}}
                justifyContent="center"
                sx={{margin: `20px 4px 10px 4px`}}
                columns={{xs: 2, sm: 8, md: 12, lg: 16,}}
            >
                {renderProducts}
            </Grid>
        </Container>
    );
}

export default Products;
