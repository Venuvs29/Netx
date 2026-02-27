import React, { useState } from 'react';
import { IMAGE_BASE_URL } from '../api/tmdb';
import './MovieCard.css';

const FALLBACK = 'https://via.placeholder.com/300x450/141414/E50914?text=No+Image';

const MovieCard = ({ movie, isLarge }) => {
    const [hovered, setHovered] = useState(false);

    const imgPath = isLarge ? movie.poster_path : (movie.backdrop_path || movie.poster_path);
    const imgSize = isLarge ? 'w342' : 'w500';
    const imgUrl = imgPath ? `${IMAGE_BASE_URL}/${imgSize}${imgPath}` : FALLBACK;

    const title = movie.title || movie.name || movie.original_title || 'Unknown';
    const rating = movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A';
    const year = (movie.release_date || movie.first_air_date || '').slice(0, 4);

    return (
        <div
            className={`movie-card ${isLarge ? 'movie-card--large' : ''} ${hovered ? 'movie-card--hovered' : ''}`}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <div className="movie-card__img-wrap">
                <img
                    className="movie-card__img"
                    src={imgUrl}
                    alt={title}
                    loading="lazy"
                    onError={e => { e.target.src = FALLBACK; }}
                />
                <div className="movie-card__overlay">
                    <div className="movie-card__info">
                        <p className="movie-card__title">{title}</p>
                        <div className="movie-card__meta">
                            {year && <span className="movie-card__year">{year}</span>}
                            <span className="movie-card__rating">⭐ {rating}</span>
                        </div>
                        <div className="movie-card__actions">
                            <button className="movie-card__play" title="Play">
                                <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                                    <path d="M8 5v14l11-7z" />
                                </svg>
                            </button>
                            <button className="movie-card__add" title="Add to list">+</button>
                            <button className="movie-card__like" title="Thumbs up">👍</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieCard;
