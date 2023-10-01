import { createContext } from "react";
import { useState } from "react";
import axios from 'axios';

const SERVER_ADDRESS = 'http://localhost:3001/books/';

const BooksContext = createContext();

//create "outer" provider
function Provider ({children}){
    //create state inside this function
    const [books, setBooks] = useState([]);

    const fetchBooks =async () =>{
        const response = await axios.get(SERVER_ADDRESS);

        setBooks (response.data);
    }

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
    //create object to share
    const valueToShare = {
        books,
        deleteBookById,
        editBookById,
        createBook,
        fetchBooks
    };

    return (
        <BooksContext.Provider value={valueToShare}>
        {children}
        </BooksContext.Provider>
        );

}
export {Provider};
export default BooksContext;