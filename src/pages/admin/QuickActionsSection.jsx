import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaFolder, FaBlog, FaImages, FaEye } from 'react-icons/fa';

const QuickActionsSection = () => {
  return (
    <motion.div
      className="dashboard-actions"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <h2 className="actions-title">Quick Actions</h2>
      <div className="actions-grid">
        <Link to="/admin/projects" className="action-card">
          <FaFolder size={24} />
          <span>Manage Projects</span>
        </Link>
        <Link to="/admin/blog" className="action-card">
          <FaBlog size={24} />
          <span>Manage Blog</span>
        </Link>
        <Link to="/admin/gallery" className="action-card">
          <FaImages size={24} />
          <span>Manage Gallery</span>
        </Link>
        <Link to="/" className="action-card">
          <FaEye size={24} />
          <span>View Live Site</span>
        </Link>
      </div>
    </motion.div>
  );
};

export default QuickActionsSection;