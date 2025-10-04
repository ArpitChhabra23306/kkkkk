// src/pages/BookList.jsx
import React, { useEffect, useState } from 'react';
import API from '../api/axios';
import BookCard from '../components/BookCard';
import Layout from '../components/Layout';

export default function BookList() {
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetch = async (p = 1) => {
    setLoading(true);
    try {
      const { data } = await API.get(`/books?page=${p}`);
      setBooks(data.books || []);
      setPage(data.page || p);
      setPages(data.pages || Math.ceil((data.total || (data.books?.length || 0)) / 5));
    } catch (err) {
      console.error(err);
      alert('Failed to load books');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetch(page); }, [page]);

  return (
    <Layout>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">All Books</h2>
      </div>

      {loading ? <div>Loading...</div> : (
        <>
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {books.map(b => <BookCard key={b._id} book={b} />)}
          </div>

          <div className="flex justify-center items-center mt-6 space-x-3">
            <button disabled={page <= 1} onClick={() => setPage(p => p - 1)} className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700">Prev</button>
            <span>Page {page} / {pages}</span>
            <button disabled={page >= pages} onClick={() => setPage(p => p + 1)} className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700">Next</button>
          </div>
        </>
      )}
    </Layout>
  );
}
