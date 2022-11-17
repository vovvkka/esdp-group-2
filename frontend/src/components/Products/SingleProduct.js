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
import FitScreenIcon from "@mui/icons-material/FitScreen";
import useDialogModal from "../../hooks/useDialogModal";
import ProductDetail from "../ProductDetail/ProductDetail";
import ProductMeta from "./ProductMeta";
import {useDispatch} from "react-redux";
import {addProduct} from "../../store/slices/cartSlice";

const SingleProduct = ({product, matches}) => {
    const dispatch = useDispatch();
    const [ProductDetailDialog, showProductDetailDialog] = useDialogModal(ProductDetail);

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
                <ProductImage src={'http://localhost:8000/' + product.image}/>
                <ProductMeta product={product} matches={matches}/>
                <ProductActionsWrapper>
                    <Stack direction={matches ? "row" : "column"}>
                        <ProductActionButton>
                            <Tooltip placement="left" title="Поделиться">
                                <ShareIcon color="primary"/>
                            </Tooltip>
                        </ProductActionButton>
                        <ProductActionButton onClick={() => showProductDetailDialog}>
                            <Tooltip placement="left" title="Перейти">
                                <FitScreenIcon color="primary"/>
                            </Tooltip>
                        </ProductActionButton>
                    </Stack>
                </ProductActionsWrapper>
            </Product>
            <ProductAddToCart variant="contained" onClick={()=>dispatch(addProduct(product))}>Добавить в корзину</ProductAddToCart>
            <ProductDetailDialog product={product}/>
        </>
    );
}

export default SingleProduct;
