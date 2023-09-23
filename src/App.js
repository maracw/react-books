import { useState } from "react";
import BookCreate from './Components/BookCreate'

function App () {

    const [books, setBooks] = useState([]);

    // createBook is really handleBookCreate
    const createBook = (title) =>{
        console.log("Add book with title: " + title);
    } 

    return (<div>
        <BookCreate onCreate={createBook} />
    </div>)
}

export default App;