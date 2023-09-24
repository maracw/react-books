import { useState } from "react";
import BookCreate from './Components/BookCreate';
import BookList from './Components/BookList';

function App () {

    const [books, setBooks] = useState([]);

    // createBook is really handleBookCreate
    const createBook = (title) =>{
        const updatedBooks = [
            ...books,
            {id: Math.round(Math.random()*9999),
                 title}
        ];
        setBooks(updatedBooks);
        console.log("Add book with title: " + title);
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