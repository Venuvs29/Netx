import axios from 'axios';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;

export const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

const tmdb = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: 'en-US',
  },
});

export const fetchNetflixOriginals = () =>
  tmdb.get('/discover/tv', { params: { with_networks: 213 } });

export const fetchTrending = () =>
  tmdb.get('/trending/all/week');

export const fetchTopRated = () =>
  tmdb.get('/movie/top_rated');

export const fetchActionMovies = () =>
  tmdb.get('/discover/movie', { params: { with_genres: 28 } });

export const fetchComedyMovies = () =>
  tmdb.get('/discover/movie', { params: { with_genres: 35 } });

export const fetchHorrorMovies = () =>
  tmdb.get('/discover/movie', { params: { with_genres: 27 } });

export const fetchRomanceMovies = () =>
  tmdb.get('/discover/movie', { params: { with_genres: 10749 } });

export const fetchDocumentaries = () =>
  tmdb.get('/discover/movie', { params: { with_genres: 99 } });

export const fetchUpcoming = () =>
  tmdb.get('/movie/upcoming');

export const fetchAnimated = () =>
  tmdb.get('/discover/movie', { params: { with_genres: 16 } });


export const fetchMovieDetails = (id, mediaType = 'movie') =>
  tmdb.get(`/${mediaType}/${id}`);

export const fetchMovieVideos = (id, mediaType = 'movie') =>
  tmdb.get(`/${mediaType}/${id}/videos`);

export default tmdb;
