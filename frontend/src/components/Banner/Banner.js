import {Button, CardMedia, Container, Typography, useMediaQuery} from "@mui/material";
import {useTheme} from "@mui/system";
import {
    BannerContainer,
    BannerContent,
    BannerDescription,
    BannerImage,
    BannerShopButton,
    BannerTitle,
} from "../../styles/Banner/styledBanner";
import Carousel from 'react-material-ui-carousel'
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getNews} from "../../store/actions/newsActions";
import {apiUrl} from "../../config";

const Banner = () => {
    const dispatch = useDispatch();
    const theme = useTheme();
    const news = useSelector(state => state.news.news);

    useEffect(() => {
        dispatch(getNews());
    }, []);

    return (
        <>
            <Carousel>
                {news.map(post => (
                    <BannerContainer key={post._id}>
                        <BannerImage src={`${apiUrl}/${post.image}`}/>
                        <BannerContent>
                            <Typography variant='h4' sx={{fontWeight: 'bold'}}>
                                {post.title}
                            </Typography>

                            <Typography variant='body1'>
                                {post.description}
                            </Typography>
                        </BannerContent>
                    </BannerContainer>
                ))}
            </Carousel>
        </>
    );
};

export default Banner;
