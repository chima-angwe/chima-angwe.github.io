import React from 'react';
import './Skeleton.css';

const Block = ({ className = '' }) => (
  <span className={`skeleton-block ${className}`} aria-hidden="true" />
);

const Card = ({ image = true, compact = false }) => (
  <div className={`skeleton-card ${compact ? 'is-compact' : ''}`} aria-hidden="true">
    {image && <Block className="skeleton-card-image" />}
    <div className="skeleton-card-copy">
      <Block className="skeleton-line is-short" />
      <Block className="skeleton-line is-title" />
      <Block className="skeleton-line" />
      <Block className="skeleton-line is-medium" />
    </div>
  </div>
);

const Grid = ({ count = 6, image = true, compact = false }) => (
  <div className="skeleton-card-grid" aria-hidden="true">
    {Array.from({ length: count }, (_, index) => <Card key={index} image={image} compact={compact} />)}
  </div>
);

const Header = () => (
  <div className="skeleton-page-heading" aria-hidden="true">
    <Block className="skeleton-line is-kicker" />
    <Block className="skeleton-line is-page-title" />
    <Block className="skeleton-line is-subtitle" />
  </div>
);

const PageSkeleton = ({ variant = 'section' }) => {
  if (variant === 'project-grid' || variant === 'blog-grid' || variant === 'resource-grid' || variant === 'gallery-grid') {
    return (
      <div className={`skeleton-page skeleton-${variant}`} aria-hidden="true">
        {(variant === 'resource-grid' || variant === 'gallery-grid') && <Header />}
        
        <Grid count={6} image />
      </div>
    );
  }

  if (variant === 'blog-post') {
    return (
      <div className="skeleton-page skeleton-article" aria-hidden="true">
        <Block className="skeleton-line is-kicker" />
        <Block className="skeleton-line is-page-title" />
        <Block className="skeleton-line is-subtitle" />
        <Block className="skeleton-article-cover" />
        <div className="skeleton-article-body">
          {Array.from({ length: 8 }, (_, index) => <Block key={index} className={`skeleton-line ${index % 3 === 2 ? 'is-medium' : ''}`} />)}
        </div>
      </div>
    );
  }

  if (variant === 'resource-detail') {
    return (
      <div className="skeleton-page skeleton-resource-detail" aria-hidden="true">
        <Block className="skeleton-line is-short" />
        <div className="skeleton-resource-layout">
          <Block className="skeleton-resource-cover" />
          <div className="skeleton-resource-copy">
            <Block className="skeleton-line is-kicker" />
            <Block className="skeleton-line is-page-title" />
            <Block className="skeleton-line" />
            <Block className="skeleton-line is-medium" />
            <Block className="skeleton-button" />
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'featured-projects') {
    return (
      <div className="skeleton-page skeleton-home-featured" aria-hidden="true">
        <div className="skeleton-section-heading"><Block className="skeleton-line is-title" /><Block className="skeleton-line is-short" /></div>
        <div className="skeleton-featured-card"><Block className="skeleton-featured-copy" /><Block className="skeleton-featured-image" /></div>
        <div className="skeleton-filter-row"><Block /><Block /><Block /></div>
      </div>
    );
  }

  if (variant === 'recent-articles') {
    return (
      <div className="skeleton-page skeleton-recent-articles" aria-hidden="true">
        <div className="skeleton-section-heading"><Block className="skeleton-line is-title" /><Block className="skeleton-line is-short" /></div>
        {Array.from({ length: 3 }, (_, index) => <div className="skeleton-article-row" key={index}><Block className="skeleton-line is-short" /><Block className="skeleton-line" /></div>)}
      </div>
    );
  }

  if (variant === 'section') {
    return (
      <div className="skeleton-page skeleton-section" aria-hidden="true">
        <div className="skeleton-section-heading"><Block className="skeleton-line is-title" /><Block className="skeleton-line is-subtitle" /></div>
        <Grid count={3} image={false} compact />
      </div>
    );
  }

  return (
    <div className="skeleton-page skeleton-route" aria-hidden="true">
      <Header />
      <Block className="skeleton-route-content" />
    </div>
  );
};

export default PageSkeleton;
