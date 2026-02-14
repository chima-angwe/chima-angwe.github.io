import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaClock, FaEye, FaCalendar, FaUser, FaBookmark } from 'react-icons/fa';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { formatDate } from '../../../utils/formatDate';
import './BlogPost.css';
import { FaShare } from "react-icons/fa6";


const BlogPost = ({ post }) => {
  const [isSaved, setIsSaved] = useState(false);

  const renderContentBlock = (block, index) => {
    switch (block.type) {
      case 'paragraph':
        return (
          <motion.p
            key={index}
            className="blog-post-paragraph"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {block.content}
          </motion.p>
        );

      case 'heading1':
        return (
          <motion.h1
            key={index}
            className="blog-post-h1"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {block.content}
          </motion.h1>
        );

      case 'heading2':
        return (
          <motion.h2
            key={index}
            className="blog-post-h2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {block.content}
          </motion.h2>
        );

      case 'heading3':
        return (
          <motion.h3
            key={index}
            className="blog-post-h3"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {block.content}
          </motion.h3>
        );

      case 'image':
        return (
          <motion.figure
            key={index}
            className={`blog-post-figure blog-post-figure-${block.alignment}`}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="blog-post-image-container">
              <img
                src={block.imageUrl}
                alt={block.imageAlt || 'Blog image'}
                className="blog-post-inline-image"
                loading="lazy"
              />
            </div>
            {block.imageCaption && (
              <figcaption className="blog-post-figcaption">
                {block.imageCaption}
              </figcaption>
            )}
          </motion.figure>
        );

      case 'quote':
        return (
          <motion.blockquote
            key={index}
            className="blog-post-quote"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {block.content}
          </motion.blockquote>
        );

      case 'code':
        return (
          <motion.div
            key={index}
            className="blog-post-code-wrapper"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <SyntaxHighlighter
              language={block.language || 'javascript'}
              style={atomOneDark}
              className="blog-post-code-block"
            >
              {block.content}
            </SyntaxHighlighter>
          </motion.div>
        );

      case 'list':
        return (
          <motion.ul
            key={index}
            className="blog-post-list"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {block.listItems.map((item, itemIndex) => (
              <li key={itemIndex} className="blog-post-list-item">
                {item}
              </li>
            ))}
          </motion.ul>
        );

      default:
        return null;
    }
  };

  return (
    <motion.article
      className="blog-post"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Featured Image */}
      <motion.div
        className="blog-post-image-wrapper"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <img
          src={post.featuredImage}
          alt={post.featuredImageAlt || post.title}
          className="blog-post-image"
          loading="lazy"
        />
        <div className="blog-post-image-gradient" />
      </motion.div>

      {/* Post Header */}
      <header className="blog-post-header">
        {/* Category */}
        <motion.span
          className="blog-post-category"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {post.category}
        </motion.span>

        {/* Title */}
        <motion.h1
          className="blog-post-title"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {post.title}
        </motion.h1>

        {/* Meta Info */}
        <motion.div
          className="blog-post-meta"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="blog-post-meta-item">
            <FaUser size={14} />
            <span>{post.author}</span>
          </div>
          <div className="blog-post-meta-divider" />
          <div className="blog-post-meta-item">
            <FaCalendar size={14} />
            <span>{formatDate(post.createdAt)}</span>
          </div>
          <div className="blog-post-meta-divider" />
          <div className="blog-post-meta-item">
            <FaClock size={14} />
            <span>{post.readTime} min read</span>
          </div>
          <div className="blog-post-meta-divider" />
          <div className="blog-post-meta-item">
            <FaEye size={14} />
            <span>{post.views} views</span>
          </div>
        </motion.div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <motion.div
            className="blog-post-tags"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {post.tags.map((tag, index) => (
              <span key={index} className="blog-post-tag">
                #{tag}
              </span>
            ))}
          </motion.div>
        )}

        {/* Action Buttons */}
        <motion.div
          className="blog-post-actions"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <button
            className="blog-post-action-btn"
            onClick={() => setIsSaved(!isSaved)}
            title={isSaved ? 'Remove bookmark' : 'Bookmark this post'}
          >
            <FaBookmark size={16} fill={isSaved ? 'currentColor' : 'none'} />
            <span>{isSaved ? 'Saved' : 'Save'}</span>
          </button>
          <button
            className="blog-post-action-btn"
            onClick={() => {
              navigator.share({
                title: post.title,
                text: post.excerpt,
                url: window.location.href,
              }).catch(err => console.error('Share failed:', err));
            }}
            title="Share this post"
          >
            <FaShare size={16} />
            <span>Share</span>
          </button>
        </motion.div>
      </header>

      {/* Post Content - Rich Blocks */}
      <div className="blog-post-content">
        {post.contentBlocks && post.contentBlocks.length > 0 ? (
          post.contentBlocks.map((block, index) => renderContentBlock(block, index))
        ) : (
          // Fallback for legacy plain text content
          <div>
            {post.content.split('\n\n').map((paragraph, index) => (
              <p key={index} className="blog-post-paragraph">
                {paragraph}
              </p>
            ))}
          </div>
        )}
      </div>

      {/* Post Footer */}
      <motion.footer
        className="blog-post-footer"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="blog-post-footer-divider" />
        <div className="blog-post-footer-content">
          <div className="blog-post-author-info">
            <div className="blog-post-author-avatar">
              {post.author.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="blog-post-author-name">Written by {post.author}</div>
              <div className="blog-post-author-bio">
                Passionate about web development and sharing knowledge
              </div>
            </div>
          </div>
        </div>
      </motion.footer>
    </motion.article>
  );
};

export default BlogPost;