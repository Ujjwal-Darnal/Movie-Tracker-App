function TmdbMovieCard({ movie, onAddMovie, isAlreadyAdded,onSelectMovie }) {
  return (
    <div className="api-movie-card" onClick={onSelectMovie}>
      <img
        src={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : "https://placehold.co/120x180?text=No+Poster"
        }
        alt={movie.title}
      />

      <h3>{movie.title}</h3>

      <p>
        {movie.release_date
          ? movie.release_date.slice(0, 4)
          : "No year"}
      </p>

      <button
        type="button"
        disabled={isAlreadyAdded}
        onClick={(e) => {
          e.stopPropagation();
          onAddMovie(movie);
        }}
      >
        {isAlreadyAdded ? "Added" : "Add to Tracker"}
      </button>
    </div>
  );
}

export default TmdbMovieCard;