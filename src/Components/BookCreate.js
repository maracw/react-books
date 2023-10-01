import { useState, useContext } from "react";
import App from "../App";
import BooksContext from "../Context/books";

function BookCreate () {

    const [title, setTitle] = useState('');
    const {createBook} = useContext(BooksContext);

    //event handler when user changes what is in the input text box
    const handleChange = (event) => {
        setTitle(event.target.value);
    } 
    //event handler for clicking the Add Book button or pressing enter
    const handleSubmit = (event) => {
        event.preventDefault();
        createBook(title);
        //clear the input field by updating title piece of state
        setTitle('');

    }
    return (<div className="book-create">
        <h3>Add a book</h3>
        <form onSubmit={handleSubmit}>
            <label>Title</label>
            <input className="input" value= {title} onChange={handleChange}/>
            <button className="button">Add book</button>
        </form>
    </div>)
}

export default BookCreate;