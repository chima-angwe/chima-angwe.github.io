import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FaDownload,
  FaSearch,
  FaBolt,
  FaLayerGroup,
  FaChalkboardTeacher,
} from 'react-icons/fa';
import Button from '../../common/button/Button';
import ResumePreviewModal from '../../common/resume-preview-modal/ResumePreviewModal';
import './CVSection.css';

const CVSection = () => {
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

  const highlights = [
    {
      icon: FaSearch,
      title: 'Talks to users first',
      description: 'Every build starts with discovery calls, not a design doc.',
    },
    {
      icon: FaBolt,
      title: 'Ships fast, validates faster',
      description: 'MVP scope keeps shrinking until the riskiest assumption gets tested.',
    },
    {
      icon: FaLayerGroup,
      title: 'Picks up what the problem needs',
      description: 'MERN by default, but I\'ve reached for Flutter and Firebase mid-project when a client needed it.',
    },
    {
      icon: FaChalkboardTeacher,
      title: 'Teaches while building',
      description: 'Run a live React curriculum for adult beginners twice a week \u2014 explaining code out loud sharpens how I write it.',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section className="cv-section">
      <div className="container-custom">
        <motion.div
          className="cv-container"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          {/* Left Side - Main Content */}
          <div className="cv-content">
            <h2 className="cv-title">How I actually work</h2>
            <p className="cv-subtitle">
              I didn't set out to run four things at once &mdash; TrueHire, freelance
              work, and two teaching roles. But building in public and teaching what
              I'm learning turned out to compound. Here's what that looks like day to day.
            </p>

            <motion.div
              className="cv-highlights"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {highlights.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={index}
                    className="highlight-item"
                    variants={itemVariants}
                  >
                    <div className="highlight-icon">
                      <Icon size={18} />
                    </div>
                    <div className="highlight-text">
                      <h4>{item.title}</h4>
                      <p>{item.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            <motion.div
              className="cv-button-wrapper"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <Button
                variant="text"
                className="cv-button"
                onClick={() => setIsResumeModalOpen(true)}
              >
                <FaDownload size={14} />
                View my CV
              </Button>
            </motion.div>
          </div>

          {/* Right Side - Pull quote, replaces the photo grid that used to sit here */}
          <div className="cv-visual">
            <div className="pull-quote">
              <span className="pull-quote-mark">&ldquo;</span>
              <p>Talk to users first, build second.</p>
              <span className="pull-quote-attr">&mdash; the lesson BorrowXchange taught me</span>
            </div>
          </div>
        </motion.div>
      </div>

      <ResumePreviewModal
        isOpen={isResumeModalOpen}
        onClose={() => setIsResumeModalOpen(false)}
      />
    </section>
  );
};

export default CVSection;
