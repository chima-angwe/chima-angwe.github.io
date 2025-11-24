import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowLeft } from 'react-icons/fa';
import { useFetch } from '../../hooks/useFetch';
import { getBlogPostBySlug, incrementViews } from '../../services/blogService';
import BlogPost from '../../components/blog/blog-post/BlogPost';
import Loader from '../../components/common/loader/Loader';
import ErrorMessage from '../../components/common/error-message/ErrorMessage';
import Button from '../../components/common/button/Button';
import './BlogPostPage.css';

const BlogPostPage = () => {
  const { slug } = useParams();
  const { data: post, loading, error, refetch } = useFetch(
    () => getBlogPostBySlug(slug),
    [slug]
  );

  // Increment view count when post loads
  useEffect(() => {
    if (post) {
      incrementViews(slug).catch((err) => console.error('Failed to increment views:', err));
    }
  }, [post, slug]);

  return (
    <div className="blog-post-page">
      <div className="container-custom section-padding">
        {/* Back Button */}
        <motion.div
          className="blog-post-back"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link to="/blog">
            <Button variant="outline">
              <FaArrowLeft size={16} className="mr-2" />
              Back to Blog
            </Button>
          </Link>
        </motion.div>

        {/* Loading State */}
        {loading && <Loader size="large" />}

        {/* Error State */}
        {error && <ErrorMessage message={error} onRetry={refetch} />}

        {/* Blog Post */}
        {!loading && !error && post && <BlogPost post={post} />}
      </div>
    </div>
  );
};

export default BlogPostPage;