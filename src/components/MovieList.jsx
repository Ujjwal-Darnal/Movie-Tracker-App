import MovieCard  from "./MovieCard";


function MovieList({movies}){
   if(movies.length === 0){
    return(
        <div className="empty-state">
            <h3>No Movies added yet</h3>
            <p>Start by adding your first movie to the tracker.</p>
        </div>
    );
   }


    return (
        <div className="movie-list">
            {movies.map((movie)=>(
               <MovieCard key = {movie.id} movie = {movie}/>
            ))}
        </div>
    );
}
export default MovieList;