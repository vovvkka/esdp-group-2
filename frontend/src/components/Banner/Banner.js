import {Typography} from "@mui/material";
import {BannerContainer, BannerContent, BannerImage,} from "../../styles/Banner/styledBanner";
import Carousel from 'react-material-ui-carousel'
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getNews} from "../../store/actions/newsActions";
import {apiUrl} from "../../config";
import {Link} from "react-router-dom";

const Banner = () => {
    const dispatch = useDispatch();
    const news = useSelector(state => state.news.news);

    useEffect(() => {
        dispatch(getNews());
    }, [dispatch]);

    return (
        <>
            <Carousel indicators={false} swipe={true} sx={{marginBottom: '10px'}}>
                {news.map(post => {
                    const desc = post.description.length >= 20 ? post.description.split(' ').slice(0, 20).join(' ') : post.description;
                    return <BannerContainer key={post._id} component={Link} to={'/news/' + post._id}
                                     sx={{textDecoration: 'none'}}>
                        <BannerImage src={`${apiUrl}/${post.image}`}/>
                        <BannerContent sx={{color: "black"}}>
                            <Typography variant='h4' sx={{fontWeight: 'bold'}}>
                                {post.title}
                            </Typography>

                            <Typography variant='body1'>
                                {desc}...
                            </Typography>
                        </BannerContent>
                    </BannerContainer>
                })}
            </Carousel>
        </>
    );
};

export default Banner;
