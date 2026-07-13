import React from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaTrash, FaCopy } from 'react-icons/fa';
import { useFetch } from '../../../hooks/useFetch';
import { getSubscribers, unsubscribeSubscriber } from '../../../services/subscriberService';
import { formatDateShort } from '../../../utils/formatDate';
import Loader from '../../../components/common/loader/Loader';
import ErrorMessage from '../../../components/common/error-message/ErrorMessage';
import './ManageSubscribers.css';

const ManageSubscribers = () => {
  const { data: subscribers, loading, error, refetch } = useFetch(getSubscribers);

  const handleUnsubscribe = async (id) => {
    if (window.confirm('Remove this subscriber from the journey list?')) {
      try {
        await unsubscribeSubscriber(id);
        refetch();
      } catch {
        alert('Failed to unsubscribe');
      }
    }
  };

  const handleCopyAll = () => {
    const emails = subscribers?.map((s) => s.email).join(', ') || '';
    navigator.clipboard.writeText(emails);
    alert('Copied all emails to clipboard');
  };

  if (loading) return <Loader fullScreen size="large" />;
  if (error) return <ErrorMessage message={error} onRetry={refetch} />;

  return (
    <div className="manage-subscribers-page">
      <div className="subscribers-header">
        <div>
          <span className="tag">
            <span className="tag-dot" />
            case file &middot; subscribers
          </span>
          <h1 className="subscribers-title">Journey Subscribers</h1>
          <p className="subscribers-subtitle">
            {subscribers?.length || 0} people following along
          </p>
        </div>
        {subscribers?.length > 0 && (
          <button className="subscribers-copy-btn" onClick={handleCopyAll}>
            <FaCopy size={13} />
            Copy all emails
          </button>
        )}
      </div>

      {(!subscribers || subscribers.length === 0) ? (
        <div className="subscribers-empty">
          <FaEnvelope size={28} />
          <p>No subscribers yet. Once "Follow the journey" starts converting, they'll show up here.</p>
        </div>
      ) : (
        <div className="subscribers-list">
          {subscribers.map((sub) => (
            <motion.div
              className="subscriber-row"
              key={sub._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <span className="subscriber-email">{sub.email}</span>
              <span className="subscriber-date">
                {formatDateShort(sub.createdAt)}
              </span>
              <button
                className="subscriber-remove"
                onClick={() => handleUnsubscribe(sub._id)}
                title="Remove subscriber"
              >
                <FaTrash size={13} />
              </button>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageSubscribers;