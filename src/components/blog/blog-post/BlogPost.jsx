import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { FaClock, FaEye, FaCalendar, FaArrowUp, FaCheck } from 'react-icons/fa';
import { formatDate } from '../../../utils/formatDate';
import './BlogPost.css';
import { FaShare } from 'react-icons/fa6';

const slugify = (text) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-');

const BlogPost = ({ post }) => {
  const articleRef = useRef(null);
  const contentRef = useRef(null);
  const [headings, setHeadings] = useState([]);
  const [activeId, setActiveId] = useState('');
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [copied, setCopied] = useState(false);

  // Sanitize HTML to prevent XSS attacks
  const sanitizeHtml = (html) => {
    const div = document.createElement('div');
    div.innerHTML = html;
    const scripts = div.getElementsByTagName('script');
    for (let i = scripts.length - 1; i >= 0; i--) {
      scripts[i].remove();
    }
    return div.innerHTML;
  };

  const cleanContent = useMemo(
    () => sanitizeHtml(post.content || ''),
    [post.content]
  );

  // Scroll-linked reading progress, tracked against the article itself
  const { scrollYProgress } = useScroll({
    target: articleRef,
    offset: ['start start', 'end end'],
  });
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  // Walk the rendered content for h2/h3 elements, assign ids, build the TOC.
  // Runs after the sanitized HTML is actually in the DOM.
  useEffect(() => {
    if (!contentRef.current) return;

    const nodes = contentRef.current.querySelectorAll('h2, h3');
    const list = [];
    const seen = {};

    nodes.forEach((node) => {
      const text = node.textContent.trim();
      if (!text) return;

      let id = slugify(text);
      if (seen[id] !== undefined) {
        seen[id] += 1;
        id = `${id}-${seen[id]}`;
      } else {
        seen[id] = 0;
      }

      node.id = id;
      list.push({ id, text, level: node.tagName === 'H2' ? 2 : 3 });
    });

    setHeadings(list);
  }, [cleanContent]);

  // Scrollspy — highlight whichever heading is currently in view
  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-15% 0px -70% 0px' }
    );

    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  // Back-to-top visibility
  useEffect(() => {
    const onScroll = () => setShowBackToTop(window.scrollY > 700);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleTocClick = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 96;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href,
        });
      } catch (err) {
        // user cancelled the native share sheet — not an error worth surfacing
      }
      return;
    }

    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard blocked — nothing sensible to fall back to further
    }
  };

  return (
    <div className="blog-post-layout">
      {/* Reading progress bar, fixed at the very top of the viewport */}
      <motion.div className="reading-progress" style={{ scaleX: progressWidth }} />

      <article className="blog-post" ref={articleRef}>
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
          <span className="blog-post-category">{post.category}</span>
          <h1 className="blog-post-title">{post.title}</h1>

          <div className="blog-post-meta">
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

          {post.tags && post.tags.length > 0 && (
            <div className="blog-post-tags">
              {post.tags.map((tag, index) => (
                <span key={index} className="blog-post-tag">
                  #{tag}
                </span>
              ))}
            </div>
          )}

          <div className="blog-post-actions">
            <button
              className="blog-post-action-btn"
              onClick={handleShare}
              title="Share this post"
            >
              <AnimatePresence mode="wait" initial={false}>
                {copied ? (
                  <motion.span
                    key="copied"
                    className="blog-post-action-inner"
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                  >
                    <FaCheck size={14} />
                    <span>Link copied</span>
                  </motion.span>
                ) : (
                  <motion.span
                    key="share"
                    className="blog-post-action-inner"
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                  >
                    <FaShare size={14} />
                    <span>Share</span>
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </header>

        <div className="blog-post-body">
          {/* Table of contents — desktop only, needs 2+ headings to be worth showing */}
          {headings.length > 1 && (
            <aside className="blog-post-toc">
              <div className="blog-post-toc-sticky">
                <span className="blog-post-toc-label">In this entry</span>
                <nav>
                  {headings.map((h) => (
                    <button
                      key={h.id}
                      className={`toc-link toc-level-${h.level} ${
                        activeId === h.id ? 'toc-link-active' : ''
                      }`}
                      onClick={() => handleTocClick(h.id)}
                    >
                      {h.text}
                    </button>
                  ))}
                </nav>
              </div>
            </aside>
          )}

          {/* Post Content - HTML Rendering */}
          <div
            className="blog-post-content"
            ref={contentRef}
            dangerouslySetInnerHTML={{ __html: cleanContent }}
          />
        </div>

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
                  Founder of TrueHire, writing about what discovery calls
                  actually teach you.
                </div>
              </div>
            </div>
          </div>
        </footer>
      </article>

      {/* Back to top */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            className="back-to-top"
            onClick={handleBackToTop}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.25 }}
            title="Back to top"
          >
            <FaArrowUp size={14} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BlogPost;