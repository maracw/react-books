import { useState, useEffect } from "react";
import axios from 'axios';
import BookCreate from './Components/BookCreate';
import BookList from './Components/BookList';

const SERVER_ADDRESS = 'http://localhost:3001/books/';

function App () {

    const [books, setBooks] = useState([]);

    const fetchBooks =async () =>{
        const response = await axios.get(SERVER_ADDRESS);

        setBooks (response.data);
    }
    useEffect (() => {
        fetchBooks();
    }, [] );
    
    // createBook is really handleBookCreate
    const createBook = async (title) =>{
        const response = await axios.post(SERVER_ADDRESS, {
            title
        });
        const updatedBooks = [
            ...books, response.data
        ];
        setBooks(updatedBooks);
    }; 

    const  deleteBookById = async (id) =>{
        //send request
        const response = await axios.delete(SERVER_ADDRESS + id);

        const updatedBooks = books.filter((book) =>{
            return book.id!==id;
        });
        setBooks(updatedBooks);
    };

    const editBookById = async (id, newTitle) =>{
        //send request to server
        const response = await axios.put(SERVER_ADDRESS + id, {
            title: newTitle
        });
        console.log(response);
        
        //local updated with entire book object from response
        const updatedBooks = books.map((book)=> {
            if (book.id ==id) {
                return {...book, ...response.data};
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