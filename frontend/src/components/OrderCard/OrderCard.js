import React from 'react';
import {Box, Button, Card, CardContent, Typography} from "@mui/material";

const OrderCard = (props) => {
    let render;

    if (props.status === 'новый') {
        render = (
            <Card sx={{width: '300px', margin: '10px', textAlign: 'center', background: 'green'}}>
                <Box component={Button} onClick={props.click} sx={{textDecoration: 'none', color: 'black'}}>
                    <CardContent>
                        <Typography>
                            <b>Дата: </b>{props.createdAt}
                        </Typography>
                        <Typography>
                            <b>Заказчик: </b>{props.customer}
                        </Typography>
                    </CardContent>
                </Box>
            </Card>
        );
    } else if (props.status === 'собран') {
        render = (
            <Card sx={{width: '300px', margin: '10px', textAlign: 'center', background: 'orange'}}>
                <Box component={Button} onClick={props.click} sx={{textDecoration: 'none', color: 'black'}}>
                    <CardContent>
                        <Typography>
                            <b>Дата: </b>{props.createdAt}
                        </Typography>
                        <Typography>
                            <b>Заказчик: </b>{props.customer}
                        </Typography>
                    </CardContent>
                </Box>
            </Card>
        );
    } else if (props.status === 'закрыт') {
        render = (
            <Card sx={{width: '300px', margin: '10px', textAlign: 'center', background: 'red'}}>
                <Box component={Button} onClick={props.click} sx={{textDecoration: 'none', color: 'black'}}>
                    <CardContent>
                        <Typography>
                            <b>Дата: </b>{props.createdAt}
                        </Typography>
                        <Typography>
                            <b>Заказчик: </b>{props.customer}
                        </Typography>
                    </CardContent>
                </Box>
            </Card>
        );
    }

    return (
        <>
            {render}
        </>
    );
};

export default OrderCard;