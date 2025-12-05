import React from 'react';
import { motion } from 'framer-motion';
import { FaTrash, FaEnvelope } from 'react-icons/fa';
import { formatDate } from '../../utils/formatDate';

const MessageDetail = ({ message, onDelete }) => {
  if (!message) {
    return (
      <div className="message-detail">
        <div className="no-message-selected">
          <FaEnvelope size={48} />
          <p>Select a message to view</p>
        </div>
      </div>
    );
  }

  return (
    <div className="message-detail">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="message-content"
      >
        <div className="message-detail-header">
          <div>
            <h2>{message.name}</h2>
            <p className="message-email">{message.email}</p>
            <p className="message-date-detail">{formatDate(message.createdAt)}</p>
          </div>

          <button
            onClick={() => onDelete(message._id)}
            className="delete-btn-large"
          >
            <FaTrash size={16} />
            Delete
          </button>
        </div>

        {message.subject && (
          <div className="message-subject-box">
            <strong>Subject:</strong> {message.subject}
          </div>
        )}

        <div className="message-body">
          <strong>Message:</strong>
          <p>{message.message}</p>
        </div>

        <div className="message-actions">
          <a
            href={`mailto:${message.email}?subject=Re: ${
              message.subject || 'Your message'
            }`}
            className="reply-btn"
          >
            Reply via Email
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default MessageDetail;