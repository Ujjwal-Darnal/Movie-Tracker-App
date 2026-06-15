function MovieModal({ movie, onClose, onAddMovie, isAlreadyAdded }) {
  return (
    <div className="modal-overlay">
      <div className="movie-modal">
        <button
          type="button"
          className="modal-close"
          onClick={onClose}
        >
          ✕
        </button>

        <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : "https://placehold.co/300x450?text=No+Poster"
          }
          alt={movie.title}
        />

        <div>
          <h2>{movie.title}</h2>

          <p>
            <strong>Release:</strong>{" "}
            {movie.release_date ? movie.release_date : "Unknown"}
          </p>

          <p>
            <strong>Rating:</strong>{" "}
            {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}
          </p>

          <p>
            {movie.overview || "No overview available."}
          </p>

          <button
            type="button"
            disabled={isAlreadyAdded}
            onClick={() => onAddMovie(movie)}
          >
            {isAlreadyAdded ? "Already Added" : "Add to Tracker"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default MovieModal;