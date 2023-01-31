import React, { useEffect, useState } from "react";
import { ThemeProvider } from "@mui/system";
import theme from "../../theme";
import { Stack, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../components/UI/Spinner/Spinner";
import Pagination from "@mui/material/Pagination";
import ProductCard from "../../components/ProductCard/ProductCard";
import { fetchProductsSearch } from "../../store/actions/productsActions";
import { Link } from "react-router-dom";

const SearchPage = () => {
    const products = useSelector((state) => state.products.productsSearch);
    const loading = useSelector((state) => state.products.fetchLoading);
    const [currentPage, setCurrentPage] = useState(1);
    const key = useSelector((state) => state.products.key);
    const dispatch = useDispatch();
    useEffect(() => {
        if (key) {
            dispatch(
                fetchProductsSearch("?page=" + currentPage + "&key=" + key + "&store=true")
            );
        }
    }, [currentPage, dispatch, key]);

    const handleChange = (event, value) => {
        setCurrentPage(value);
    };

    const renderProducts = products.docs
        ? products.docs.length
            ? products.docs.map((product) => (
                  <ProductCard key={product._id} product={product} />
              ))
            : null
        : null;
    return (
        <ThemeProvider theme={theme}>
            <div className="searchPage">
                <div className="container">
                    <h2 className="title">Поиск</h2>
                    <div className="location">
                        <Link to="/">Главная</Link>
                        <span>—</span>
                        <p className="location__page">Поиск</p>
                    </div>

                    <Stack mt="25px">
                        {loading ? (
                            <Spinner />
                        ) : (
                            <div className="searchPage__products">
                                {products.docs?.length > 0 ? (
                                    <Typography>
                                        Поиск по запросу - "{key}"
                                    </Typography>
                                ) : null}
                                <div className="products">{renderProducts}</div>
                                {!products.docs ? null : products.docs
                                      .length ? (
                                    <div className="searchPage__pages">
                                        <Pagination
                                            count={products.pages}
                                            page={currentPage}
                                            onChange={handleChange}
                                            color="secondary"
                                        />
                                    </div>
                                ) : (
                                    <Typography sx={{ justifySelf: "start" }}>
                                        "{key}" - По вашему запросу совпадений
                                        не найдено
                                    </Typography>
                                )}
                            </div>
                        )}
                    </Stack>
                </div>
            </div>
        </ThemeProvider>
    );
};

export default SearchPage;
