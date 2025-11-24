import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useFetch } from '../../../hooks/useFetch';
import { getAllGalleryImages } from '../../../services/galleryService';
import Loader from '../../common/loader/Loader';
import ErrorMessage from '../../common/error-message/ErrorMessage';
import { containerVariants, fadeInUp } from '../../../utils/animations';
import './GallerySection.css';

const GallerySection = () => {
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const {
    data: posts,
    loading,
    error,
    refetch,
  } = useFetch(getAllGalleryImages);

  const openLightbox = (postId) => {
    setSelectedPostId(postId);
    setCurrentImageIndex(0);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedPostId(null);
    setCurrentImageIndex(0);
    document.body.style.overflow = 'unset';
  };

  const nextImage = () => {
    const selectedPost = posts.find((p) => p._id === selectedPostId);
    if (selectedPost) {
      setCurrentImageIndex((prev) =>
        prev === selectedPost.imageUrls.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    const selectedPost = posts.find((p) => p._id === selectedPostId);
    if (selectedPost) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? selectedPost.imageUrls.length - 1 : prev - 1
      );
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyboard = (e) => {
      if (selectedPostId !== null) {
        if (e.key === 'ArrowRight') nextImage();
        if (e.key === 'ArrowLeft') prevImage();
        if (e.key === 'Escape') closeLightbox();
      }
    };
    window.addEventListener('keydown', handleKeyboard);
    return () => window.removeEventListener('keydown', handleKeyboard);
  }, [selectedPostId, posts]);

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

  const selectedPost = posts.find((p) => p._id === selectedPostId);
  const hasMultipleImages =
    selectedPost && selectedPost.imageUrls.length > 1;

  return (
    <section className="gallery-section">
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

      <motion.div
        className="gallery-grid"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {posts.map((post) => (
          <motion.div
            key={post._id}
            className="gallery-item"
            variants={fadeInUp}
            whileHover={{ scale: 1.05 }}
            onClick={() => openLightbox(post._id)}
          >
            <img
              src={post.imageUrls[0]}
              alt={post.title}
              className="gallery-image"
            />
            <div className="gallery-overlay">
              <h3 className="gallery-title">{post.title}</h3>
              {post.category && (
                <span className="gallery-category">{post.category}</span>
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedPost && (
          <motion.div
            className="gallery-lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            <button className="lightbox-close" onClick={closeLightbox}>
              <FaTimes size={24} />
            </button>

            {/* Navigation Buttons (only if multiple images) */}
            {hasMultipleImages && (
              <>
                <button
                  className="lightbox-nav lightbox-nav-prev"
                  onClick={(e) => {
                    e.stopPropagation();
                    prevImage();
                  }}
                  aria-label="Previous image"
                >
                  <FaChevronLeft size={28} />
                </button>

                <button
                  className="lightbox-nav lightbox-nav-next"
                  onClick={(e) => {
                    e.stopPropagation();
                    nextImage();
                  }}
                  aria-label="Next image"
                >
                  <FaChevronRight size={28} />
                </button>
              </>
            )}

            <motion.div
              className="lightbox-content"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="lightbox-image-wrapper">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentImageIndex}
                    src={selectedPost.imageUrls[currentImageIndex]}
                    alt={selectedPost.title}
                    className="lightbox-image"
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.3 }}
                  />
                </AnimatePresence>
              </div>

              <div className="lightbox-info">
                <h3 className="lightbox-title">{selectedPost.title}</h3>
                {selectedPost.description && (
                  <p className="lightbox-description">
                    {selectedPost.description}
                  </p>
                )}
                {selectedPost.category && (
                  <span className="lightbox-category">
                    {selectedPost.category}
                  </span>
                )}
              </div>

              {/* Image Counter (only if multiple images) */}
              {hasMultipleImages && (
                <div className="lightbox-counter">
                  {currentImageIndex + 1} / {selectedPost.imageUrls.length}
                </div>
              )}

              {/* Dot Indicators (only if multiple images) */}
              {hasMultipleImages && (
                <div className="lightbox-indicators">
                  {selectedPost.imageUrls.map((_, index) => (
                    <button
                      key={index}
                      className={`lightbox-indicator ${
                        index === currentImageIndex ? 'active' : ''
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentImageIndex(index);
                      }}
                      aria-label={`Go to image ${index + 1}`}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default GallerySection;