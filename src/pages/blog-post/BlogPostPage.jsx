import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
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
  const {
    data: post,
    loading,
    error,
    refetch,
  } = useFetch(() => getBlogPostBySlug(slug), [slug]);

  useEffect(() => {
    if (post) {
      incrementViews(slug).catch((err) =>
        console.error('Failed to increment views:', err)
      );
    }
  }, [post, slug]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const handleBackToBlog = () => navigate('/blog', { replace: false });
  const handleViewAllArticles = () => navigate('/blog', { replace: false });

  // Build a clean excerpt for the description
  const metaDescription =
    post?.excerpt ||
    post?.content?.replace(/<[^>]+>/g, '').slice(0, 160) ||
    'Read this article on The Thing About Chima';

  const metaImage =
    post?.featuredImage ||
    'https://res.cloudinary.com/dpcgk2sev/image/upload/v1767302939/my_new_chima_z7bzan.jpg';

  const metaUrl = `https://chima-angwe.github.io/#/blog/${slug}`;

  return (
    <div className="blog-post-page">
      {/* Dynamic OG tags — works for JS-enabled crawlers */}
      {post && (
        <Helmet>
          <title>{post.title} | The Thing About Chima</title>

          <meta property="og:title" content={post.title} />
          <meta property="og:description" content={metaDescription} />
          <meta property="og:image" content={metaImage} />
          <meta property="og:url" content={metaUrl} />
          <meta property="og:type" content="article" />
          <meta property="og:site_name" content="The Thing About Chima" />

          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={post.title} />
          <meta name="twitter:description" content={metaDescription} />
          <meta name="twitter:image" content={metaImage} />

          <meta name="description" content={metaDescription} />
        </Helmet>
      )}

      <div className="blog-post-page-wrapper">
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

        {loading && (
          <div className="blog-post-loading">
            <Loader size="large" />
          </div>
        )}

        {error && (
          <div className="blog-post-error">
            <ErrorMessage message={error} onRetry={refetch} />
          </div>
        )}

        {!loading && !error && post && (
          <>
            <div className="blog-post-container">
              <BlogPost post={post} />
            </div>
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
