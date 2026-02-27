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
                const [
                    netflixRes,
                    trendingRes,
                    topRatedRes,
                    actionRes,
                    comedyRes,
                    horrorRes,
                    romanceRes,
                    docsRes,
                    upcomingRes,
                    animatedRes,
                ] = await Promise.all([
                    fetchNetflixOriginals(),
                    fetchTrending(),
                    fetchTopRated(),
                    fetchActionMovies(),
                    fetchComedyMovies(),
                    fetchHorrorMovies(),
                    fetchRomanceMovies(),
                    fetchDocumentaries(),
                    fetchUpcoming(),
                    fetchAnimated(),
                ]);

                setData({
                    netflixOriginals: netflixRes.data.results,
                    trending: trendingRes.data.results,
                    topRated: topRatedRes.data.results,
                    action: actionRes.data.results,
                    comedy: comedyRes.data.results,
                    horror: horrorRes.data.results,
                    romance: romanceRes.data.results,
                    documentaries: docsRes.data.results,
                    upcoming: upcomingRes.data.results,
                    animated: animatedRes.data.results,
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
