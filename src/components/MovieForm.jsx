import { useState } from "react";

function MovieForm({ onAddMovie }) {
// ===== Form State =====//
const [formData, setFormData] = useState({
title: "",
genre: "",
status: "Watchlist",
rating: 0,
posterUrl: "",
});

// ===== Handle Form Submit ===== //
function handleSubmit(e) {
e.preventDefault();


// Basic validation//
if (!formData.title.trim() || !formData.genre) return;

onAddMovie({
  ...formData,
  rating: Number(formData.rating),
});

// Reset form after successful submission//
setFormData({
  title: "",
  genre: "",
  status: "Watchlist",
  rating: 0,
  posterUrl: "",
});


}

// ===== Handle Input Changes =====//
function handleChange(e) {
const { name, value } = e.target;


setFormData({
  ...formData,
  [name]: value,
});


}

return ( <form className="movie-form" onSubmit={handleSubmit}>


  {/* ===== Movie Title ===== */}
  <input
    type="text"
    name="title"
    placeholder="Movie title"
    value={formData.title}
    onChange={handleChange}
  />

  {/* ===== Optional Poster URL ===== */}
  <input
    type="text"
    name="posterUrl"
    placeholder="Poster image URL"
    value={formData.posterUrl}
    onChange={handleChange}
  />

  {/* ===== Genre Selection ===== */}
  <select
    name="genre"
    value={formData.genre}
    onChange={handleChange}
  >
    <option value="">Select Genre</option>
    <option value="Action">Action</option>
    <option value="Comedy">Comedy</option>
    <option value="Drama">Drama</option>
    <option value="Horror">Horror</option>
    <option value="Romance">Romance</option>
    <option value="Sci-Fi">Sci-Fi</option>
    <option value="Thriller">Thriller</option>
    <option value="Animation">Animation</option>
    <option value="Documentary">Documentary</option>
  </select>

  {/* ===== Movie Status ===== */}
  <select
    name="status"
    value={formData.status}
    onChange={handleChange}
  >
    <option value="Watchlist">Watchlist</option>
    <option value="Watched">Watched</option>
  </select>

  {/* ===== Personal Rating ===== */}
  <select
    name="rating"
    value={formData.rating}
    onChange={handleChange}
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

  <button type="submit">
    Add Movie
  </button>

</form>


);
}

export default MovieForm;
