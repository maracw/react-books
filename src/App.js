import { useState, useEffect } from "react";
import axios from 'axios';
import BookCreate from './Components/BookCreate';
import BookList from './Components/BookList';

function App () {

    const [books, setBooks] = useState([]);

    const fetchBooks =async () =>{
        const response = await axios.get('http://localhost:3001/books');

        setBooks (response.data);
    }
    useEffect (() => {
        fetchBooks();
    }, [] );
    
    // createBook is really handleBookCreate
    const createBook = async (title) =>{
        const response = await axios.post('http://localhost:3001/books', {
            title
        });
        const updatedBooks = [
            ...books, response.data
        ];
        setBooks(updatedBooks);
    }; 

    const deleteBookById =(id) =>{
        const updatedBooks = books.filter((book) =>{
            return book.id!==id;
        });
        setBooks(updatedBooks);
    };

    const editBookById = (id, newTitle) =>{
        const updatedBooks = books.map((book)=> {
            if (book.id ==id) {
                return {...book, title: newTitle};
            }

            return book;
        });
        setBooks(updatedBooks);
    }; 


    return (<div>
                <div className="app">
                    <h1>Reading List</h1>
                    <BookList books= {books} 
                    onEdit = {editBookById}
                    onDelete={deleteBookById}/>
                </div>
                <div>
                    <BookCreate onCreate={createBook}
                     />
                </div>
        </div>);
}

export default App;