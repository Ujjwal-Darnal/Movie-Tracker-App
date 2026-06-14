function TmdbMovieCard({movie,onAddMovie}){
    return(
        <div className="api-movie-grid">
                {apiMovies.map((movie) => (
                  <div className="api-movie-card" key={movie.id}>
                    <img
                      src={
                        movie.poster_path
                          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                          : "https://placehold.co/120x180?text=No+Poster"
                      }
                      alt={movie.title}
                    />

                    <h3>{movie.title}</h3>

                    <p>
                      {movie.release_date
                        ? movie.release_date.slice(0, 4)
                        : "No year"}
                    </p>

                    <button
                      type="button"
                      onClick={() => handleAddApiMovie(movie)}
                    >
                      Add to Tracker
                    </button>
                  </div>
                ))}
              </div>
    )
}
export default TmdbMovieCard;