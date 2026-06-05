import { useState } from "react";
import "./styles/App.css";
import Navbar from "./components/Navbar";
import StatsCard from "./components/StatsCard";
import MovieForm from "./components/MovieForm";
import MovieList from "./components/MovieList";




function App() {
  const [movies, setMovies] = useState([
    {
      id: 1,
      title: "Interstellar",
      status: "Watched",
      rating: 9,
    }
  ]);

  const [searchTerm, setSearchTerm]= useState("");


  // function to handle movie 

  function handleAddMovie(movieTitle) {
    const newMovie = {
      id: Date.now(),
      title: movieTitle,
      genre: "Action",
      status: "Watchlist",
      rating: 0
    }
    setMovies([...movies, newMovie
    ]);
  }

function handleToggleStatus(movieId){
  const updatedMovies = movies.map((movie)=>{
    if(movie.id === movieId){
      return{
        ...movie,
        status:movie.status === "Watched"?"Watchlist":"Watched",
      };
    }
    return movie;
  })
  setMovies(updatedMovies);
}


  const totalMovies = movies.length;

  const watchedMovies = movies.filter((movie) => movie.status === "Watched").length;

  const watchlistMovies = movies.filter((movie) => movie.status === "Watchlist").length;

  const filteredMovies = movies.filter((movie)=> movie.title.toLowerCase().includes(searchTerm.toLowerCase()));


  return (
    <div className="app">
      <Navbar />

      <main className="dashboard">
        <section className="hero-section">
          <h1>Your Personal Movie Dashboard</h1>
          <p>Organize your watchlist,track watched movies, save favourites and manage your personal ratings.</p>
        </section>

        <section className="stats-grid">
          <StatsCard title="Total Movies" value={totalMovies} />
          <StatsCard title="Watched" value={watchedMovies} />
          <StatsCard title="Watchlist" value={watchlistMovies} />
          <StatsCard title="Favourites" value={0} />
        </section>

        <MovieForm onAddMovie={handleAddMovie} />

        <section className="movie-panel">
          <div className="panel-header">
            <h2>My Movies</h2>
            <input type="text"
              placeholder="Search Movies..."
              value={searchTerm}
              onChange = {(e)=>setSearchTerm(e.target.value)} />
          </div>

          <MovieList movies={filteredMovies}
          onToggleStatus = {handleToggleStatus} />
        </section>
      </main>


    </div>
  )
}
export default App;