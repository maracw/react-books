import { useEffect, useContext } from "react";
import BookCreate from './Components/BookCreate';
import BookList from './Components/BookList';
import BooksContext from "./Context/books";

const SERVER_ADDRESS = 'http://localhost:3001/books/';

function App () {

   const {fetchBooks} =  useContext(BooksContext);
    //stays in app
    useEffect (() => {
        fetchBooks();
    }, [] );
    
    return (<div>
                <div className="app">
                    <h1>Reading List</h1>
                    <BookList />
                </div>
                <div>
                    <BookCreate />
                </div>
        </div>);
}

export default App;