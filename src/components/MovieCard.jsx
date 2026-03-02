import React, { useState } from 'react';
import { IMAGE_BASE_URL, fetchMovieVideos } from '../api/tmdb';
import './MovieCard.css';

const FALLBACK = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='450' viewBox='0 0 300 450'%3E%3Crect width='300' height='450' fill='%23141414'/%3E%3Ctext x='150' y='225' text-anchor='middle' fill='%23E50914' font-size='40' font-family='Arial'%3EN%3C/text%3E%3C/svg%3E";

const MovieCard = ({ movie, isLarge }) => {
    const [hovered, setHovered] = useState(false);
    const [trailerKey, setTrailerKey] = useState(null);
    const [showTrailer, setShowTrailer] = useState(false);
    const [loadingTrailer, setLoadingTrailer] = useState(false);
    const [toast, setToast] = useState('');
    const [added, setAdded] = useState(false);
    const [liked, setLiked] = useState(false);

    const imgPath = isLarge ? movie.poster_path : (movie.backdrop_path || movie.poster_path);
    const imgSize = isLarge ? 'w342' : 'w500';
    const imgUrl = imgPath ? `${IMAGE_BASE_URL}/${imgSize}${imgPath}` : FALLBACK;

    const title = movie.title || movie.name || movie.original_title || 'Unknown';
    const rating = movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A';
    const year = (movie.release_date || movie.first_air_date || '').slice(0, 4);
    const mediaType = movie.media_type === 'tv' ? 'tv' : 'movie';

    const showToast = (msg) => {
        setToast(msg);
        setTimeout(() => setToast(''), 2500);
    };

    const handlePlay = async () => {
        if (trailerKey) {
            setShowTrailer(true);
            return;
        }
        setLoadingTrailer(true);
        try {
            const res = await fetchMovieVideos(movie.id, mediaType);
            const trailer = res.data.results.find(v => v.type === 'Trailer' && v.site === 'YouTube')
                || res.data.results.find(v => v.site === 'YouTube');
            if (trailer) {
                setTrailerKey(trailer.key);
                setShowTrailer(true);
            } else {
                showToast('No trailer available');
            }
        } catch {
            showToast('Could not load trailer');
        } finally {
            setLoadingTrailer(false);
        }
    };

    const handleAdd = () => {
        setAdded(prev => {
            const next = !prev;
            showToast(next ? `Added "${title}" to My List` : `Removed from My List`);
            return next;
        });
    };

    const handleLike = () => {
        setLiked(prev => {
            const next = !prev;
            showToast(next ? `You liked "${title}"` : `Like removed`);
            return next;
        });
    };

    return (
        <>
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
                                <button
                                    className={`movie-card__play ${loadingTrailer ? 'movie-card__play--loading' : ''}`}
                                    title="Play"
                                    onClick={handlePlay}
                                >
                                    {loadingTrailer ? (
                                        <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" className="spin">
                                            <path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z" />
                                        </svg>
                                    ) : (
                                        <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                                            <path d="M8 5v14l11-7z" />
                                        </svg>
                                    )}
                                </button>
                                <button
                                    className={`movie-card__add ${added ? 'movie-card__add--active' : ''}`}
                                    title={added ? 'Remove from list' : 'Add to list'}
                                    onClick={handleAdd}
                                >
                                    {added ? '✓' : '+'}
                                </button>
                                <button
                                    className={`movie-card__like ${liked ? 'movie-card__like--active' : ''}`}
                                    title={liked ? 'Unlike' : 'Thumbs up'}
                                    onClick={handleLike}
                                >
                                    👍
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {toast && <div className="movie-card__toast">{toast}</div>}
            </div>

            {showTrailer && trailerKey && (
                <div className="movie-card__trailer-overlay" onClick={() => setShowTrailer(false)}>
                    <div className="movie-card__trailer-wrap" onClick={e => e.stopPropagation()}>
                        <button className="movie-card__trailer-close" onClick={() => setShowTrailer(false)}>✕</button>
                        <iframe
                            src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
                            title={`${title} Trailer`}
                            allowFullScreen
                            allow="autoplay"
                        />
                    </div>
                </div>
            )}
        </>
    );
};

export default MovieCard;
