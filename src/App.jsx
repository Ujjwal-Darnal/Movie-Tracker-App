import { useState,useEffect } from "react";
import "./styles/App.css";
import Navbar from "./components/Navbar";
import StatsCard from "./components/StatsCard";
import MovieForm from "./components/MovieForm";
import MovieList from "./components/MovieList";




function App() {

  const [movies,setMovies]=useState(()=>{
    const savedMovies = localStorage.getItem("movies");

    if(savedMovies){
      return JSON.parse(savedMovies)
    }
    return[
      {
          id: 1,
      title: "Interstellar",
      genre: "Sci-Fi",
      status: "Watched",
      rating: 9,
      isFavourite: false,
      },
    ];
  });

  const [searchTerm, setSearchTerm]= useState("");

  const [selectedFilter,setSelectedFilter] = useState("All");

  const [sortBy,setSortBy]= useState("newest");

  // function to handle movie 

  function handleAddMovie(movieData) {
    const newMovie = {
      id: Date.now(),
     title: movieData.title,
genre: movieData.genre,
status: movieData.status,
rating: movieData.rating,
isFavourite: false,
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
// ===== function to delete movie ===== 
function handleDeleteMovie(movieId){
  const updatedMovies = movies.filter((movie)=>movie.id!== movieId);

  setMovies(updatedMovies);
}

// ========== function to handle favourtie movies ===== ??
function handleToggleFavourite(movieId){
const updatedMovies = movies.map((movie)=>{
  if(movie.id=== movieId){
    return{
      ...movie,isFavourite:!movie.isFavourite,
    }
  }
  return movie;
});
setMovies(updatedMovies);
}

// ====== function to update rating ========== //
function handleUpdateRating(movieId,newRating){
  const updatedMovies = movies.map((movie)=>{
    if(movie.id===movieId){
      return{
        ...movie,
        rating:Number(newRating),
      }
    }
    return movie;
  })
  setMovies(updatedMovies);
}

// ==== function to edit movies ===== //
function handleEditMovie(movieId,updatedData){
  const updatedMovies = movies.map((movie)=>{
    if(movie.id === movieId){
      return{
        ...movie,
        title:updatedData.title,
        genre:updatedData.genre,
      };
    }
    return movie;
  })
  setMovies(updatedMovies);
}




  const totalMovies = movies.length;

  const watchedMovies = movies.filter((movie) => movie.status === "Watched").length;

  const watchlistMovies = movies.filter((movie) => movie.status === "Watchlist").length;

  // ======= filtered movies =====//
  const filteredMovies = movies.filter((movie)=>{
    const matchesSearch = movie.title.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter = selectedFilter === "All" || 
    movie.status === selectedFilter || 
    (selectedFilter === "Favourites" && movie.isFavourite);

    return matchesSearch
&& matchesFilter  })

//========= Sort Movies ========== //
const sortedMovies = [...filteredMovies].sort((a,b)=>{
  if(sortBy === "rating"){
    return b.rating - a.rating;
  }
  if(sortBy === "title"){
    return a.title.localeCompare(b.title);

  }
  return b.id - a.id;
})

  const favouriteMovies = movies.filter((movie)=>movie.isFavourite===true).length

  useEffect(()=>{
    localStorage.setItem("movies",JSON.stringify(movies));
  },[movies]);

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
          <StatsCard title="Favourites" value={favouriteMovies} />
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

          <div className="filter-buttons">
  {["All", "Watched", "Watchlist", "Favourites"].map((filter) => (
    <button
      key={filter}
      className={selectedFilter === filter ? "active-filter" : ""}
      onClick={() => setSelectedFilter(filter)}
    >
      {filter}
    </button>


  ))}
</div>

    <div className="sort-box">
      <label>SortBy</label>
<select 
value={sortBy}
onChange={(e)=>setSortBy(e.target.value)}
>
  <option value="newest">Newest first</option>
    <option value="rating">Highest rating</option>
    <option value="title">A-Z title</option>
</select>
    
    </div>

          <MovieList movies={sortedMovies}
          searchTerm={searchTerm}
          onToggleStatus = {handleToggleStatus} 
          onDeleteMovie = {handleDeleteMovie}
          onToggleFavourite={handleToggleFavourite}
          onUpdateRating = {handleUpdateRating}
          onEditMovie = {handleEditMovie}
          />
        </section>
      </main>


    </div>
  )
}
export default App;