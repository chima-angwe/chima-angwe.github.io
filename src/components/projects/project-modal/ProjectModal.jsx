import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Button from '../../common/button/Button';
import './ProjectModal.css';

const ProjectModal = ({ project, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

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
      <div className="pm-modal-overlay" onClick={onClose}>
        <motion.div
          className="pm-modal-content"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => e.stopPropagation()}
        >
          <button className="pm-modal-close" onClick={onClose}>
            <FaTimes size={24} />
          </button>

          <div className="pm-modal-body">
            <div className="pm-modal-image-wrapper">
              <img
                src={project.thumbnail}
                alt={project.title}
                className="pm-modal-image"
              />
            </div>

            <div className="pm-modal-info">
              <span className="pm-modal-category">{project.category}</span>

              <h2 className="pm-modal-title">{project.title}</h2>

              <p className="pm-modal-description">{project.fullDescription}</p>

              <div className="pm-modal-section">
                <h3 className="pm-modal-section-title">Technologies Used</h3>
                <div className="pm-modal-tech">
                  {project.techStack.map((tech, index) => (
                    <span key={index} className="pm-modal-tech-badge">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {project.images && project.images.length > 0 && (
                <div className="pm-modal-section">
                  <h3 className="pm-modal-section-title">Screenshots</h3>

                  {hasCarousel ? (
                    <div className="pm-carousel-container">
                      <button 
                        className="pm-carousel-button pm-carousel-button-prev"
                        onClick={prevImage}
                      >
                        <FaChevronLeft size={24} />
                      </button>

                      <div className="pm-carousel-track">
                        <AnimatePresence mode="wait">
                          <motion.img
                            key={currentImageIndex}
                            src={project.images[currentImageIndex]}
                            alt={`${project.title} screenshot ${currentImageIndex + 1}`}
                            className="pm-carousel-image"
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -100 }}
                            transition={{ duration: 0.3 }}
                          />
                        </AnimatePresence>
                      </div>

                      <button 
                        className="pm-carousel-button pm-carousel-button-next"
                        onClick={nextImage}
                      >
                        <FaChevronRight size={24} />
                      </button>

                      <div className="pm-carousel-indicators">
                        {project.images.map((_, index) => (
                          <button
                            key={index}
                            className={`pm-carousel-indicator ${
                              index === currentImageIndex ? 'active' : ''
                            }`}
                            onClick={() => setCurrentImageIndex(index)}
                          />
                        ))}
                      </div>

                      <div className="pm-carousel-counter">
                        {currentImageIndex + 1} / {project.images.length}
                      </div>
                    </div>
                  ) : (
                    <div className="pm-modal-gallery">
                      {project.images.map((image, index) => (
                        <img
                          key={index}
                          src={image}
                          alt={`${project.title} screenshot ${index + 1}`}
                          className="pm-modal-gallery-image"
                        />
                      ))}
                    </div>
                  )}
                </div>
              )}

              <div className="pm-modal-actions">
                {project.githubUrl && (
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                    <Button variant="secondary">
                      <FaGithub size={20} className="mr-2" />
                      View Code
                    </Button>
                  </a>
                )}
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
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
