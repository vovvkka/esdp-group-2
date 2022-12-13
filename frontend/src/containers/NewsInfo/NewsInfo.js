import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getOneNews} from "../../store/actions/newsActions";
import {apiUrl} from "../../config";

const NewsInfo = ({match}) => {
    const dispatch = useDispatch();
    const oneNews = useSelector(state => state.news.oneNews);

    useEffect(() => {
        dispatch(getOneNews(match.params.id));
    }, [dispatch, match.params.id]);
    return  oneNews && (
        <>
        <h1 className="title">
            {oneNews.title}
        </h1>
        <div className="oneNews__card">
            <div className="oneNews__card-body">
                <p className="oneNews__card-description">
                    {oneNews.description}
                </p>
            </div>
            <div className="oneNews__card-image-body">
                <img className='oneNews__card-image' src={apiUrl + '/' + oneNews.image} alt={oneNews}/>
            </div>
        </div>
        </>
    );
};

export default NewsInfo;