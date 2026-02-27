import React, { useRef, useState } from 'react';
import MovieCard from './MovieCard';
import './MovieRow.css';

const MovieRow = ({ title, movies, isLarge }) => {
    const rowRef = useRef(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const scroll = (direction) => {
        const el = rowRef.current;
        const amount = el.clientWidth * 0.85;
        el.scrollBy({ left: direction === 'left' ? -amount : amount, behavior: 'smooth' });
    };

    const handleScroll = () => {
        const el = rowRef.current;
        setCanScrollLeft(el.scrollLeft > 0);
        setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 10);
    };

    if (!movies || movies.length === 0) return null;

    return (
        <div className="movie-row">
            <h2 className="movie-row__title">{title}</h2>
            <div className="movie-row__wrapper">
                {canScrollLeft && (
                    <button className="movie-row__btn movie-row__btn--left" onClick={() => scroll('left')}>
                        ‹
                    </button>
                )}
                <div className="movie-row__list" ref={rowRef} onScroll={handleScroll}>
                    {movies.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} isLarge={isLarge} />
                    ))}
                </div>
                {canScrollRight && (
                    <button className="movie-row__btn movie-row__btn--right" onClick={() => scroll('right')}>
                        ›
                    </button>
                )}
            </div>
        </div>
    );
};

export default MovieRow;
