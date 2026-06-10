import {useState} from "react"
function MovieForm({onAddMovie}){
    const [formData,setFormData]=useState({
        title:"",
        genre:"",
        status:"Watchlist",
        rating:0,
        posteUrl:"", 
    });
 
    function handleSubmit(e) {
  e.preventDefault();

  if (!formData.title.trim()) return;

  onAddMovie({
    ...formData,
    rating: Number(formData.rating),
  });

  setFormData({
    title: "",
    genre: "",
    status: "Watchlist",
    rating: 0,
    posteUrl:"",
  });
}




    function handleChange(e){
        const {name,value} = e.target;

        setFormData({
            ...formData,
            [name]:value,
        });
    }
    return(
        <form className="movie-form" onSubmit={handleSubmit}>
          <input
  type="text"
  name="title"
  placeholder="Movie title"
  value={formData.title}
  onChange={handleChange}
/>

<input
  type="text"
  name="posterUrl"
  placeholder="Poster image URL"
  value={formData.posterUrl}
  onChange={handleChange}
/>

<input
  type="text"
  name="genre"
  placeholder="Genre"
  value={formData.genre}
  onChange={handleChange}
/>



<select
  name="status"
  value={formData.status}
  onChange={handleChange}
>
  <option value="Watchlist">Watchlist</option>
  <option value="Watched">Watched</option>
</select>

<select
  name="rating"
  value={formData.rating}
  onChange={handleChange}
>
  <option value="0">Rate</option>
  <option value="1">1</option>
  <option value="2">2</option>
  <option value="3">3</option>
  <option value="4">4</option>
  <option value="5">5</option>
  <option value="6">6</option>
  <option value="7">7</option>
  <option value="8">8</option>
  <option value="9">9</option>
  <option value="10">10</option>
</select>

<button type="submit">
  Add Movie
</button>
             
        </form>
    )
}
export default MovieForm;