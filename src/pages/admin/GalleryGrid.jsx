import React from 'react';
import { motion } from 'framer-motion';
import { FaEdit, FaTrash, FaImages } from 'react-icons/fa';

const GalleryGrid = ({ posts, onEdit, onDelete }) => {
  return (
    <div className="gallery-grid-admin">
      {posts.map((post) => (
        <motion.div
          key={post._id}
          className="gallery-post-admin"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          whileHover={{ y: -4 }}
        >
          <div className="post-thumbnail">
            <img src={post.imageUrls[0]} alt={post.title} />
            <div className="image-count">
              <FaImages size={12} />
              <span>{post.imageUrls.length}</span>
            </div>
          </div>

          <div className="post-info">
            <h3 className="post-title">{post.title}</h3>
            <p className="post-category">{post.category}</p>
            {post.featured && <span className="featured-badge">Featured</span>}
          </div>

          <div className="post-overlay">
            <div className="post-actions">
              <button
                onClick={() => onEdit(post)}
                className="action-btn edit-btn"
                title="Edit post"
              >
                <FaEdit size={16} />
              </button>
              <button
                onClick={() => onDelete(post._id)}
                className="action-btn delete-btn"
                title="Delete post"
              >
                <FaTrash size={16} />
              </button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default GalleryGrid;