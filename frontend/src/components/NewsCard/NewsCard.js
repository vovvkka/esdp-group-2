import React from 'react';
import {apiUrl} from "../../config";
import {Link} from "react-router-dom";
import {Visibility, VisibilityOff} from "@mui/icons-material";

const NewsCard = ({n, isAdmin}) => {
    const desc = n.description.length >= 20 ? n.description.split(' ').slice(0, 20).join(' ') : n.description;

    return (
        <div className='news__card' key={n._id}>
            <div className='news__card-image-body'>
                <img className='news__card-image' src={apiUrl + '/' + n.image} alt={n.title}/>
            </div>
            <div className='news__card-body'>
                <div className="news__card-body-info">
                    <h3 className='news__card-title'>{n.title}</h3>
                    <p className='news__card-date'>{new Date(n.updatedAt).toLocaleString()}</p>
                    <p className='news__card-description'>{desc}...</p>
                </div>

                <div className="news__card-body-bottom">
                    <Link to={`/news/${n._id}`} className='button news__card-btn'>Читать всё</Link>
                    {
                        isAdmin && (
                            <button
                                className={n.published? 'button button--success' : 'button button--warning'}
                            >
                                {n.published? <Visibility/> : <VisibilityOff/>}
                            </button>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default NewsCard;