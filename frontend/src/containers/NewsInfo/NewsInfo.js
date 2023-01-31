import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOneNews } from "../../store/actions/newsActions";
import { apiUrl } from "../../config";
import Share from "../../components/Share/Share";
import Spinner from "../../components/UI/Spinner/Spinner";

const NewsInfo = ({ match }) => {
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.news.singleLoading);
    const oneNews = useSelector((state) => state.news.oneNews);

    useEffect(() => {
        dispatch(getOneNews(match.params.id));
    }, [dispatch, match.params.id]);

    if (loading) {
        return <Spinner />;
    }

    return (
        oneNews && (
            <div className="oneNews">
                <h2 className="title">{oneNews.title}</h2>

                <div className="oneNews__info">
                    {oneNews.image ? (
                        <img
                            className="oneNews__image"
                            src={apiUrl + "/" + oneNews.image}
                            alt={oneNews}
                        />
                    ) : null}
                    <p className="oneNews__description">
                        {oneNews.description}
                    </p>
                </div>
                <div className="oneNews__bottom">
                    <p className="news__card-date">
                        Опубликовано <span>
                             {new Date(oneNews.updatedAt).toLocaleDateString(
                                "default",
                                {
                                    year: "numeric",
                                    month: "2-digit",
                                    day: "2-digit",
                                }
                            )}
                        </span>
                    </p>
                    <Share url={window.location.href} />
                </div>
            </div>
        )
    );
};

export default NewsInfo;
