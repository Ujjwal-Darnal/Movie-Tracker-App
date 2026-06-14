import { useState, useEffect } from "react";
import "./styles/App.css";
import Navbar from "./components/Navbar";
import StatsCard from "./components/StatsCard";
import MovieForm from "./components/MovieForm";
import MovieList from "./components/MovieList";
import TmdbMovieCard from "./components/TmdbMovieCard";
import TmdbResults from "./components/TmdbResults";

function App() {
  // ===== Load movies from localStorage or use default movie =====
  const [movies, setMovies] = useState(() => {
    const savedMovies = localStorage.getItem("movies");

    if (savedMovies) {
      return JSON.parse(savedMovies);
    }

    return [
      {
        id: 1,
        title: "Interstellar",
        genre: "Sci-Fi",
        status: "Watched",
        rating: 9,
        isFavourite: false,
        posterUrl: "",
      },
    ];
  });

  // ===== App states =====
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const [apiMovies, setApiMovies] = useState([]);
  const[isLoading,setIsLoading] = useState(false);
  const[error,setError] = useState("");
  const[hasSearched,setHasSearched] = useState(false);

  // ===== Function to add movie manually =====
  function handleAddMovie(movieData) {
    const newMovie = {
      id: Date.now(),
      title: movieData.title,
      genre: movieData.genre,
      status: movieData.status,
      rating: movieData.rating,
      isFavourite: false,
      posterUrl: movieData.posterUrl,
    };

    setMovies((prevMovies) => [...prevMovies, newMovie]);
  }

  // ===== Function to toggle movie status =====
  function handleToggleStatus(movieId) {
    const updatedMovies = movies.map((movie) => {
      if (movie.id === movieId) {
        return {
          ...movie,
          status: movie.status === "Watched" ? "Watchlist" : "Watched",
        };
      }

      return movie;
    });

    setMovies(updatedMovies);
  }

  // ===== Function to delete movie =====
  function handleDeleteMovie(movieId) {
    const updatedMovies = movies.filter((movie) => movie.id !== movieId);
    setMovies(updatedMovies);
  }

  // ===== Function to handle favourite movies =====
  function handleToggleFavourite(movieId) {
    const updatedMovies = movies.map((movie) => {
      if (movie.id === movieId) {
        return {
          ...movie,
          isFavourite: !movie.isFavourite,
        };
      }

      return movie;
    });

    setMovies(updatedMovies);
  }

  // ===== Function to update rating =====
  function handleUpdateRating(movieId, newRating) {
    const updatedMovies = movies.map((movie) => {
      if (movie.id === movieId) {
        return {
          ...movie,
          rating: Number(newRating),
        };
      }

      return movie;
    });

    setMovies(updatedMovies);
  }

  // ===== Function to edit movie title and genre =====
  function handleEditMovie(movieId, updatedData) {
    const updatedMovies = movies.map((movie) => {
      if (movie.id === movieId) {
        return {
          ...movie,
          title: updatedData.title,
          genre: updatedData.genre,
        };
      }

      return movie;
    });

    setMovies(updatedMovies);
  }

  // ===== Function to add movie from TMDB API =====
  function handleAddApiMovie(movie) {
   
    const alreadyExists = movies.some((savedMovie) => savedMovie.tmdbId === movie.id);
   if(alreadyExists){
    alert("This movie is already in your tracker.")
    return;
   }
    const newMovie = {
      id: Date.now(),
      tmdbId:movie.id,
      title: movie.title,
      genre: "Unknown",
      status: "Watchlist",
      rating: Math.round(movie.vote_average / 2),
      isFavourite: false,
      posterUrl: movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : "",
      releaseDate: movie.release_date,
    };

    setMovies((prevMovies) => [...prevMovies, newMovie]);

    // Clear search results after adding movie
    setSearchTerm("");
    setApiMovies([]);
    setSelectedFilter("All");
    setHasSearched(false);
  }

  // ===== Stats calculations =====
  const totalMovies = movies.length;

  const watchedMovies = movies.filter(
    (movie) => movie.status === "Watched"
  ).length;

  const watchlistMovies = movies.filter(
    (movie) => movie.status === "Watchlist"
  ).length;

  const favouriteMovies = movies.filter(
    (movie) => movie.isFavourite === true
  ).length;

  // ===== Filter movies by search and selected filter =====
  const filteredMovies = movies.filter((movie) => {
    const matchesSearch = movie.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesFilter =
      selectedFilter === "All" ||
      movie.status === selectedFilter ||
      (selectedFilter === "Favourites" && movie.isFavourite);

    return matchesSearch && matchesFilter;
  });

  // ===== Sort movies =====
  const sortedMovies = [...filteredMovies].sort((a, b) => {
    if (sortBy === "rating") {
      return b.rating - a.rating;
    }

    if (sortBy === "title") {
      return a.title.localeCompare(b.title);
    }

    return b.id - a.id;
  });

  // ===== Save movies to localStorage when movies change =====
  useEffect(() => {
    localStorage.setItem("movies", JSON.stringify(movies));
  }, [movies]);

  // ======= debounced tmdb search ======//
  useEffect(()=>{
    if(!searchTerm.trim()){
      setApiMovies([]);
      setHasSearched(false);
      return;
    }
    const timer  = setTimeout(()=>{
      searchMoviesFromApi(searchTerm);
    },500);

    return()=>clearTimeout(timer);
  },[searchTerm])
  // ===== TMDB search function =====
  async function searchMoviesFromApi(query) {
    if (!query.trim()) return;
    setHasSearched(true);

    setIsLoading(true);

    setError("");

    try{
      const apiKey = import.meta.env.VITE_TMDB_API_KEY;

    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`
    );

if(!response.ok){
  throw new Error("Failed to fetch movies");
}
    const data = await response.json();

    setApiMovies(data.results);
}
catch (error){
  setError("Something went wrong.Please try again.");
} finally{
  setIsLoading(false);
}
  }

  return (
    <div className="app">
      <Navbar />

      <main className="dashboard">
        <section className="hero-section">
          <h1>Your Personal Movie Dashboard</h1>
          <p>
            Organize your watchlist, track watched movies, save favourites and
            manage your personal ratings.
          </p>
        </section>

        <section className="stats-grid">
          <StatsCard title="Total Movies" value={totalMovies} />
          <StatsCard title="Watched" value={watchedMovies} />
          <StatsCard title="Watchlist" value={watchlistMovies} />
          <StatsCard title="Favourites" value={favouriteMovies} />
        </section>

        <MovieForm onAddMovie={handleAddMovie} />

        <section className="movie-panel">
          <div className="panel-header">
            <h2>My Movies</h2>

            <input
              type="text"
              placeholder="Search Movies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

          
          </div>

          {/* show error message  */}
          {error && (
            <p className="error-message">{error}</p>
          )}

          {/* loading search movies message .. */}
          {isLoading && (
            <p className="loading-message">Searching movies....</p>
          )}

        {/* empty state handling for api movies */}
        {hasSearched &&
  !isLoading &&
  !error &&
  apiMovies.length === 0 && (
    <p className="empty-api-message">
      No movies found.
    </p>
)}

{apiMovies.length > 0 && (
  <TmdbResults
    apiMovies={apiMovies}
    savedMovies = {movies}
    onAddMovie={handleAddApiMovie}
  />
)}
   
          <div className="filter-buttons">
            {["All", "Watched", "Watchlist", "Favourites"].map((filter) => (
              <button
                key={filter}
                className={selectedFilter === filter ? "active-filter" : ""}
                onClick={() => setSelectedFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="sort-box">
            <label>Sort By</label>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="newest">Newest first</option>
              <option value="rating">Highest rating</option>
              <option value="title">A-Z title</option>
            </select>
          </div>

          <MovieList
            movies={sortedMovies}
            searchTerm={searchTerm}
            onToggleStatus={handleToggleStatus}
            onDeleteMovie={handleDeleteMovie}
            onToggleFavourite={handleToggleFavourite}
            onUpdateRating={handleUpdateRating}
            onEditMovie={handleEditMovie}
          />
        </section>
      </main>
    </div>
  );
}

export default App;