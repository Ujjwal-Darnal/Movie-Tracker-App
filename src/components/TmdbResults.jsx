import TmdbMovieCard from "./TmdbMovieCard";
import { useState } from "react";
import MovieModal from "./MovieModal";
function TmdbResults({ apiMovies, savedMovies, onAddMovie }) {

  const [selectedMovie,setSelectedMovie] = useState(null);

  return (
    <section className="api-results">
      <h2>Search Results</h2>

      <div className="api-movie-grid">
        {apiMovies.map((movie) => {
          const isAlreadyAdded = savedMovies.some(
            (savedMovie) => savedMovie.tmdbId === movie.id
          );

          return (
            <TmdbMovieCard
              key={movie.id}
              movie={movie}
              onAddMovie={onAddMovie}
              isAlreadyAdded={isAlreadyAdded}
              onSelectMovie = {()=>setSelectedMovie(movie)}
            />
          );
        })}
      </div>
      
      {selectedMovie && (
  <MovieModal
    movie={selectedMovie}
    onClose={() => setSelectedMovie(null)}
    onAddMovie={onAddMovie}
    isAlreadyAdded={savedMovies.some(
      (savedMovie) =>
        savedMovie.tmdbId === selectedMovie.id
    )}
  />
)}
      
    </section>
  );
}

export default TmdbResults;