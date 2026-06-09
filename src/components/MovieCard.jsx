function MovieCard({
  movie,
  onToggleStatus,
  onDeleteMovie,
  onToggleFavourite,
  onUpdateRating,
}) {
  return (
  <div className="movie-card">
    <div className="movie-info">
      <h3>{movie.title}</h3>

      <p>Genre: {movie.genre}</p>
      <p>Status: {movie.status}</p>
      <p>Rating: {movie.rating}/10</p>

      {movie.isFavourite && <span>⭐ Favourite</span>}
    </div>

    <div className="movie-actions">
      <select
        value={movie.rating}
        onChange={(e) =>
          onUpdateRating(movie.id, e.target.value)
        }
      >
        <option value="0">Rate</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
      </select>

      <button onClick={() => onToggleStatus(movie.id)}>
        {movie.status === "Watched"
          ? "Move to Watchlist"
          : "Mark as Watched"}
      </button>

      <button onClick={() => onToggleFavourite(movie.id)}>
        {movie.isFavourite
          ? "Remove Favourite"
          : "Add Favourite"}
      </button>

      <button onClick={() => onDeleteMovie(movie.id)}>
        Delete
      </button>
    </div>
  </div>
);
}

export default MovieCard;