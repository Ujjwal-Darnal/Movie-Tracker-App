import TmdbMovieCard from "./TmdbMovieCard";

function TmdbResults({ apiMovies, savedMovies, onAddMovie }) {
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
            />
          );
        })}
      </div>
    </section>
  );
}

export default TmdbResults;