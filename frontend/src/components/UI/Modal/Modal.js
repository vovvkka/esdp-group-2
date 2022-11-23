import React, {useEffect, useState} from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid,
    Typography
} from "@mui/material";
import FormSelect from "../Form/FormSelect/FormSelect";
import {useSelector} from "react-redux";

const Modal = ({show, order, closed, onSubmit, deleteOrder}) => {
    const [state, setState] = useState({
        order: "",
        status: "",
    });

    const error = useSelector(state => state.orders.error);

    useEffect(() => {
        if (order) {
            setState(prevState => {
                return {...prevState, order: order._id};
            });
        }
    }, [order]);

    const handleChange = (e) => {
        const {name, value} = e.target;

        setState(prevState => {
            return {...prevState, [name]: value};
        });
    };

    const getFieldError = fieldName => {
        try {
            return error.error[fieldName].message;
        } catch {
            return undefined;
        }
    };

    const onSubmitHandler = e => {
        e.preventDefault();

        onSubmit({...state});
    };

    const onDeleteHandler = () => {
        deleteOrder(state.order);
    };

    return (
        <>
            <Dialog
                open={show}
                onClose={closed}

            >
                <DialogTitle sx={{textAlign: 'center'}}>Информация о заказе</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <Grid container spacing={2} sx={{overflow: 'auto', height: '200px'}}>
                            <Grid item sx={{marginRight: '50px'}}>
                                <Typography variant='h6' component='span' sx={{color: '#000'}}>Контакты:</Typography>
                                <Typography>
                                    <b>Заказчик:</b> {order && order.customer}
                                </Typography>
                                <Typography>
                                    <b>Телефон:</b> {order && order.phone}
                                </Typography>
                                <Typography>
                                    <b>Адрес:</b> {order && order.address}
                                </Typography>
                            </Grid>
                            <Grid item sx={{paddingRight: '10px'}}>
                                <Typography variant='h6' component='span' sx={{color: '#000'}}>Заказ:</Typography>
                                {order && order.order.map(product => (
                                    <Typography key={product._id}>
                                        <Typography component='span'>
                                            {product.product.title}
                                            <Typography variant='span' sx={{marginLeft: '10px'}}>
                                                <b>Цена:</b> {product.product.price} <b>KGS</b>
                                            </Typography>
                                        </Typography>
                                    </Typography>
                                ))}
                            </Grid>
                        </Grid>
                    </DialogContentText>
                </DialogContent>
                <form onSubmit={(e) => onSubmitHandler(e)}>
                    <DialogContent>
                        {order && order.status === 'закрыт' ? null :
                            <FormSelect
                                options={["новый", "собран", "закрыт"]}
                                label="Статус"
                                onChange={handleChange}
                                value={state.status}
                                name="status"
                                error={getFieldError('status')}
                            />}
                    </DialogContent>
                    <DialogActions>
                        <Button
                            disabled={order && order.status === 'закрыт'}
                            type='submit'
                            variant='contained'
                        >
                            Сохранить
                        </Button>
                        <Button
                            disabled={order && order.status === 'закрыт'}
                            onClick={() => onDeleteHandler()}
                            type='button'
                            variant='contained'
                        >
                            Удалить
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    );
};

export default Modal;