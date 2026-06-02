import {useState} from "react"
function MovieForm({onAddMovie}){
    const[title,setTitle] = useState("");

    function handleSubmit(e){
        e.preventDefault();

        if(title.trim()== ""){
            return;
        }
        onAddMovie(title);
        setTitle("");
    }
    return(
        <form className="movie-form" onSubmit={handleSubmit}>
            <input
             type="text" 
             placeholder="Enter movie title"
             value = {title}
             onChange = {(e)=>setTitle(e.target.value)}/>

<button type="submit">Add Movie</button>
             
        </form>
    )
}
export default MovieForm;