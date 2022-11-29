import {Box, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import Pagination from '@mui/material/Pagination';
import {fetchProducts} from "../../store/actions/productsActions";
import Spinner from "../UI/Spinner/Spinner";
import ProductCard from "../NewShop/ProductCard/ProductCard";

const Products = () => {
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
            <ProductCard product={product}/>
    )) : <Typography>Нет в наличии</Typography>;

    return loading ? <Spinner/> : (
        <div className='container'>
                <div className='products'>
                    {renderProducts}
                </div>
            <Box display='flex' justifyContent='center' paddingY='10px'>
                <Pagination count={products.pages} page={currentPage} onChange={handleChange} color="secondary"/>
            </Box>
        </div>
    );
}

export default Products;
