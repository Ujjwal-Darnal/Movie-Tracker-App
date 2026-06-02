function MovieCard({movie}){
    return(
       <div>
        <h3>{movie.title}</h3>
        <p>Status:{movie.status}</p>
        <p>Rating:{movie.rating}/10</p>
       </div>
    );
}
export default MovieCard;