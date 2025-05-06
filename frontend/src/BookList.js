import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookForm from './BookForm';

function BookList() {
  const [books, setBooks] = useState([]);
  const [editingBook, setEditingBook] = useState(null);

  const fetchBooks = async () => {
    const res = await axios.get('http://localhost:5000/api/books');
    setBooks(res.data);
  };

  useEffect(() => { fetchBooks(); }, []);

  const deleteBook = async (id) => {
    await axios.delete(`http://localhost:5000/api/books/${id}`);
    fetchBooks();
  };

  return (
    <div>
      <BookForm refresh={fetchBooks} book={editingBook} setBook={setEditingBook} />
      <ul>
        {books.map(book => (
          <li key={book._id}>
            {book.title} by {book.author}
            <button onClick={() => setEditingBook(book)}>Edit</button>
            <button onClick={() => deleteBook(book._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BookList;
