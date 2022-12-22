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
import {setKey} from "../../store/slices/productsSlice";

const SearchPage = () => {
    const products = useSelector(state => state.products.productsSearch);
    const loading = useSelector(state => state.products.fetchLoading);
    const [currentPage, setCurrentPage] = useState(1);
    const [value,setValue] = useState(null);
    const key = useSelector(state => state.products.key);
    const [productsList, setProductsList] = useState([]);
    const dispatch = useDispatch();

    const handleChange = (event, value) => {
        setCurrentPage(value);
    };
    const onInputChange = async (e) => {
        setValue(e.target.value);
        if (e.target.value.length<=2) {
            return setProductsList([]);
        } else {
            const response = await axiosApi(`/products/search?key=${e.target.value}`);
            const data = response.data.map(i => {
                    return {...i, label: i.title};
                }
            );
            setProductsList(data);
        }
    };

    const renderProducts = products.docs ?
            (products.docs.length ?
                products.docs.map((product) => (
                    <ProductCard key={product._id} product={product}/>)
                )
                : null)
            :
            null
        ;
        return (
            <ThemeProvider theme={theme}>
                <div className='searchPage'>
                    <div className='container'>
                        <h2 className="title">Поиск</h2>
                        <div className="location">
                            Главная —{" "}
                            <span className="location__page"> Поиск</span>
                        </div>

                        <Stack mt='25px'>
                            <div className='searchPage__bar'>
                                <div className='searchPage__select'>
                                    <Autocomplete
                                        sx={{width: '98%'}}
                                        options={productsList}
                                        freeSolo
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
                                                            dispatch(setKey(value));
                                                            dispatch(fetchProductsSearch('?page=' + currentPage + '&key=' + value));
                                                        }
                                                    },
                                                }}
                                            />
                                        )}
                                    />
                                </div>
                                <button type='submit' className='searchPage__button button'
                                        onClick={() => {
                                            dispatch(setKey(value));
                                            dispatch(fetchProductsSearch('?page=' + currentPage + '&key=' + value));
                                        }}><SearchIcon/></button>
                            </div>
                            {loading ? <Spinner/> : (
                                <div className='searchPage__products'>
                                    {
                                        products.docs?.length>0?<Typography>Поиск по запросу - {key}</Typography>:null
                                    }
                                    <div className='products'>
                                        {renderProducts}
                                    </div>
                                    {products.docs?.length ?
                                        <div className='searchPage__pages' >
                                        <Pagination count={products.pages} page={currentPage} onChange={handleChange}
                                                    color="secondary"/>
                                    </div> : <Typography sx={{justifySelf:'start'}}>{key} - По вашему запросу совпадений не найдено</Typography>}
                                </div>
                            )}

                        </Stack>

                    </div>
                </div>
            </ThemeProvider>
        );
    };

    export default SearchPage;