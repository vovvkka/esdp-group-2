import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getNews} from "../../store/actions/newsActions";
import NewsCard from "../../components/NewsCard/NewsCard";

const NewsPage = () => {
    const dispatch = useDispatch();
    const news = useSelector(state => state.news.news);

    useEffect(() => {
        dispatch(getNews('?shop=true'));
    }, [dispatch]);

    return (
        <div className='news'>
            <div className='news__top'>
                <h1 className='title'>Новости</h1>
                <div className='location'>Главная — <span
                    className='location__page'>Новости</span></div>
            </div>

            <div className='news__main'>
                {news.map(n => <NewsCard n={n}/>)}
            </div>
        </div>
    );
};

export default NewsPage;