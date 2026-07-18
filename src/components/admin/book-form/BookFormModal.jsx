import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { FaTimes, FaSync } from 'react-icons/fa';
import { createBook, updateBook } from '../../../services/bookService';
import Input from '../../common/input/Input';
import Textarea from '../../common/textarea/Textarea';
import Button from '../../common/button/Button';
import '../resource-form/ResourceFormModal.css'; // shares the same modal chrome

const BookFormModal = ({ book, onClose }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: book || {
      title: '',
      author: '',
      note: '',
      coverUrl: '',
      order: 0,
    },
  });

  const coverUrl = watch('coverUrl');

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const onSubmit = async (data, refetchCover = false) => {
    try {
      setIsSubmitting(true);
      setSubmitError('');

      const payload = { ...data, order: Number(data.order) || 0 };
      if (refetchCover) payload.refetchCover = true;

      if (book) {
        await updateBook(book._id, payload);
      } else {
        await createBook(payload); // backend auto-fetches a cover if coverUrl is blank
      }

      onClose();
    } catch (error) {
      setSubmitError(error.response?.data?.message || 'Failed to save book');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="modal-overlay" onClick={onClose}>
        <motion.div
          className="resource-form-modal"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="modal-header">
            <h2>{book ? 'Edit Book' : 'Add a Book'}</h2>
            <button onClick={onClose} className="modal-close-btn">
              <FaTimes size={18} />
            </button>
          </div>

          <form onSubmit={handleSubmit((data) => onSubmit(data, false))} className="resource-form">
            <Input
              label="Title"
              name="title"
              placeholder="The Lean Startup"
              register={register}
              error={errors.title}
              required
            />

            <Input
              label="Author"
              name="author"
              placeholder="Eric Ries"
              register={register}
            />

            <Textarea
              label="Why it inspired you (optional)"
              name="note"
              placeholder="A line or two, shown as a tooltip/caption"
              rows={2}
              register={register}
            />

            <Input
              label="Order (lower shows first)"
              name="order"
              type="number"
              placeholder="0"
              register={register}
            />

            <div className="form-group">
              <label>Cover</label>
              {coverUrl && (
                <img src={coverUrl} alt="Cover preview" className="image-preview" />
              )}
              <p className="cover-help-text">
                Leave blank to auto-fetch from Open Library based on title + author.
              </p>
            </div>

            <Input
              label="Cover URL (manual override)"
              name="coverUrl"
              placeholder="https://..."
              register={register}
            />

            {book && (
              <button
                type="button"
                className="refetch-cover-btn"
                onClick={handleSubmit((data) => onSubmit(data, true))}
                disabled={isSubmitting}
              >
                <FaSync size={12} />
                Re-fetch cover from Open Library
              </button>
            )}

            {submitError && <p className="error-text">{submitError}</p>}

            <div className="form-actions">
              <Button type="button" variant="secondary" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" disabled={isSubmitting}>
                {isSubmitting ? 'Saving...' : book ? 'Update Book' : 'Add Book'}
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default BookFormModal;