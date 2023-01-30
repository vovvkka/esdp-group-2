import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOneNews } from "../../store/actions/newsActions";
import { apiUrl } from "../../config";
import Share from "../../components/Share/Share";

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
                <Share url={window.location.href}/>
            </div>
        )
    );
};

export default NewsInfo;
