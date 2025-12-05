import React, { lazy, Suspense, useState } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope } from 'react-icons/fa';
import { useFetch } from '../../../hooks/useFetch';
import { getAllMessages, markAsRead, deleteMessage } from '../../../services/contactService';
import Loader from '../../../components/common/loader/Loader';
import ErrorMessage from '../../../components/common/error-message/ErrorMessage';
import './ViewMessages.css';

// Lazy load heavy components
const MessagesList = lazy(() => import('../MessagesList'));
const MessageDetail = lazy(() => import('../MessageDetail'));

const ContentLoader = () => (
  <div className="messages-layout">
    <div className="loader-skeleton" style={{ height: '400px', flex: 1 }} />
    <div className="loader-skeleton" style={{ height: '400px', flex: 1 }} />
  </div>
);

const ViewMessages = () => {
  const [selectedMessage, setSelectedMessage] = useState(null);
  const { data: messages, loading, error, refetch } = useFetch(getAllMessages);

  const handleMarkRead = async (id) => {
    try {
      await markAsRead(id);
      refetch();
    } catch {
      alert('Failed to mark as read');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      try {
        await deleteMessage(id);
        if (selectedMessage?._id === id) {
          setSelectedMessage(null);
        }
        refetch();
      } catch {
        alert('Failed to delete message');
      }
    }
  };

  if (loading) return <Loader fullScreen size="large" />;
  if (error) return <ErrorMessage message={error} onRetry={refetch} />;

  return (
    <div className="view-messages-page">
      {/* Header - loads immediately */}
      <div className="messages-header">
        <h1 className="messages-title">Contact Messages</h1>
        <p className="messages-subtitle">
          {messages?.filter((m) => !m.read).length || 0} unread messages
        </p>
      </div>

      {/* Content - lazy loaded */}
      <Suspense fallback={<ContentLoader />}>
        <div className="messages-layout">
          <MessagesList
            messages={messages}
            selectedMessage={selectedMessage}
            onSelectMessage={setSelectedMessage}
            onMarkRead={handleMarkRead}
          />

          <MessageDetail
            message={selectedMessage}
            onDelete={handleDelete}
          />
        </div>
      </Suspense>
    </div>
  );
};

export default ViewMessages;