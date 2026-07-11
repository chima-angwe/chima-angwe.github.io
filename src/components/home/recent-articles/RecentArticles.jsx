import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useFetch } from '../../../hooks/useFetch';
import { getAllBlogPosts } from '../../../services/blogService';
import { formatDateShort } from '../../../utils/formatDate';
import Loader from '../../common/loader/Loader';
import ErrorMessage from '../../common/error-message/ErrorMessage';
import './RecentArticles.css';

const RecentArticlesSection = () => {
  const navigate = useNavigate();

  const { data, loading, error, refetch } = useFetch(
    () => getAllBlogPosts(1, 3),
    []
  );

  const recentPosts = data?.posts || [];

  const handleViewAllClick = () => navigate('/blog');
  const handleArticleClick = (postSlug) => navigate(`/blog/${postSlug}`);

  if (loading) {
    return (
      <section className="recent-articles-section section-padding">
        <div className="container-custom">
          <Loader size="large" />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="recent-articles-section section-padding">
        <div className="container-custom">
          <ErrorMessage message={error} onRetry={refetch} />
        </div>
      </section>
    );
  }

  if (recentPosts.length === 0) {
    return null;
  }

  return (
    <section className="recent-articles-section section-padding">
      <div className="container-custom">
        <motion.div
          className="recent-articles-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="recent-articles-title">From the journey</h2>
          <button className="view-all-btn" onClick={handleViewAllClick}>
            View all &rarr;
          </button>
        </motion.div>

        <motion.div
          className="journey-list"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {recentPosts.map((post) => (
            <div
              key={post._id || post.id}
              className="journey-item"
              onClick={() => handleArticleClick(post.slug)}
            >
              <span className="journey-date">{formatDateShort(post.date)}</span>
              <span className="journey-title">{post.title}</span>
              <span className="journey-arrow">&rarr;</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default RecentArticlesSection;