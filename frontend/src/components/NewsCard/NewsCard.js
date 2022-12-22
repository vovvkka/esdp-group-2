import React, {useState} from 'react';
import {apiUrl} from "../../config";
import {Link} from "react-router-dom";
import {Delete, Visibility, VisibilityOff} from "@mui/icons-material";
import {Box, Button, Typography} from "@mui/material";
import CustomModal from "../UI/Modal/Modal";

const NewsCard = ({n, isAdmin, onChangeStatus, onDeleteNews}) => {
    const [wantToDelete, setWantToDelete] = useState(false);

    const desc = n.description.length >= 20 ? n.description.split(' ').slice(0, 20).join(' ') : n.description;

    let modalChildren;
    if (wantToDelete) {
        modalChildren = (
            <Box width="100%">
                <Typography variant="h6">
                    Вы уверены что хотите удалить новость?
                </Typography>

                <Box display="flex" justifyContent="flex-end">
                    <Button
                        autoFocus
                        onClick={() => {
                            setWantToDelete(false);
                        }}
                    >
                        НЕТ
                    </Button>
                    <Button
                        onClick={() => {
                            onDeleteNews();
                        }}
                        autoFocus
                    >
                        ДА
                    </Button>
                </Box>
            </Box>
        )
    }


    return (
        <>
            <div className='news__card'>
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
                                <div className="news__card-body-admin">
                                    <button
                                        className={n.published ? 'button button--success' : 'button button--warning'}
                                        onClick={() => onChangeStatus()}
                                    >
                                        {n.published ? <Visibility/> : <VisibilityOff/>}
                                    </button>

                                    <button
                                        className="button button--warning news__card-body-admin-delete"
                                        onClick={() => {
                                            setWantToDelete(true);
                                        }}
                                    >
                                        <Delete/>
                                    </button>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>

            {
                wantToDelete && (
                    <CustomModal
                        handleClose={() => {
                            setWantToDelete(false);
                        }}
                    >
                        {modalChildren}
                    </CustomModal>
                )
            }


        </>

    );
};

export default NewsCard;