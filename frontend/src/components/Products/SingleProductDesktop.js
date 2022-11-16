import {useState} from "react";
import {
    Product,
    ProductActionButton,
    ProductActionsWrapper,
    ProductAddToCart,
    ProductImage,
} from "../../styles/styledProduct/styledProduct";
import {Stack, Tooltip} from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import FitScreenIcon from "@mui/icons-material/FitScreen";
import useDialogModal from "../../hooks/useDialogModal";
import ProductDetail from "../ProductDetail/ProductDetail";
import ProductMeta from "./ProductMeta";

const SingleProductDesktop = ({product, matches}) => {
    const [ProductDetailDialog, showProductDetailDialog] =
        useDialogModal(ProductDetail);

    const [showOptions, setShowOptions] = useState(false);

    const handleMouseEnter = () => {
        setShowOptions(true);
    };
    const handleMouseLeave = () => {
        setShowOptions(false);
    };
    return (
        <>
            <Product onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <ProductImage src={'http://localhost:8000/' + product.image}/>
                {(showOptions || matches) && (
                    <ProductAddToCart show={showOptions} variant="contained">
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
                        <ProductActionButton onClick={() => showProductDetailDialog()}>
                            <Tooltip placement="left" title="Перейти">
                                <FitScreenIcon color="primary"/>
                            </Tooltip>
                        </ProductActionButton>
                    </Stack>
                </ProductActionsWrapper>
            </Product>
            <ProductMeta product={product}/>
            <ProductDetailDialog product={product}/>
        </>
    );
}

export default SingleProductDesktop;