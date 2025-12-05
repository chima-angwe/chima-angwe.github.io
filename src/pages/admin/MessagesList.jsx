import React from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaEnvelopeOpen } from 'react-icons/fa';
import { formatDate } from '../../utils/formatDate';

const MessagesList = ({
  messages,
  selectedMessage,
  onSelectMessage,
  onMarkRead,
}) => {
  return (
    <div className="messages-list">
      {messages && messages.length > 0 ? (
        messages.map((message) => (
          <motion.div
            key={message._id}
            className={`message-item ${!message.read ? 'unread' : ''} ${
              selectedMessage?._id === message._id ? 'active' : ''
            }`}
            onClick={() => {
              onSelectMessage(message);
              if (!message.read) onMarkRead(message._id);
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="message-icon">
              {message.read ? (
                <FaEnvelopeOpen size={20} />
              ) : (
                <FaEnvelope size={20} />
              )}
            </div>

            <div className="message-preview">
              <div className="message-from">
                <strong>{message.name}</strong>
                {!message.read && <span className="unread-badge">New</span>}
              </div>
              <p className="message-subject">{message.subject || 'No subject'}</p>
              <p className="message-date">{formatDate(message.createdAt)}</p>
            </div>
          </motion.div>
        ))
      ) : (
        <div className="empty-messages">
          <p>No messages yet</p>
        </div>
      )}
    </div>
  );
};

export default MessagesList;