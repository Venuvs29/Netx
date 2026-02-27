import React, { useState, useEffect } from 'react';
import { fetchTrending, fetchMovieVideos, IMAGE_BASE_URL } from '../api/tmdb';
import './Hero.css';

const Hero = () => {
    const [movie, setMovie] = useState(null);
    const [trailerKey, setTrailerKey] = useState(null);
    const [showTrailer, setShowTrailer] = useState(false);

    useEffect(() => {
        const load = async () => {
            try {
                const { data } = await fetchTrending();
                const results = data.results.filter(m => m.backdrop_path);
                const pick = results[Math.floor(Math.random() * Math.min(5, results.length))];
                setMovie(pick);
                const mediaType = pick.media_type === 'tv' ? 'tv' : 'movie';
                const vRes = await fetchMovieVideos(pick.id, mediaType);
                const trailer = vRes.data.results.find(
                    v => v.type === 'Trailer' && v.site === 'YouTube'
                );
                if (trailer) setTrailerKey(trailer.key);
            } catch (err) {
                console.error('Hero fetch error', err);
            }
        };
        load();
    }, []);

    if (!movie) {
        return (
            <div className="hero hero--loading">
                <div className="hero__skeleton" />
            </div>
        );
    }

    const title = movie.title || movie.name || movie.original_title;
    const overview = movie.overview?.slice(0, 180) + (movie.overview?.length > 180 ? '...' : '');
    const backdropUrl = `${IMAGE_BASE_URL}/original${movie.backdrop_path}`;
    const isTV = movie.media_type === 'tv';
    const rating = movie.vote_average ? movie.vote_average.toFixed(1) : null;
    const year = (movie.release_date || movie.first_air_date || '').slice(0, 4);

    return (
        <div className="hero" style={{ backgroundImage: `url(${backdropUrl})` }}>
            <div className="hero__overlay" />

            <div className="hero__content">
                {/* Badges */}
                <div className="hero__badges">
                    {isTV && (
                        <span className="hero__badge hero__badge--type">
                            <span className="hero__badge-n">N</span>
                            <span className="hero__badge-label">SERIES</span>
                        </span>
                    )}
                    {!isTV && (
                        <span className="hero__badge hero__badge--type">
                            <span className="hero__badge-n">N</span>
                            <span className="hero__badge-label">FILM</span>
                        </span>
                    )}
                </div>

                {/* Title */}
                <h1 className="hero__title">{title}</h1>

                {/* Meta info */}
                <div className="hero__meta">
                    {rating && <span className="hero__match">{Math.round(rating * 10)}% Match</span>}
                    {year && <span className="hero__year">{year}</span>}
                    <span className="hero__maturity">TV-MA</span>
                    <span className="hero__seasons">{isTV ? '1 Season' : '2h'}</span>
                    <span className="hero__hd">HD</span>
                </div>

                <p className="hero__description">{overview}</p>

                <div className="hero__buttons">
                    <button
                        className="hero__btn hero__btn--play"
                        onClick={() => trailerKey && setShowTrailer(true)}
                    >
                        <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
                            <path d="M8 5v14l11-7z" />
                        </svg>
                        Play
                    </button>
                    <button className="hero__btn hero__btn--info">
                        <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
                        </svg>
                        More Info
                    </button>
                </div>
            </div>

            <div className="hero__fade-bottom" />

            {showTrailer && trailerKey && (
                <div className="hero__trailer-overlay" onClick={() => setShowTrailer(false)}>
                    <div className="hero__trailer-wrap" onClick={e => e.stopPropagation()}>
                        <button className="hero__trailer-close" onClick={() => setShowTrailer(false)}>✕</button>
                        <iframe
                            src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
                            title="Trailer"
                            allowFullScreen
                            allow="autoplay"
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Hero;
