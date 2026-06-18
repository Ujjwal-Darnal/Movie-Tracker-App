import { useState } from "react";

function MovieCard({
  movie,
  onToggleStatus,
  onDeleteMovie,
  onToggleFavourite,
  onUpdateRating,
  onEditMovie,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(movie.title);
  const [editGenre, setEditGenre] = useState(movie.genre);

  function handleSaveEdit() {
    if (!editTitle.trim()) return;

    onEditMovie(movie.id, {
      title: editTitle,
      genre: editGenre,
    });

    setIsEditing(false);
  }

  return (
    <article className="movie-card">
      <img
        src={movie.posterUrl || "https://placehold.co/300x450?text=No+Poster"}
        alt={movie.title}
        className="movie-poster"
      />

      <div className="movie-card-content">
        {isEditing ? (
          <div className="movie-edit-form">
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
            />

            <input
              type="text"
              value={editGenre}
              onChange={(e) => setEditGenre(e.target.value)}
            />

            <button type="button" onClick={handleSaveEdit}>
              Save
            </button>

            <button type="button" onClick={() => setIsEditing(false)}>
              Cancel
            </button>
          </div>
        ) : (
          <>
            <h3>{movie.title}</h3>

            <p className="movie-meta">
              {movie.genre} • {movie.status}
            </p>

            <p className="movie-rating">⭐ {movie.rating}/10</p>

            {movie.isFavourite && (
              <span className="favourite-badge">Favourite</span>
            )}
          </>
        )}

        <div className="movie-actions">
          <select
            value={movie.rating}
            onChange={(e) => onUpdateRating(movie.id, e.target.value)}
          >
            <option value="0">Rate</option>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>

          <button type="button" onClick={() => onToggleStatus(movie.id)}>
            {movie.status === "Watched" ? "Watchlist" : "Watched"}
          </button>

          <button type="button" onClick={() => onToggleFavourite(movie.id)}>
            {movie.isFavourite ? "Unfavourite" : "Favourite"}
          </button>

          <button type="button" onClick={() => setIsEditing(true)}>
            Edit
          </button>

          <button type="button" onClick={() => onDeleteMovie(movie.id)}>
            Delete
          </button>
        </div>
      </div>
    </article>
  );
}

export default MovieCard;