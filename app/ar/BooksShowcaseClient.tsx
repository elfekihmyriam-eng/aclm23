"use client";

import { useState } from "react";

type Book = {
  id: string;
  cover_url: string;
};

export default function BooksShowcaseClient({
  books,
}: {
  books: Book[];
}) {
  const safeBooks = Array.isArray(books) ? books : [];
  const [index, setIndex] = useState(0);

  if (safeBooks.length === 0) return null;

  const prev = () => {
    setIndex((i) =>
      i === 0 ? safeBooks.length - 1 : i - 1
    );
  };

  const next = () => {
    setIndex((i) =>
      i === safeBooks.length - 1 ? 0 : i + 1
    );
  };

  return (
    <div className="books-showcase">
      <div className="books-stage">
        {safeBooks.map((book, i) => {
          const offset = i - index;
          if (Math.abs(offset) > 2) return null;

          return (
            <img
              key={book.id}
              src={book.cover_url}
              className={`book book-${offset}`}
              alt=""
            />
          );
        })}
      </div>

      <div className="books-nav">
        <button onClick={prev}>←</button>
        <span>
          {index + 1}/{safeBooks.length}
        </span>
        <button onClick={next}>→</button>
      </div>

      <a href="/ar/books" className="books-cta">
        تعرّف على المزيد
      </a>
    </div>
  );
}


