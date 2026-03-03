export const MOCK_MOVIES = [
    {
        id: 1,
        title: "Stranger Things",
        name: "Stranger Things",
        backdrop_path: "/56v2KjHqiB63v3hZ2Xv8QC99S46.jpg",
        poster_path: "/x2LSRm21uTExS0UuHth6u7YBMjb.jpg",
        vote_average: 8.6,
        first_air_date: "2016-07-15",
        overview: "When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces and one strange little girl.",
        media_type: "tv"
    },
    {
        id: 2,
        title: "The Witcher",
        name: "The Witcher",
        backdrop_path: "/jBvL7True7S9zZcy67G2aOpnn1H.jpg",
        poster_path: "/7vjaCdSjLkdmグ.jpg", // Intentionally kept simple or real path
        vote_average: 8.2,
        first_air_date: "2019-12-20",
        overview: "Geralt of Rivia, a mutated monster-hunter for hire, journeys toward his destiny in a turbulent world where people often prove more wicked than beasts.",
        media_type: "tv"
    },
    {
        id: 3,
        title: "Inception",
        backdrop_path: "/8ZTPRkdTSYpXnu4bgS7pSgszzCl.jpg",
        poster_path: "/9gk7Y98S06o9G3fsS3C3vB3Afsz.jpg",
        vote_average: 8.4,
        release_date: "2010-07-15",
        overview: "Cobb, a skilled thief who steals secrets from deep within the subconscious during the dream state, is offered a chance at redemption.",
        media_type: "movie"
    },
    {
        id: 4,
        title: "The Dark Knight",
        backdrop_path: "/nMK9Szwu29qB629S9H9m7H64.jpg",
        poster_path: "/qJ2tW6WMUDr92SMRvqc_f9SChiK.jpg",
        vote_average: 8.5,
        release_date: "2008-07-16",
        overview: "Batman raises the stakes in his war on crime. With the help of Lt. Jim Gordon and District Attorney Harvey Dent, Batman sets out to dismantle the remaining criminal organizations that plague the streets.",
        media_type: "movie"
    },
    {
        id: 5,
        title: "Wednesday",
        name: "Wednesday",
        backdrop_path: "/iH909uP7cr7Xv7Xv7Xv.jpg",
        poster_path: "/9PFonB9tV31oIQP6ZlyO7Xv.jpg",
        vote_average: 8.7,
        first_air_date: "2022-11-23",
        overview: "Wednesday Addams is sent to Nevermore Academy, a bizarre boarding school where she attempts to master her emerging psychic ability.",
        media_type: "tv"
    }
];

export const getMockResponse = () => ({
    data: {
        results: MOCK_MOVIES
    }
});
