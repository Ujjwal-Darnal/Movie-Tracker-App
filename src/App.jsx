import "./styles/App.css";
function App(){
  return(
   <div className="app">
    <header className="navbar">
      <div>
        <h1>Movie Tracker App</h1>
    <p>Your personal movie collection manager</p>

      </div>
    <button className="add-btn">+Add Movie</button>
    </header>

<main className="dashboard">
  <section className="hero-section">
    <h1>Your Personal Movie Dashboard</h1>
    <p>Organize your watchlist,track watched movies, save favourites and manage your personal ratings.</p>
  </section>

  <section className="stats-grid">
    <div className="stat-card">
      <span>Total Movies</span>
      <h3>0</h3>
    </div>
    <div className="stat-card">
      <span>Watched</span>
      <h3>0</h3>
    </div>
    <div className="stat-card">
      <span>Watchlist</span>
      <h3>0</h3>
    </div>
    <div className="stat-card">
      <span>Favourites</span>
      <h3>0</h3>
    </div>
  </section>

  <section className="movie-panel">
    <div className="panel-header">
      <h2>My Movies</h2>
      <input type="text"
      placeholder="Search Movies..." />
    </div>

    <div className="empty-state">
      <h3>No movies added yet</h3>
      <p>Start by adding your first movie to the tracker.</p>
    </div>
  </section>
</main>

   </div>
  )
}
export default App;