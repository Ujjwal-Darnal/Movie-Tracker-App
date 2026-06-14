import TmdbMovieCard from "./TmdbMovieCard";

function TmdbResults({ apiMovies, onAddMovie }) {
  return (
    <section className="api-results">
      <h2>Search Results</h2>

      <div className="api-movie-grid">
        {apiMovies.map((movie) => (
          <TmdbMovieCard
            key={movie.id}
            movie={movie}
            onAddMovie={onAddMovie}
          />
        ))}
      </div>
    </section>
  );
}

export default TmdbResults;