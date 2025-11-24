import React from 'react';
import { motion } from 'framer-motion';
import { FaExclamationCircle } from 'react-icons/fa';
import './ErrorMessage.css';

const ErrorMessage = ({ message, onRetry }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="error-message"
    >
      <FaExclamationCircle className="error-icon" />
      <div className="error-content">
        <p className="error-text">{message || 'Something went wrong'}</p>
        {onRetry && (
          <button onClick={onRetry} className="error-retry">
            Try Again
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default ErrorMessage;