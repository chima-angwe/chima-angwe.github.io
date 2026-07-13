import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';
import { subscribeToJourney } from '../../../services/subscriberService';
import './JourneySignup.css';

const JourneySignup = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !email.includes('@')) {
      setStatus('error');
      setErrorMsg('That doesn\u2019t look like a valid email.');
      return;
    }

    try {
      setStatus('loading');
      await subscribeToJourney(email);
      setStatus('success');
      setEmail('');
    } catch (err) {
      setStatus('error');
      setErrorMsg(
        err.response?.data?.message || 'Something went wrong. Try again in a bit.'
      );
    }
  };

  return (
    <motion.div
      className="journey-signup"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="journey-signup-text">
        <span className="journey-signup-tag">follow along</span>
        <h3 className="journey-signup-title">Get the next entry by email</h3>
        <p className="journey-signup-desc">
          No newsletter theatrics &mdash; just an email when there's a new entry.
          Unsubscribe whenever.
        </p>
      </div>

      {status === 'success' ? (
        <div className="journey-signup-success">
          You're in. First entry lands in your inbox next time I post.
        </div>
      ) : (
        <form className="journey-signup-form" onSubmit={handleSubmit}>
          <input
            type="email"
            className="journey-signup-input"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={status === 'loading'}
          />
          <button
            type="submit"
            className="journey-signup-btn"
            disabled={status === 'loading'}
          >
            {status === 'loading' ? 'Adding...' : 'Follow'}
            {status !== 'loading' && <FaArrowRight size={13} />}
          </button>
        </form>
      )}

      {status === 'error' && (
        <p className="journey-signup-error">{errorMsg}</p>
      )}
    </motion.div>
  );
};

export default JourneySignup;