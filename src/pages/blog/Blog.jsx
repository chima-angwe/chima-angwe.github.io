import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useFetch } from '../../hooks/useFetch';
import { getAllBlogPosts } from '../../services/blogService';
import BlogGrid from '../../components/blog/blog-grid/BlogGrid';
import Loader from '../../components/common/loader/Loader';
import ErrorMessage from '../../components/common/error-message/ErrorMessage';
import Button from '../../components/common/button/Button';
import './Blog.css';

const Blog = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 9;

  const { data, loading, error, refetch } = useFetch(
    () => getAllBlogPosts(currentPage, postsPerPage),
    [currentPage]
  );

  const posts = data?.posts || [];
  const totalPages = data?.totalPages || 1;
  const totalPosts = data?.totalPosts || 0;

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="blog-page">
      <div className="container-custom section-padding">
        {/* Page Header */}
        <motion.div
          className="blog-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="blog-title">Blog</h1>
          <p className="blog-subtitle">
            Thoughts, tutorials, and insights about web development and technology
          </p>
          {totalPosts > 0 && (
            <p className="blog-count">{totalPosts} articles published</p>
          )}
        </motion.div>

        {/* Loading State */}
        {loading && <Loader size="large" />}

        {/* Error State */}
        {error && <ErrorMessage message={error} onRetry={refetch} />}

        {/* Blog Grid */}
        {!loading && !error && posts.length > 0 && (
          <>
            <BlogGrid posts={posts} />

            {/* Pagination */}
            {totalPages > 1 && (
              <motion.div
                className="blog-pagination"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Button
                  variant="secondary"
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                <span className="blog-pagination-info">
                  Page {currentPage} of {totalPages}
                </span>
                <Button
                  variant="secondary"
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </motion.div>
            )}
          </>
        )}

        {/* Empty State */}
        {!loading && !error && posts.length === 0 && (
          <motion.div
            className="blog-empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="blog-empty-text">
              No blog posts yet. Check back soon!
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Blog;