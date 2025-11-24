import React from 'react';
import { motion } from 'framer-motion';
import { FaClock, FaEye, FaCalendar, FaUser } from 'react-icons/fa';
import { formatDate } from '../../../utils/formatDate';
import './BlogPost.css';

const BlogPost = ({ post }) => {
  return (
    <motion.article
      className="blog-post"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Featured Image */}
      <div className="blog-post-image-wrapper">
        <img
          src={post.featuredImage}
          alt={post.title}
          className="blog-post-image"
        />
      </div>

      {/* Post Header */}
      <header className="blog-post-header">
        {/* Category */}
        <span className="blog-post-category">{post.category}</span>

        {/* Title */}
        <h1 className="blog-post-title">{post.title}</h1>

        {/* Meta Info */}
        <div className="blog-post-meta">
          <div className="blog-post-meta-item">
            <FaUser size={14} />
            <span>{post.author}</span>
          </div>
          <div className="blog-post-meta-item">
            <FaCalendar size={14} />
            <span>{formatDate(post.createdAt)}</span>
          </div>
          <div className="blog-post-meta-item">
            <FaClock size={14} />
            <span>{post.readTime} min read</span>
          </div>
          <div className="blog-post-meta-item">
            <FaEye size={14} />
            <span>{post.views} views</span>
          </div>
        </div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="blog-post-tags">
            {post.tags.map((tag, index) => (
              <span key={index} className="blog-post-tag">
                #{tag}
              </span>
            ))}
          </div>
        )}
      </header>

      {/* Post Content */}
      <div className="blog-post-content">
        {post.content.split('\n\n').map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </motion.article>
  );
};

export default BlogPost;