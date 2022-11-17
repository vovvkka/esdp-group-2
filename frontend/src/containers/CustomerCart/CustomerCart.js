import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Avatar, Grid, IconButton, Typography, useMediaQuery} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import {Box} from "@mui/system";
import theme from "../../theme";
import {addProduct, deleteProduct, reduceProduct} from "../../store/slices/cartSlice";

const CustomerCart = () => {
    const dispatch = useDispatch();
    const matches = useMediaQuery(theme.breakpoints.down('sm'));
    const products = useSelector(state => state.cart.products);
    return (
        <Grid>
            <Typography sx={{mt: 4, mb: 2}} variant="h6" component="div">
                Моя корзина
            </Typography>

            {products.map(product =>
                <Grid container item
                      alignItems="center"
                      justifyContent="space-between"
                      direction={matches ? 'column' : 'row'}
                      sx={{marginBottom: '10px', padding: '10px', backgroundColor: '#afeee23d', borderRadius: '5px'}}
                      key={product._id}>
                    <Box sx={{display: 'flex', alignItems: 'center', flexBasis: '50%', flexGrow: 1}}><Avatar
                        alt={product.title}
                        src={'http://localhost:8000/' + product.image}
                        sx={{width: 56, height: 56, marginRight: '10px'}}
                    />
                        <Typography variant="body1" component="div">
                            {product.title}
                        </Typography>
                    </Box>
                    <Box sx={matches ? {
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            flexGrow: 1,
                            marginTop: '10px'
                        }
                        : {display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexGrow: 1}}>
                        <Box sx={{display: 'flex', alignItems: 'center'}}>
                            <IconButton onClick={()=>dispatch(reduceProduct(product._id))}>
                                <RemoveIcon/>
                            </IconButton>
                            <Typography variant="body1" component="div">
                                {product.quantity}
                            </Typography>
                            <IconButton onClick={()=>dispatch(addProduct(product))}>
                                <AddIcon/>
                            </IconButton>
                        </Box>
                        <IconButton onClick={()=>dispatch(deleteProduct(product._id))}>
                            <DeleteIcon/>
                        </IconButton>
                    </Box>
                </Grid>)}
        </Grid>
    );
};

export default CustomerCart;