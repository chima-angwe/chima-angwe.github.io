import React from 'react';
import { FaClock, FaEye, FaCalendar, FaUser } from 'react-icons/fa';
import { formatDate } from '../../../utils/formatDate';
import './BlogPost.css';
import { FaShare } from 'react-icons/fa6';

const BlogPost = ({ post }) => {
  // Sanitize HTML to prevent XSS attacks
  const sanitizeHtml = (html) => {
    const div = document.createElement('div');
    div.innerHTML = html;

    // Remove any script tags and other dangerous content
    const scripts = div.getElementsByTagName('script');
    for (let i = scripts.length - 1; i >= 0; i--) {
      scripts[i].remove();
    }

    return div.innerHTML;
  };

  return (
    <article className="blog-post">
      {/* Featured Image - Full Width */}
      <div className="blog-post-image-wrapper">
        <img
          src={post.featuredImage}
          alt={post.featuredImageAlt || post.title}
          className="blog-post-image"
          loading="lazy"
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
          <div className="blog-post-meta-divider" />
          <div className="blog-post-meta-item">
            <FaCalendar size={14} />
            <span>{formatDate(post.createdAt)}</span>
          </div>
          <div className="blog-post-meta-divider" />
          <div className="blog-post-meta-item">
            <FaClock size={14} />
            <span>{post.readTime || 5} min read</span>
          </div>
          <div className="blog-post-meta-divider" />
          <div className="blog-post-meta-item">
            <FaEye size={14} />
            <span>{post.views || 0} views</span>
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

        {/* Share Button - Right Aligned */}
        <div className="blog-post-actions">
          <button
            className="blog-post-action-btn"
            onClick={() => {
              if (navigator.share) {
                navigator
                  .share({
                    title: post.title,
                    text: post.excerpt,
                    url: window.location.href,
                  })
                  .catch((err) => console.error('Share failed:', err));
              } else {
                // Fallback for browsers that don't support navigator.share
                alert('Share functionality not supported on this browser');
              }
            }}
            title="Share this post"
          >
            <FaShare size={16} />
            <span>Share</span>
          </button>
        </div>
      </header>

      {/* Post Content - HTML Rendering */}
      <div
        className="blog-post-content"
        dangerouslySetInnerHTML={{
          __html: sanitizeHtml(post.content || ''),
        }}
      />

      {/* Post Footer - Author Info */}
      <footer className="blog-post-footer">
        <div className="blog-post-footer-divider" />
        <div className="blog-post-footer-content">
          <div className="blog-post-author-info">
            <div className="blog-post-author-avatar">
              {post.author.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="blog-post-author-name">Written by Chima</div>
              <div className="blog-post-author-bio">
                Passionate about software development and sharing knowledge
              </div>
            </div>
          </div>
        </div>
      </footer>
    </article>
  );
};

export default BlogPost;
