import {
    Box,
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton,
    Slide,
    Typography,
    useMediaQuery,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {Colors} from "../../theme";
import styled from "@emotion/styled";
import {Product, ProductImage} from "../../styles/Product/styledProduct";
import {useTheme} from "@mui/material/styles";
import IncDec from "../UI/IncDec/IncDec";
import {addProduct} from "../../store/slices/cartSlice";
import {useDispatch} from "react-redux";
import {addNotification} from "../../store/actions/notifierActions";

function SlideTransition(props) {
    return <Slide direction="down" {...props} />;
}

const ProductDetailWrapper = styled(Box)(({theme}) => ({
    display: "flex",
    padding: theme.spacing(4),
}));

const ProductDetailInfoWrapper = styled(Box)(() => ({
    display: "flex",
    flexDirection: "column",
    maxWidth: 500,
    lineHeight: 1.5,
}));

const ProductDetail = ({open, onClose, product}) => {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down("md"));
    const dispatch = useDispatch();

    const onAddToCart = product => {
        dispatch(addNotification(`Добавлено.`, 'success', {autoClose: 1000}));
        dispatch(addProduct(product));
    };

    return (
        <Dialog
            TransitionComponent={SlideTransition}
            variant="permanant"
            open={open}
            fullScreen
        >
            <DialogTitle
                sx={{
                    background: Colors.secondary,
                }}
            >
                <Box
                    display="flex"
                    alignItems="center"
                    justifyContent={"space-between"}
                >
                    {product.title}
                    <IconButton onClick={onClose}>
                        <CloseIcon/>
                    </IconButton>
                </Box>
            </DialogTitle>
            <DialogContent>
                <ProductDetailWrapper display={"flex"} flexDirection={matches ? "column" : "row"}>
                    <Product sx={!matches ? {flexBasis: '35%', mr: 4} : {flexBasis: '50%', mb: 4}}>
                        <ProductImage src={'http://localhost:8000/' + product.image}/>
                    </Product>
                    <ProductDetailInfoWrapper>
                        <Typography variant="subtitle">{product.amount} {product.unit} в наличии</Typography>
                        <Typography sx={{lineHeight: 2}} variant="h4">
                            {product.title}
                        </Typography>
                        <Typography variant="body">
                            {product.description}
                        </Typography>
                        <Box
                            sx={{mt: 4}}
                            display="flex"
                            alignItems="center"
                            justifyContent="space-between"
                            flexDirection={matches ? "column" : "row"}

                        >
                            <IncDec/>
                            <Button
                                onClick={() => onAddToCart(product)}
                                sx={matches ? {marginTop: '10px'} : {marginLeft: '10px'}}
                                variant="contained"
                            >
                                Добавить в корзину
                            </Button>
                        </Box>
                    </ProductDetailInfoWrapper>
                </ProductDetailWrapper>
            </DialogContent>
        </Dialog>
    );
}

export default ProductDetail;
