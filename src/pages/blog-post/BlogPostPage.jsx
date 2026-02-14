import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { useFetch } from '../../hooks/useFetch';
import { getBlogPostBySlug, incrementViews } from '../../services/blogService';
import BlogPost from '../../components/blog/blog-post/BlogPost';
import Loader from '../../components/common/loader/Loader';
import ErrorMessage from '../../components/common/error-message/ErrorMessage';
import './BlogPostPage.css';

const BlogPostPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
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

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  // Navigation handlers
  const handleBackToBlog = () => {
    navigate('/blog', { replace: false });
  };

  const handleViewAllArticles = () => {
    navigate('/blog', { replace: false });
  };

  return (
    <div className="blog-post-page">
      {/* Main Content */}
      <div className="blog-post-page-wrapper">
        {/* Sticky Navigation Bar */}
        <nav className="blog-post-navigation">
          <button 
            className="blog-post-nav-link"
            onClick={handleBackToBlog}
            type="button"
            title="Back to blog list"
          >
            <FaArrowLeft size={16} />
            <span>Back to Blog</span>
          </button>
          <div className="blog-post-nav-breadcrumb">
            <span>Reading Article</span>
          </div>
        </nav>

        {/* Loading State */}
        {loading && (
          <div className="blog-post-loading">
            <Loader size="large" />
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="blog-post-error">
            <ErrorMessage message={error} onRetry={refetch} />
          </div>
        )}

        {/* Blog Post Content */}
        {!loading && !error && post && (
          <>
            <div className="blog-post-container">
              <BlogPost post={post} />
            </div>

            {/* Related Articles Section */}
            <section className="blog-post-related">
              <div className="blog-post-related-header">
                <h2>Continue Reading</h2>
                <button
                  className="blog-post-related-link"
                  onClick={handleViewAllArticles}
                  type="button"
                  title="View all blog articles"
                >
                  View all articles
                  <FaArrowRight size={14} />
                </button>
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
};

export default BlogPostPage;