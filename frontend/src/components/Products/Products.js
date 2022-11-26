import {Box, Container, Grid, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useTheme} from "@mui/material/styles";
import {useMediaQuery} from "@mui/material";
import Pagination from '@mui/material/Pagination';
import SingleProduct from "./SingleProduct";
import SingleProductDesktop from "./SingleProductDesktop";
import {fetchProducts} from "../../store/actions/productsActions";
import Spinner from "../UI/Spinner/Spinner";

const Products = () => {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down("md"));
    const products = useSelector(state => state.products.products);
    const loading = useSelector(state => state.products.fetchLoading);
    const [currentPage, setCurrentPage] = useState(1);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProducts(`?page=${currentPage}`));
    }, [dispatch, currentPage]);

    const handleChange = (event, value) => {
        setCurrentPage(value);
    };

    const renderProducts = products?.docs?.length > 0 ? products.docs.map((product) => (
        <Grid item key={product._id} xs={2} sm={4} md={4} display="flex" flexDirection={'column'} alignItems="center">
            {matches ? (
                <SingleProduct product={product} matches={matches}/>
            ) : (
                <SingleProductDesktop product={product} matches={matches}/>
            )}
        </Grid>
    )) : <Typography>Нет в наличии</Typography>;

    return loading ? <Spinner/> : (
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
            <Box display='flex' justifyContent='center' paddingY='10px'>
                <Pagination count={products.pages} page={currentPage} onChange={handleChange} color="secondary"/>
            </Box>
        </Container>
    );
}

export default Products;
