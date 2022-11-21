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
import {useDispatch} from "react-redux";
import {addProduct} from "../../store/slices/cartSlice";
import {apiUrl} from "../../config";

const SingleProduct = ({product, matches}) => {
    const dispatch = useDispatch();

    const [showOptions, setShowOptions] = useState(false);

    const handleMouseEnter = () => {
        setShowOptions(!showOptions);
    };
    const handleMouseLeave = () => {
        setShowOptions(!showOptions);
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
            <ProductAddToCart variant="contained" onClick={()=>dispatch(addProduct(product))}>Добавить в корзину</ProductAddToCart>
        </>
    );
}

export default SingleProduct;
