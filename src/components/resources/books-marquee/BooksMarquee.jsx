import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useFetch } from '../../../hooks/useFetch';
import { getAllBooks } from '../../../services/bookService';
import './BooksMarquee.css';

const BooksMarquee = () => {
  const { data: books } = useFetch(getAllBooks);
  const [hoveredId, setHoveredId] = useState(null);

  if (!books || books.length === 0) {
    return null;
  }

  // Duplicate the list for a seamless loop, same technique as the Hero marquee
  const doubled = [...books, ...books];

  return (
    <section className="books-marquee-section">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <span className="tag">
          <span className="tag-dot" />
          case file &middot; reading list
        </span>
        <h2 className="books-marquee-title">Books That Inspire Me</h2>
        <p className="books-marquee-subtitle">
          Not a curated "best of" list &mdash; just what's actually shaped how I think about building.
        </p>
      </motion.div>

      <div className="books-marquee-track-wrapper">
        <div className="books-marquee-track">
          {doubled.map((book, i) => (
            <div
              key={`${book._id}-${i}`}
              className="book-cover-item"
              onMouseEnter={() => setHoveredId(`${book._id}-${i}`)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className="book-cover-frame">
                {book.coverUrl ? (
                  <img src={book.coverUrl} alt={book.title} loading="lazy" />
                ) : (
                  <div className="book-cover-fallback">
                    <span>{book.title}</span>
                  </div>
                )}
              </div>

              <div
                className={`book-cover-caption ${
                  hoveredId === `${book._id}-${i}` ? 'book-cover-caption-visible' : ''
                }`}
              >
                <p className="book-cover-title">{book.title}</p>
                {book.author && <p className="book-cover-author">{book.author}</p>}
                {book.note && <p className="book-cover-note">{book.note}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BooksMarquee;