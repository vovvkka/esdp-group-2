import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getNews} from "../../store/actions/newsActions";
import {apiUrl} from "../../config";
import {Link} from "react-router-dom";

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
                {news.map(n => {
                    const desc = n.description.length >= 20 ? n.description.split(' ').slice(0, 20).join(' ') : n.description;
                    return (
                        <div className='news__card' key={n._id}>
                            <div className='news__card-image-body'>
                                <img className='news__card-image' src={apiUrl + '/' + n.image} alt={n.title}/>
                            </div>
                            <div className='news__card-body'>
                                <h3 className='news__card-title'>{n.title}</h3>
                                <p className='news__card-date'>{new Date(n.updatedAt).toLocaleString()}</p>
                                <p className='news__card-description'>{desc}...</p>
                                <Link to={`/news/${n._id}`} className='button news__card-btn'>Читать всё</Link>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default NewsPage;