import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOneNews } from "../../store/actions/newsActions";
import { apiUrl } from "../../config";
import Spinner from "../../components/UI/Spinner/Spinner";

const NewsInfo = ({ match }) => {
    const dispatch = useDispatch();
    const loading = useSelector(state => state.news.singleLoading);
    const oneNews = useSelector((state) => state.news.oneNews);

    useEffect(() => {
        dispatch(getOneNews(match.params.id));
    }, [dispatch, match.params.id]);

    if (loading) {
        return <Spinner/>;
    }

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
