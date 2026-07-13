import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaChevronLeft, FaChevronRight, FaSearchPlus, FaSearchMinus } from 'react-icons/fa';
import { useFetch } from '../../../hooks/useFetch';
import { getAllGalleryImages } from '../../../services/galleryService';
import Loader from '../../common/loader/Loader';
import ErrorMessage from '../../common/error-message/ErrorMessage';
import './GallerySection.css';

const GallerySection = () => {
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [dragX, setDragX] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [vTouchStart, setVTouchStart] = useState(null);
  const [dismissY, setDismissY] = useState(0);

  const { data: posts, loading, error, refetch } = useFetch(getAllGalleryImages);

  const openLightbox = (postId) => {
    setSelectedPostId(postId);
    setCurrentImageIndex(0);
    setIsZoomed(false);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedPostId(null);
    setCurrentImageIndex(0);
    setIsZoomed(false);
    setDismissY(0);
    document.body.style.overflow = 'unset';
  };

  const selectedPost = posts?.find((p) => p._id === selectedPostId);
  const hasMultipleImages = selectedPost && selectedPost.imageUrls.length > 1;

  const nextImage = () => {
    if (selectedPost) {
      setIsZoomed(false);
      setCurrentImageIndex((prev) =>
        prev === selectedPost.imageUrls.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (selectedPost) {
      setIsZoomed(false);
      setCurrentImageIndex((prev) =>
        prev === 0 ? selectedPost.imageUrls.length - 1 : prev - 1
      );
    }
  };

  const goToImage = (index) => {
    setIsZoomed(false);
    setCurrentImageIndex(index);
  };

  const toggleZoom = () => setIsZoomed((z) => !z);

  // Horizontal swipe (image nav) — only when not zoomed in, since zoomed
  // images use drag for panning instead
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
    setVTouchStart(e.targetTouches[0].clientY);
  };

  const handleTouchMove = (e) => {
    if (isZoomed) return;
    setTouchEnd(e.targetTouches[0].clientX);
    if (touchStart) {
      setDragX(e.targetTouches[0].clientX - touchStart);
    }
    // Track vertical movement for swipe-to-dismiss
    if (vTouchStart) {
      const dy = e.targetTouches[0].clientY - vTouchStart;
      if (dy > 0) setDismissY(dy);
    }
  };

  const handleTouchEnd = () => {
    if (isZoomed) return;

    if (dismissY > 100) {
      closeLightbox();
      return;
    }
    setDismissY(0);

    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > 50) nextImage();
    if (distance < -50) prevImage();

    setTouchStart(null);
    setTouchEnd(null);
    setDragX(0);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyboard = (e) => {
      if (selectedPostId !== null) {
        if (e.key === 'ArrowRight') nextImage();
        if (e.key === 'ArrowLeft') prevImage();
        if (e.key === 'Escape') closeLightbox();
        if (e.key === ' ') {
          e.preventDefault();
          toggleZoom();
        }
      }
    };
    window.addEventListener('keydown', handleKeyboard);
    return () => window.removeEventListener('keydown', handleKeyboard);
  }, [selectedPostId, selectedPost, isZoomed]);

  if (loading) {
    return (
      <section className="gallery-section">
        <Loader size="large" />
      </section>
    );
  }

  if (error) {
    return (
      <section className="gallery-section">
        <ErrorMessage message={error} onRetry={refetch} />
      </section>
    );
  }

  if (!posts || posts.length === 0) {
    return null;
  }

  return (
    <section className="gallery-section">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="gallery-section-title">Photo Gallery</h2>
        <p className="gallery-section-subtitle">
          A glimpse into my journey, work, and experiences
        </p>
      </motion.div>

      {/* Gallery Grid */}
      <motion.div className="gallery-grid">
        {posts.map((post, i) => (
          <motion.div
            key={post._id}
            className="gallery-item"
            onClick={() => openLightbox(post._id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.img
              src={post.imageUrls[0]}
              alt={post.title}
              className="gallery-image"
              whileHover={{ scale: 1.1 }}
            />
            <motion.div
              className="gallery-overlay"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
            >
              <h3 className="gallery-title">{post.title}</h3>
              {post.category && (
                <span className="gallery-category">{post.category}</span>
              )}
              {post.imageUrls.length > 1 && (
                <div className="gallery-badge">{post.imageUrls.length} photos</div>
              )}
            </motion.div>
          </motion.div>
        ))}
      </motion.div>

      {/* Card-Based Lightbox */}
      <AnimatePresence mode="wait">
        {selectedPost && (
          <motion.div
            className="gallery-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            <motion.div
              className="gallery-card-container"
              style={{ y: dismissY }}
              initial={{ scale: 0.5, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: dismissY }}
              exit={{ scale: 0.5, opacity: 0, y: 50 }}
              transition={{ type: 'spring', stiffness: 200, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <motion.button
                className="card-close-btn"
                onClick={closeLightbox}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaTimes />
              </motion.button>

              {/* Zoom toggle */}
              <motion.button
                className="card-zoom-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleZoom();
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                title={isZoomed ? 'Zoom out' : 'Zoom in'}
              >
                {isZoomed ? <FaSearchMinus /> : <FaSearchPlus />}
              </motion.button>

              {/* Image Container with Swipe */}
              <div
                className={`gallery-card-image-wrapper ${isZoomed ? 'is-zoomed' : ''}`}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentImageIndex}
                    src={selectedPost.imageUrls[currentImageIndex]}
                    alt={selectedPost.title}
                    className="gallery-card-image"
                    onDoubleClick={toggleZoom}
                    drag={isZoomed}
                    dragConstraints={{ left: -180, right: 180, top: -140, bottom: 140 }}
                    dragElastic={0.15}
                    initial={{ opacity: 0, x: dragX > 0 ? -100 : 100, scale: 1 }}
                    animate={{ opacity: 1, x: 0, scale: isZoomed ? 2 : 1 }}
                    exit={{ opacity: 0, x: dragX > 0 ? 100 : -100 }}
                    transition={{ duration: 0.3 }}
                    style={{ cursor: isZoomed ? 'grab' : 'zoom-in' }}
                  />
                </AnimatePresence>

                {/* Navigation Arrows */}
                {hasMultipleImages && !isZoomed && (
                  <>
                    <motion.button
                      className="card-nav-btn card-nav-prev"
                      onClick={(e) => {
                        e.stopPropagation();
                        prevImage();
                      }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <FaChevronLeft />
                    </motion.button>
                    <motion.button
                      className="card-nav-btn card-nav-next"
                      onClick={(e) => {
                        e.stopPropagation();
                        nextImage();
                      }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <FaChevronRight />
                    </motion.button>
                  </>
                )}

          
              </div>

              {/* Thumbnail strip for quick jumping */}
              {hasMultipleImages && (
                <div className="gallery-thumb-strip">
                  {selectedPost.imageUrls.map((url, index) => (
                    <button
                      key={index}
                      className={`gallery-thumb ${
                        index === currentImageIndex ? 'gallery-thumb-active' : ''
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        goToImage(index);
                      }}
                    >
                      <img src={url} alt="" />
                    </button>
                  ))}
                </div>
              )}

              {/* Content Section */}
              <motion.div
                className="gallery-card-content"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <div>
                  <h3 className="card-title">{selectedPost.title}</h3>
                  {selectedPost.category && (
                    <span className="card-category">{selectedPost.category}</span>
                  )}
                </div>

                {selectedPost.description && (
                  <p className="card-description">{selectedPost.description}</p>
                )}

                {/* Dot Indicators */}
                {hasMultipleImages && (
                  <motion.div className="card-indicators">
                    {selectedPost.imageUrls.map((_, index) => (
                      <motion.button
                        key={index}
                        className={`indicator-dot ${
                          index === currentImageIndex ? 'active' : ''
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          goToImage(index);
                        }}
                        whileHover={{ scale: 1.3 }}
                      />
                    ))}
                  </motion.div>
                )}

                {/* Keyboard hint — desktop only, teaches the shortcuts that already exist */}
                <div className="card-keyboard-hint">
                  <span><kbd>&larr;</kbd><kbd>&rarr;</kbd> navigate</span>
                  <span><kbd>space</kbd> zoom</span>
                  <span><kbd>esc</kbd> close</span>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default GallerySection;