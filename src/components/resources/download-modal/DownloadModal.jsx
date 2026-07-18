import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaDownload, FaCheckCircle } from 'react-icons/fa';
import { requestResourceDownload } from '../../../services/resourceService';
import './DownloadModal.css';

const DownloadModal = ({ resource, onClose }) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('');
  const [downloadUrl, setDownloadUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !email.includes('@')) {
      setStatus('error');
      setErrorMsg("That doesn't look like a valid email.");
      return;
    }

    try {
      setStatus('loading');
      const result = await requestResourceDownload(resource._id, email);
      setDownloadUrl(result.url);
      setStatus('success');
    } catch (err) {
      setStatus('error');
      setErrorMsg(
        err.response?.data?.message || 'Something went wrong. Try again in a bit.'
      );
    }
  };

  return (
    <motion.div
      className="download-modal-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="download-modal"
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        transition={{ type: 'spring', stiffness: 300, damping: 28 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="download-modal-close" onClick={onClose}>
          <FaTimes size={16} />
        </button>

        <AnimatePresence mode="wait">
          {status === 'success' ? (
            <motion.div
              key="success"
              className="download-modal-success"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <FaCheckCircle size={30} className="success-icon" />
              <h3>It's on its way</h3>
              <p>
                Sent to <strong>{email}</strong>. You can also grab it directly
                right now:
              </p>
              <a
                href={downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="download-modal-direct-link"
              >
                <FaDownload size={13} />
                Download now
              </a>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <span className="download-modal-tag">
                <span className="tag-dot" />
                {resource.category?.toLowerCase() || 'guide'}
              </span>
              <h3 className="download-modal-title">{resource.title}</h3>
              <p className="download-modal-desc">{resource.description}</p>

              <form className="download-modal-form" onSubmit={handleSubmit}>
                <input
                  type="email"
                  className="download-modal-input"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={status === 'loading'}
                  autoFocus
                />
                <button
                  type="submit"
                  className="download-modal-btn"
                  disabled={status === 'loading'}
                >
                  {status === 'loading' ? 'Sending...' : 'Get the guide'}
                </button>
              </form>

              {status === 'error' && (
                <p className="download-modal-error">{errorMsg}</p>
              )}

              <p className="download-modal-note">
                Sends the guide to your inbox. No spam &mdash; unsubscribe any time.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default DownloadModal;