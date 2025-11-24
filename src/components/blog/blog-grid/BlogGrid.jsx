import React from 'react';
import { motion } from 'framer-motion';
import BlogCard from '../blog-card/BlogCard';
import { containerVariants, fadeInUp } from '../../../utils/animations';
import './BlogGrid.css';

const BlogGrid = ({ posts }) => {
  return (
    <motion.div
      className="blog-grid"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {posts.map((post) => (
        <motion.div key={post._id} variants={fadeInUp}>
          <BlogCard post={post} />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default BlogGrid;