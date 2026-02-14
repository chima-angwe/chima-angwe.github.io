import React from 'react';
import { motion } from 'framer-motion';
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import { formatDate } from '../../utils/formatDate';

const BlogPostsTable = ({ posts, onEdit, onDelete }) => {
  return (
    <div className="blog-table-wrapper">
      <table className="blog-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Category</th>
            <th>Published</th>
            <th>Views</th>
            <th>Created</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <motion.tr
              key={post._id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <td>
                <img
                  src={post.featuredImage}
                  alt={post.title}
                  className="post-thumbnail"
                />
              </td>
              <td className="post-title-cell">{post.title}</td>
              <td>
                <span className="post-category">{post.category}</span>
              </td>
              <td>
                {post.published ? (
                  <span className="badge-success">Yes</span>
                ) : (
                  <span className="badge-default">No</span>
                )}
              </td>
              <td>{post.views}</td>
              <td>{formatDate(post.createdAt)}</td>
              <td>
                <div className="action-buttons">
                  <button
                    onClick={() => window.open(`/#/blog/${post.slug}`, '_blank')}
                    className="action-btn view-btn"
                    title="View"
                  >
                    <FaEye size={16} />
                  </button>
                  <button
                    onClick={() => onEdit(post)}
                    className="action-btn edit-btn"
                    title="Edit"
                  >
                    <FaEdit size={16} />
                  </button>
                  <button
                    onClick={() => onDelete(post._id)}
                    className="action-btn delete-btn"
                    title="Delete"
                  >
                    <FaTrash size={16} />
                  </button>
                </div>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BlogPostsTable;