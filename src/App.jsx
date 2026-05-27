import "./styles/App.css";
import Navbar from "./components/Navbar";
import StatsCard from "./components/StatsCard";
function App() {
  return (
    <div className="app">
      <Navbar />

      <main className="dashboard">
        <section className="hero-section">
          <h1>Your Personal Movie Dashboard</h1>
          <p>Organize your watchlist,track watched movies, save favourites and manage your personal ratings.</p>
        </section>

        <section className="stats-grid">
          <StatsCard title="Total Movies" value={0} />
          <StatsCard title="Watched" value={0} />
          <StatsCard title="Watchlist" value={0} />
          <StatsCard title="Favourites" value={0} />
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