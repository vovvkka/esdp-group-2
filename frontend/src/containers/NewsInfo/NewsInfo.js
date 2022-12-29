import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOneNews } from "../../store/actions/newsActions";
import { apiUrl } from "../../config";

const NewsInfo = ({ match }) => {
    const dispatch = useDispatch();
    const oneNews = useSelector((state) => state.news.oneNews);

    useEffect(() => {
        dispatch(getOneNews(match.params.id));
    }, [dispatch, match.params.id]);

    return (
        oneNews && (
            <div className="oneNews">
                <h2 className="title">{oneNews.title}</h2>
                <div className="oneNews__info">
                    <img
                        className="oneNews__image"
                        src={apiUrl + "/" + oneNews.image}
                        alt={oneNews}
                    />
                    <p className="oneNews__description">
                        {oneNews.description}
                    </p>
                </div>
            </div>
        )
    );
};

export default NewsInfo;
