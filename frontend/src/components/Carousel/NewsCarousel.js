import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getNews} from "../../store/actions/newsActions";
import Carousel from 'react-material-ui-carousel'
import {apiUrl} from "../../config";
import {Link} from "react-router-dom";

const NewsCarousel = () => {
    const dispatch = useDispatch();
    const news = useSelector(state => state.news.news);

    useEffect(() => {
        dispatch(getNews('?shop=true&limit=5'))
    }, [dispatch]);

    return news.length ? (
        <div className='carousel'>
            <Carousel
                navButtonsAlwaysVisible
                indicatorIconButtonProps={{
                    style: {
                        height: '3px', width: '30px', margin: '0 5px', background: '#b0b0b0', borderRadius: 0
                    }
                }}
                activeIndicatorIconButtonProps={{
                    style: {
                        background: 'black',
                    }
                }}
                navButtonsProps={{
                    style: {
                        background: 'transparent',
                        borderRadius: 0,
                        color: 'black',
                        width: '50px'
                    }
                }}
                IndicatorIcon={<div/>}
            >
                    {news.map(item => {
                        const desc = item.description.length >= 20 ? item.description.split(' ').slice(0, 20).join(' ') : item.description;
                        return <div className='carousel__content' key={item._id}>
                            <div className='carousel__info'>
                                <p className='carousel__title'>{item.title}</p>
                                <p className='carousel__description'>{desc}...</p>
                                <Link to={'/news/' + item._id}>
                                    <button className='button'>Читать все</button>
                                </Link>
                            </div>
                            <div className='carousel__image'>
                                <img src={`${apiUrl}/${item.image}`} alt="" width='100%' height='auto' draggable={false}/>
                            </div>
                        </div>
                    })}
            </Carousel>
        </div>
    ) : null;
};

export default NewsCarousel;