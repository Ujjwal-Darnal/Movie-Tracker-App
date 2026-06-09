function MovieCard({movie,

    onToggleStatus,
    onDeleteMovie,
onToggleFavourite}){
    return(
       <div>
        <h3>{movie.title}</h3>
        <p>Status:{movie.status}</p>
        <p>Rating:{movie.rating}/10</p>

        <button onClick={()=>onToggleStatus(movie.id)}>
            Mark as {movie.status === "Watched"?"Watchlist":"Watched"}
        </button>

        <button onClick={()=>onDeleteMovie(movie.id)}>Delete</button>

          <button onClick = {()=>onToggleFavourite(movie.id)}>{movie.isFavourite?"Remove Favourite":"Add Favourite"}</button>
       </div>
    );
    

     
}
export default MovieCard;