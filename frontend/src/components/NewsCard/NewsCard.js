import React from "react";
import { apiUrl } from "../../config";
import { Link } from "react-router-dom";
import { Delete, Visibility, VisibilityOff, Edit } from "@mui/icons-material";
import noImage from "../../assets/no-image.jpg";

const NewsCard = ({ n, isAdmin, onChangeStatus, onDeleteNews }) => {
    const desc =
        n.description.length >= 20
            ? n.description.split(" ").slice(0, 20).join(" ")
            : n.description;

    let image = noImage;

    if (n.image) {
        image = apiUrl + "/" + n.image;
    }

    return (
        <>
            <div className="news__card">
                <div className="news__card-image-body">
                    <img
                        className="news__card-image"
                        src={image}
                        alt={n.title}
                    />
                </div>
                <div className="news__card-body">
                    <div className="news__card-body-info">
                        <h3 className="news__card-title">{n.title}</h3>
                        <p className="news__card-date">
                            <span>
                                {new Date(n.updatedAt).toLocaleDateString(
                                    "default",
                                    {
                                        year: "numeric",
                                        month: "2-digit",
                                        day: "2-digit",
                                    }
                                )}
                            </span>
                        </p>
                        <p className="news__card-description">{desc}...</p>
                    </div>

                    <div className="news__card-body-bottom">
                        <Link
                            to={`/news/${n._id}`}
                            className="button news__card-btn"
                        >
                            Читать всё
                        </Link>
                        {isAdmin && (
                            <div className="news__card-body-admin">
                                <button
                                    className={
                                        n.published
                                            ? "button button--success"
                                            : "button button--warning"
                                    }
                                    onClick={() => onChangeStatus()}
                                >
                                    {n.published ? (
                                        <Visibility />
                                    ) : (
                                        <VisibilityOff />
                                    )}
                                </button>
                                <Link
                                    className="button button--info news__card-body-admin-delete"
                                    to={"/admin/news/edit-news/" + n._id}
                                >
                                    <Edit />
                                </Link>
                                <button
                                    className="button button--warning news__card-body-admin-delete"
                                    onClick={onDeleteNews}
                                >
                                    <Delete />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default NewsCard;
