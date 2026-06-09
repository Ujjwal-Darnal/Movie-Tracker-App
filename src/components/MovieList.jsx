import MovieCard  from "./MovieCard";


function MovieList({movies,
    searchTerm,
    onToggleStatus,
    onDeleteMovie,
    onToggleFavourite,
    onUpdateRating,


}){
   if(movies.length === 0){
    return(
   <div className="empty-state">
      <h3>{searchTerm ? "No movies found" : "No movies added yet"}</h3>
      <p>
        {searchTerm
          ? "Try searching with a different movie title."
          : "Start by adding your first movie to the tracker."}
      </p>
    </div>
    );
}

    return (
        <div className="movie-list">
            {movies.map((movie)=>(
               <MovieCard key = {movie.id}
                movie = {movie}
                onToggleStatus = {onToggleStatus}
                onDeleteMovie={onDeleteMovie}
                onToggleFavourite = {onToggleFavourite}
                onUpdateRating = {onUpdateRating}/>
            ))}
        </div>
    );
}
export default MovieList;