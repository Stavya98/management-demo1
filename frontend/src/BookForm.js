import React, { useState, useEffect } from 'react';
import axios from 'axios';

function BookForm({ refresh, book, setBook }) {
  const [form, setForm] = useState({ title: '', author: '', isbn: '', publishedDate: '' });

  useEffect(() => {
    if (book) setForm(book);
  }, [book]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    if (book) {
      await axios.put(`http://localhost:5000/api/books/${book._id}`, form);
    } else {
      await axios.post('http://localhost:5000/api/books', form);
    }
    setForm({ title: '', author: '', isbn: '', publishedDate: '' });
    setBook(null);
    refresh();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="title" value={form.title} onChange={handleChange} placeholder="Title" required />
      <input name="author" value={form.author} onChange={handleChange} placeholder="Author" required />
      <input name="isbn" value={form.isbn} onChange={handleChange} placeholder="ISBN" />
      <input name="publishedDate" value={form.publishedDate} onChange={handleChange} placeholder="Published Date" />
      <button type="submit">{book ? 'Update' : 'Add'} Book</button>
    </form>
  );
}

export default BookForm;
