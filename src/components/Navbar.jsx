function Navbar({ onAddMovieClick }) {
  return (
    <header className="navbar">
      <div>
        <h1>Movie Tracker App</h1>
        <p>Your personal movie collection manager</p>
      </div>

      <button className="add-btn" onClick={onAddMovieClick}>
        + Add Movie
      </button>
    </header>
  );
}

export default Navbar;