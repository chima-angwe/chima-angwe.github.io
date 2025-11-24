import React from 'react';
import { Link } from 'react-router-dom';
import { FaClock, FaEye, FaCalendar } from 'react-icons/fa';
import Card from '../../common/card/Card';
import { formatDate } from '../../../utils/formatDate';
import './BlogCard.css';

const BlogCard = ({ post }) => {
  return (
    <Link to={`/blog/${post.slug}`}>
      <Card className="blog-card" hover={true}>
        {/* Featured Image */}
        <div className="blog-card-image-wrapper">
          <img
            src={post.featuredImage}
            alt={post.title}
            className="blog-card-image"
          />
          {/* Category Badge */}
          <span className="blog-card-category">{post.category}</span>
        </div>

        {/* Content */}
        <div className="blog-card-content">
          {/* Title */}
          <h3 className="blog-card-title">{post.title}</h3>

          {/* Excerpt */}
          <p className="blog-card-excerpt">{post.excerpt}</p>

          {/* Meta Info */}
          <div className="blog-card-meta">
            <div className="blog-card-meta-item">
              <FaCalendar size={14} />
              <span>{formatDate(post.createdAt)}</span>
            </div>
            <div className="blog-card-meta-item">
              <FaClock size={14} />
              <span>{post.readTime} min read</span>
            </div>
            <div className="blog-card-meta-item">
              <FaEye size={14} />
              <span>{post.views} views</span>
            </div>
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="blog-card-tags">
              {post.tags.slice(0, 3).map((tag, index) => (
                <span key={index} className="blog-card-tag">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </Card>
    </Link>
  );
};

export default BlogCard;