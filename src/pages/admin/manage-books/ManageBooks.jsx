import React, { lazy, Suspense, useState } from 'react';
import { FaPlus, FaEdit, FaTrash, FaBook } from 'react-icons/fa';
import { useFetch } from '../../../hooks/useFetch';
import { getAllBooks, deleteBook } from '../../../services/bookService';
import Button from '../../../components/common/button/Button';
import Loader from '../../../components/common/loader/Loader';
import ErrorMessage from '../../../components/common/error-message/ErrorMessage';
import '../manage-resources/ManageResources.css';
import './ManageBooks.css';

const BookFormModal = lazy(() => import('../../../components/admin/book-form/BookFormModal'));

const ManageBooks = () => {
  const [showModal, setShowModal] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const { data: books, loading, error, refetch } = useFetch(getAllBooks);

  const handleCreate = () => {
    setEditingBook(null);
    setShowModal(true);
  };

  const handleEdit = (book) => {
    setEditingBook(book);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Remove this book from the list?')) {
      try {
        await deleteBook(id);
        refetch();
      } catch (error) {
        alert('Failed to delete book');
      }
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    setEditingBook(null);
    refetch();
  };

  if (loading) return <Loader fullScreen size="large" />;
  if (error) return <ErrorMessage message={error} onRetry={refetch} />;

  return (
    <div className="manage-resources-page">
      <div className="manage-header">
        <div>
          <h1 className="manage-title">Books That Inspire Me</h1>
          <p className="manage-subtitle">
            Powers the cover marquee on the Resources page
          </p>
        </div>
        <Button variant="primary" onClick={handleCreate}>
          <FaPlus size={15} />
          Add a Book
        </Button>
      </div>

      {books && books.length > 0 ? (
        <div className="books-grid">
          {books.map((book) => (
            <div className="book-card" key={book._id}>
              <div className="book-card-cover">
                {book.coverUrl ? (
                  <img src={book.coverUrl} alt={book.title} />
                ) : (
                  <FaBook size={22} />
                )}
              </div>
              <div className="book-card-info">
                <p className="book-card-title">{book.title}</p>
                {book.author && <p className="book-card-author">{book.author}</p>}
              </div>
              <div className="action-buttons">
                <button onClick={() => handleEdit(book)} className="action-btn edit-btn" title="Edit">
                  <FaEdit size={13} />
                </button>
                <button onClick={() => handleDelete(book._id)} className="action-btn delete-btn" title="Delete">
                  <FaTrash size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <FaBook size={32} />
          <h3>No books yet</h3>
          <p>Add the first one &mdash; The Lean Startup, The Mom Test, whatever actually shaped how you think.</p>
          <Button variant="primary" onClick={handleCreate}>
            Add a Book
          </Button>
        </div>
      )}

      {showModal && (
        <Suspense fallback={null}>
          <BookFormModal book={editingBook} onClose={handleModalClose} />
        </Suspense>
      )}
    </div>
  );
};

export default ManageBooks;