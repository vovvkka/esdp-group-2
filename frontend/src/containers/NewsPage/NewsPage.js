import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNews } from "../../store/actions/newsActions";
import NewsCard from "../../components/NewsCard/NewsCard";
import { Link } from "react-router-dom";

const NewsPage = () => {
    const dispatch = useDispatch();
    const news = useSelector((state) => state.news.news);

    useEffect(() => {
        dispatch(getNews("?shop=true"));
    }, [dispatch]);

    return (
        <div className="news">
            <div className="news__top">
                <h1 className="title">Новости</h1>
                <div className="location">
                    <Link to="/">Главная</Link>
                    <span>—</span>
                    <p className="location__page">Новости</p>
                </div>
            </div>

            <div className="news__main">
                {!news?.length ? <p>Новостей пока нет, возвращайтесь позже!</p> :  news?.map((n) => (
                    <NewsCard n={n} key={n._id} />
                ))}

            </div>
        </div>
    );
};

export default NewsPage;
