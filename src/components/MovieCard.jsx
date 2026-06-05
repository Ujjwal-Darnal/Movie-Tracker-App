function MovieCard({movie,onToggleStatus}){
    return(
       <div>
        <h3>{movie.title}</h3>
        <p>Status:{movie.status}</p>
        <p>Rating:{movie.rating}/10</p>

        <button onClick={()=>onToggleStatus(movie.id)}>
            Mark as {movie.status === "Watched"?"Watchlist":"Watched"}
        </button>
       </div>
    );
}
export default MovieCard;