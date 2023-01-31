import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axiosApi from "../../axiosApi";
import ProductCard from "../../components/ProductCard/ProductCard";
import { ThemeProvider } from "@mui/system";
import theme from "../../theme";
import { Stack, Typography } from "@mui/material";
import Spinner from "../../components/UI/Spinner/Spinner";
import Pagination from "@mui/material/Pagination";
import { TreeSelect } from "antd";
import { fetchCategories } from "../../store/actions/categoriesActions";
import { fetchProductsSearch } from "../../store/actions/productsActions";
import Filter from "../../components/UI/Filter/Filter";
import { clearProducts } from "../../store/slices/productsSlice";
import { Link } from "react-router-dom";

const ShopCatalog = () => {
    const products = useSelector((state) => state.products.productsSearch);
    const loading = useSelector((state) => state.products.fetchLoading);
    const [currentPage, setCurrentPage] = useState(1);
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.categories.categories);
    const [options, setOptions] = useState([]);
    const [state, setState] = useState("123");

    useEffect(() => {
        dispatch(fetchCategories("?tree=true&user=true"));
    }, [dispatch]);

    useEffect(() => {
        setOptions([
            {
                _id: "123",
                title: "Все товары",
                value: "123",
                id: "123",
                pId: 0,
                isLeaf: true,
            },
            ...categories,
        ]);
    }, [categories]);

    useEffect(() => {
        if (state === "123") {
            dispatch(
                fetchProductsSearch("?page=" + currentPage + "&user=true&store=true")
            );
        } else {
            dispatch(
                fetchProductsSearch(
                    "?page=" + currentPage + "&user=true&category=" + state + "&store=true"
                )
            );
        }
    }, [state, currentPage, dispatch]);

    useEffect(() => {
        return () => {
            dispatch(clearProducts());
        };
    }, [dispatch]);

    const onLoadData = async ({ id }) => {
        const response = await axiosApi(
            "/categories/?node=" + id + "&user=true"
        );
        setOptions(options.concat(response.data));
    };

    const onChange = (newValue) => {
        setState(newValue);
    };

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

    const filterByPrice = (query) => {
        if (state === "123") {
            dispatch(
                fetchProductsSearch("?page=" + currentPage + "&price=" + query)
            );
        } else {
            dispatch(
                fetchProductsSearch(
                    "?page=" +
                        currentPage +
                        "&category=" +
                        state +
                        "&price=" +
                        query
                )
            );
        }
    };

    const filterByDate = (query) => {
        if (state === "123") {
            dispatch(
                fetchProductsSearch("?page=" + currentPage + "&date=" + query)
            );
        } else {
            dispatch(
                fetchProductsSearch(
                    "?page=" +
                        currentPage +
                        "&category=" +
                        state +
                        "&date=" +
                        query
                )
            );
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <div>
                <div className="container">
                    <h2 className="title">Каталог</h2>
                    <div className="location">
                        <Link to="/">Главная</Link>
                        <span>—</span>
                        <p className="location__page">Каталог</p>
                    </div>
                    <Stack mt="25px">
                        <div style={{ display: "flex" }}>
                            <TreeSelect
                                treeDataSimpleMode
                                style={{
                                    width: "100%",
                                    marginTop: "10px",
                                    marginBottom: "5px",
                                }}
                                value={state}
                                dropdownStyle={{
                                    maxHeight: 400,
                                    overflow: "auto",
                                }}
                                onChange={onChange}
                                loadData={onLoadData}
                                treeData={options}
                            />
                            <Filter
                                filterByDate={filterByDate}
                                filterByPrice={filterByPrice}
                            />
                        </div>
                        {loading ? (
                            <Spinner />
                        ) : (
                            <div>
                                <div className="products">{renderProducts}</div>
                                {products.docs?.length > 0 ? (
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
                                        Нет в наличии
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

export default ShopCatalog;
