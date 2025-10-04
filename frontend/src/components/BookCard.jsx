// src/components/BookCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function BookCard({ book }) {
  return (
    <Link to={`/books/${book._id}`} className="block bg-white dark:bg-gray-800 rounded-xl shadow p-4 hover:shadow-xl transition transform hover:-translate-y-1">
      <h3 className="text-lg font-semibold">{book.title}</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400">{book.author}</p>
      <div className="mt-2 flex items-center justify-between">
        <span className="text-yellow-500 font-medium">⭐ {book.averageRating?.toFixed(1) || '0.0'}</span>
        <span className="text-xs text-gray-400">{book.reviewCount ?? 0} reviews</span>
      </div>
    </Link>
  );
}
