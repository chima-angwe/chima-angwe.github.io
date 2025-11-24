import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Button from '../../common/button/Button';
import './ProjectModal.css';

const ProjectModal = ({ project, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  // Carousel navigation
  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === project.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? project.images.length - 1 : prev - 1
    );
  };

  // Keyboard navigation for carousel
  useEffect(() => {
    const handleKeyboard = (e) => {
      if (project.images && project.images.length > 2) {
        if (e.key === 'ArrowRight') nextImage();
        if (e.key === 'ArrowLeft') prevImage();
      }
    };
    window.addEventListener('keydown', handleKeyboard);
    return () => window.removeEventListener('keydown', handleKeyboard);
  }, [project.images]);

  const hasCarousel = project.images && project.images.length > 2;

  return (
    <AnimatePresence>
      <div className="modal-overlay" onClick={onClose}>
        <motion.div
          className="modal-content"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button className="modal-close" onClick={onClose}>
            <FaTimes size={24} />
          </button>

          {/* Modal Body */}
          <div className="modal-body">
            {/* Featured Image */}
            <div className="modal-image-wrapper">
              <img
                src={project.thumbnail}
                alt={project.title}
                className="modal-image"
              />
            </div>

            {/* Project Info */}
            <div className="modal-info">
              {/* Category */}
              <span className="modal-category">{project.category}</span>

              {/* Title */}
              <h2 className="modal-title">{project.title}</h2>

              {/* Full Description */}
              <p className="modal-description">{project.fullDescription}</p>

              {/* Tech Stack */}
              <div className="modal-section">
                <h3 className="modal-section-title">Technologies Used</h3>
                <div className="modal-tech">
                  {project.techStack.map((tech, index) => (
                    <span key={index} className="modal-tech-badge">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Gallery or Carousel */}
              {project.images && project.images.length > 0 && (
                <div className="modal-section">
                  <h3 className="modal-section-title">Screenshots</h3>
                  
                  {hasCarousel ? (
                    // Carousel for more than 2 images
                    <div className="carousel-container">
                      <button 
                        className="carousel-button carousel-button-prev"
                        onClick={prevImage}
                        aria-label="Previous image"
                      >
                        <FaChevronLeft size={24} />
                      </button>

                      <div className="carousel-track">
                        <AnimatePresence mode="wait">
                          <motion.img
                            key={currentImageIndex}
                            src={project.images[currentImageIndex]}
                            alt={`${project.title} screenshot ${currentImageIndex + 1}`}
                            className="carousel-image"
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -100 }}
                            transition={{ duration: 0.3 }}
                          />
                        </AnimatePresence>
                      </div>

                      <button 
                        className="carousel-button carousel-button-next"
                        onClick={nextImage}
                        aria-label="Next image"
                      >
                        <FaChevronRight size={24} />
                      </button>

                      {/* Carousel Indicators */}
                      <div className="carousel-indicators">
                        {project.images.map((_, index) => (
                          <button
                            key={index}
                            className={`carousel-indicator ${
                              index === currentImageIndex ? 'active' : ''
                            }`}
                            onClick={() => setCurrentImageIndex(index)}
                            aria-label={`Go to image ${index + 1}`}
                          />
                        ))}
                      </div>

                      {/* Image Counter */}
                      <div className="carousel-counter">
                        {currentImageIndex + 1} / {project.images.length}
                      </div>
                    </div>
                  ) : (
                    // Grid for 2 or fewer images
                    <div className="modal-gallery">
                      {project.images.map((image, index) => (
                        <img
                          key={index}
                          src={image}
                          alt={`${project.title} screenshot ${index + 1}`}
                          className="modal-gallery-image"
                        />
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Action Buttons */}
              <div className="modal-actions">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="secondary">
                      <FaGithub size={20} className="mr-2" />
                      View Code
                    </Button>
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="primary">
                      <FaExternalLinkAlt size={18} className="mr-2" />
                      Live Demo
                    </Button>
                  </a>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ProjectModal;