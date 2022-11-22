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
import {addProduct} from "../../store/slices/cartSlice";
import {useDispatch, useSelector} from "react-redux";
import {addNotification} from "../../store/actions/notifierActions";
import {apiUrl} from "../../config";

const SingleProductDesktop = ({product, matches}) => {
    const dispatch = useDispatch();
    const products = useSelector(state => state.cart.products);

    const itemInCart = products.find((item) => item._id === product._id);


    const [showOptions, setShowOptions] = useState(false);

    const handleMouseEnter = () => {
        setShowOptions(true);
    };
    const handleMouseLeave = () => {
        setShowOptions(false);
    };

    const onAddToCart = product => {
        dispatch(addNotification(`Добавлено.`,'success', {autoClose: 1000}));
        dispatch(addProduct(product));
    };

    return (
        <>
            <Product onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <ProductImage desktop={true} src={apiUrl + '/' + product.image}/>
                {(showOptions || matches) && (
                    <ProductAddToCart show={showOptions} variant="contained" disabled={product.amount<=itemInCart?.quantity} onClick={() => onAddToCart(product)}>
                        Добавить в корзину
                    </ProductAddToCart>
                )}
                <ProductActionsWrapper show={showOptions || matches ? "true" : undefined}>
                    <Stack direction={matches ? "row" : "column"}>
                        <ProductActionButton>
                            <Tooltip placement="left" title="Поделиться">
                                <ShareIcon color="primary"/>
                            </Tooltip>
                        </ProductActionButton>
                    </Stack>
                </ProductActionsWrapper>
            </Product>
            <ProductMeta product={product}/>
        </>
    );
}

export default SingleProductDesktop;