import {useState} from "react";
import {
    Product,
    ProductActionButton,
    ProductActionsWrapper,
    ProductAddToCart,
    ProductImage,
} from "../../styles/Product/styledProduct";
import {Stack, Tooltip} from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import ProductMeta from "./ProductMeta";
import {useDispatch, useSelector} from "react-redux";
import {addProduct} from "../../store/slices/cartSlice";
import {apiUrl} from "../../config";
import {addNotification} from "../../store/actions/notifierActions";

const SingleProduct = ({product, matches}) => {
    const dispatch = useDispatch();
    const products = useSelector(state => state.cart.products);

    const [showOptions, setShowOptions] = useState(false);
    const itemInCart = products.find((item) => item._id === product._id);

    const handleMouseEnter = () => {
        setShowOptions(!showOptions);
    };
    const handleMouseLeave = () => {
        setShowOptions(!showOptions);
    };
    const onAddToCart = product => {
        dispatch(addNotification(`Добавлено.`,'success', {autoClose: 1000}));
        dispatch(addProduct(product));
    };
    return (
        <>
            <Product onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <ProductImage src={apiUrl + '/' + product.image}/>
                <ProductMeta product={product} matches={matches}/>
                <ProductActionsWrapper>
                    <Stack direction={matches ? "row" : "column"}>
                        <ProductActionButton>
                            <Tooltip placement="left" title="Поделиться">
                                <ShareIcon color="primary"/>
                            </Tooltip>
                        </ProductActionButton>
                    </Stack>
                </ProductActionsWrapper>
            </Product>
            <ProductAddToCart disabled={product.amount<=itemInCart?.quantity} variant="contained" onClick={onAddToCart}>Добавить в корзину</ProductAddToCart>
        </>
    );
}

export default SingleProduct;
