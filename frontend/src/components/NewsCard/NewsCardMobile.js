import React from 'react';
import {Box, Button, Card, CardActions, CardContent, CardMedia, Typography} from "@mui/material";
import {apiUrl} from "../../config";
import {Link} from "react-router-dom";

const NewsCardMobile = ({_id, title, image, description, createdAt}) => {
    return (
        <Card sx={{margin: '10px 0'}}>
            <Box sx={{minWidth: '300px', margin: '0 20px 20px 0'}}>
                <CardMedia
                    component="img"
                    height='auto'
                    width='400'
                    image={apiUrl + '/' + image}
                />
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography component="div" variant="h5" sx={{fontWeight: 'bold'}}>
                        {title}
                    </Typography>
                    <Typography component="div" variant="body2" color="text.secondary">
                        {new Date(createdAt).toLocaleString()}
                    </Typography>
                    <Typography variant="subtitle1" component="div">
                        {description}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" component={Link} to={`/news/${_id}`}>Читать все</Button>
                </CardActions>
            </Box>
        </Card>
    );
};

export default NewsCardMobile;