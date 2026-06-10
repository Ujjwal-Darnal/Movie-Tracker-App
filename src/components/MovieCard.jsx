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
  <div className="movie-card">

    {movie.posterUrl && (
      <img
        src={movie.posterUrl}
        alt={movie.title}
        className="movie-poster"
      />
    )}

    {isEditing ? (
      <div className="movie-info">
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

        <button onClick={handleSaveEdit}>
          Save
        </button>

        <button onClick={() => setIsEditing(false)}>
          Cancel
        </button>
      </div>
    ) : (
      <div className="movie-info">
        <h3>{movie.title}</h3>

        <p>Genre: {movie.genre}</p>

        <p>Status: {movie.status}</p>

        <p>Rating: {movie.rating}/10</p>

        {movie.isFavourite && <span>⭐ Favourite</span>}
      </div>
    )}

    <div className="movie-actions">
      <select
        value={movie.rating}
        onChange={(e) =>
          onUpdateRating(movie.id, e.target.value)
        }
      >
        <option value="0">Rate</option>

        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
          <option key={n} value={n}>
            {n}
          </option>
        ))}
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

      <button onClick={() => setIsEditing(true)}>
        Edit
      </button>

      <button onClick={() => onDeleteMovie(movie.id)}>
        Delete
      </button>
    </div>
  </div>
);
}

export default MovieCard;