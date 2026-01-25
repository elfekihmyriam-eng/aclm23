"use client";

import { useState } from "react";

const books = [
  "/images/livre1.jpg",
  "/images/livre2.jpg",
  "/images/livre3.jpg",
  "/images/livre4.jpg",
  "/images/livre5.jpg",
];

export default function BooksShowcase() {
  const [index, setIndex] = useState(2);

  const prev = () => {
    setIndex((i) => (i === 0 ? books.length - 1 : i - 1));
  };

  const next = () => {
    setIndex((i) => (i === books.length - 1 ? 0 : i + 1));
  };

  return (
    <div className="books-showcase">
      <div className="books-stage">
        {books.map((src, i) => {
          const offset = i - index;
          if (Math.abs(offset) > 2) return null;

          return (
            <img
              key={i}
              src={src}
              className={`book book-${offset}`}
              alt=""
            />
          );
        })}
      </div>

      <div className="books-nav">
        <button onClick={prev}>←</button>
        <span>
          {index + 1}/{books.length}
        </span>
        <button onClick={next}>→</button>
      </div>

     <a href="#" className="books-cta">
  تعرّف على المزيد
</a>

    </div>
  );
}

