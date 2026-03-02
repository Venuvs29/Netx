import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import MovieRow from '../components/MovieRow';
import Footer from '../components/Footer';
import {
    fetchNetflixOriginals,
    fetchTrending,
    fetchTopRated,
    fetchActionMovies,
    fetchComedyMovies,
    fetchHorrorMovies,
    fetchRomanceMovies,
    fetchDocumentaries,
    fetchUpcoming,
    fetchAnimated,
} from '../api/tmdb';
import './Home.css';

const Home = () => {
    const [data, setData] = useState({
        netflixOriginals: [],
        trending: [],
        topRated: [],
        action: [],
        comedy: [],
        horror: [],
        romance: [],
        documentaries: [],
        upcoming: [],
        animated: [],
    });

    useEffect(() => {
        const fetchAll = async () => {
            try {
                const safeGet = async (fn) => {
                    try {
                        const res = await fn();
                        return res?.data?.results || [];
                    } catch {
                        return [];
                    }
                };

                const [
                    netflixOriginals,
                    trending,
                    topRated,
                    action,
                    comedy,
                    horror,
                    romance,
                    documentaries,
                    upcoming,
                    animated,
                ] = await Promise.all([
                    safeGet(fetchNetflixOriginals),
                    safeGet(fetchTrending),
                    safeGet(fetchTopRated),
                    safeGet(fetchActionMovies),
                    safeGet(fetchComedyMovies),
                    safeGet(fetchHorrorMovies),
                    safeGet(fetchRomanceMovies),
                    safeGet(fetchDocumentaries),
                    safeGet(fetchUpcoming),
                    safeGet(fetchAnimated),
                ]);

                setData({
                    netflixOriginals,
                    trending,
                    topRated,
                    action,
                    comedy,
                    horror,
                    romance,
                    documentaries,
                    upcoming,
                    animated,
                });
            } catch (err) {
                console.error('Failed to fetch movie data:', err);
            }
        };

        fetchAll();
    }, []);

    return (
        <div className="home">
            <Navbar />
            <Hero />
            <div className="home__rows">
                <MovieRow title="Netflix Originals" movies={data.netflixOriginals} isLarge />
                <MovieRow title="Trending Now" movies={data.trending} />
                <MovieRow title="Top Rated" movies={data.topRated} />
                <MovieRow title="Coming Soon" movies={data.upcoming} />
                <MovieRow title="Action Thrillers" movies={data.action} />
                <MovieRow title="Comedy" movies={data.comedy} />
                <MovieRow title="Horror" movies={data.horror} />
                <MovieRow title="Romance" movies={data.romance} />
                <MovieRow title="Animated" movies={data.animated} />
                <MovieRow title="Documentaries" movies={data.documentaries} />
            </div>
            <Footer />
        </div>
    );
};

export default Home;
