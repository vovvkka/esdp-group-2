import React, {useState} from 'react';
import {ThemeProvider} from "@mui/system";
import theme from "../../theme";
import {Autocomplete, Box, Stack, TextField, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import Spinner from "../../components/UI/Spinner/Spinner";
import Pagination from "@mui/material/Pagination";
import ProductCard from "../../components/NewShop/ProductCard/ProductCard";
import {apiUrl} from "../../config";
import axiosApi from "../../axiosApi";
import {Link} from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import {fetchProductsSearch} from "../../store/actions/productsActions";

const SearchPage = () => {
    const products = useSelector(state => state.products.productsSearch);
    const loading = useSelector(state => state.products.fetchLoading);
    const [currentPage, setCurrentPage] = useState(1);
    const [key, setKey] = useState(null);
    const [productsList, setProductsList] = useState([]);
    const dispatch = useDispatch();

    const handleChange = (event, value) => {
        setCurrentPage(value);
    };
    const onInputChange = async (e) => {
        setKey(e.target.value);
        if (e.target.value.length<=2) {
            return setProductsList([]);
        } else {
            const response = await axiosApi(`/products/search?key=${key}`);
            const data = response.data.map(i => {
                    return {...i, label: i.title};
                }
            );
            setProductsList(data);
        }
    };

    const renderProducts = products.docs ? (products.docs.length > 0 ?
                products.docs.map((product) => (
                    <ProductCard key={product._id} product={product}/>)
                ) : <Typography>По вашему запросу совпадений не найдено</Typography>) :
            null
        ;
        return (
            <ThemeProvider theme={theme}>
                <div>
                    <div className='container'>
                        <h2 className="title">Поиск</h2>
                        <div className="location">
                            Главная —{" "}
                            <span className="location__page"> Поиск</span>
                        </div>

                        <Stack sx={{marginTop: '25px'}}>
                            <div style={{display: "flex"}}>
                                <div style={{flexGrow: 3}}>
                                    <Autocomplete
                                        sx={{width: '98%'}}
                                        options={productsList}
                                        isOptionEqualToValue={() => true}
                                        autoHighlight
                                        getOptionLabel={(option) => option.label}
                                        onInputChange={e => (onInputChange(e))}
                                        noOptionsText={'Нет подходящих результатов'}
                                        renderOption={(props, option) => (
                                            <Link to={`/products/${option._id}`}
                                                  className="product-card__overlay" {...props}>
                                                <Box component="li" sx={{'& > img': {mr: 2, flexShrink: 0}}}>
                                                    <img
                                                        loading="lazy"
                                                        width="20"
                                                        src={apiUrl + '/' + option.image[0]}
                                                        srcSet={apiUrl + '/' + option.image[0]}
                                                        alt=""
                                                    />
                                                    {option.title}
                                                </Box>
                                            </Link>

                                        )}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="Название товара"
                                                inputProps={{
                                                    ...params.inputProps,
                                                    onKeyDown: (e) => {
                                                        if (e.key === 'Enter') {
                                                            e.stopPropagation();
                                                        }
                                                    },
                                                }}
                                            />
                                        )}
                                    />
                                </div>
                                <button type='submit'
                                        onClick={() => dispatch(fetchProductsSearch('?page=' + currentPage + '&key=' + key))}
                                        style={{margin: 0}} className='button'><SearchIcon/></button>
                            </div>
                            {loading ? <Spinner/> : (
                                <div style={{marginTop: '15px'}}>
                                    <div className='products'>
                                        {renderProducts}
                                    </div>
                                    {products.docs ? <Box display='flex' justifyContent='center' paddingY='10px'>
                                        <Pagination count={products.pages} page={currentPage} onChange={handleChange}
                                                    color="secondary"/>
                                    </Box> : null}
                                </div>
                            )}

                        </Stack>

                    </div>
                </div>
            </ThemeProvider>
        );
    };

    export default SearchPage;