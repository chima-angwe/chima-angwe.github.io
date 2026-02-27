import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaDownload } from 'react-icons/fa';
import Button from '../../common/button/Button';
import ResumePreviewModal from '../../common/resume-preview-modal/ResumePreviewModal';
import './Bio.css';

const Bio = () => {
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  return (
    <section className="bio-section overflow-visible">
      <div className="bio-content">
        <motion.div
          className="bio-image-wrapper"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="bio-image-container">
            <img
              src="https://res.cloudinary.com/dpcgk2sev/image/upload/v1767302939/my_new_chima_z7bzan.jpg"
              alt="Chima Angwe"
              className="bio-image"
            />
            <div className="bio-image-border" />
          </div>
        </motion.div>

        <motion.div
          className="bio-text"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="bio-title">About Me</h2>

          <div className="bio-paragraphs">
            <p>
              Hi! I'm <span className="text-gradient">Chima Angwe</span>, a
              software engineer and founder based in Lagos, Nigeria. Right now,
              I'm building TrueHire - a reference checking tool for recruiters.
              I'm in customer discovery mode, talking to 20+ recruiters to
              deeply understand their problems before writing code. (Learned
              that lesson the hard way from my first startup.)
            </p>

            <p>
              Previously, I founded BorrowXchange (P2P rental marketplace). We
              built the full product but paused after realizing we'd built
              without customer validation. That experience taught me: talk to
              users first, build second
            </p>

            <p>
              On the technical side, I'm a full-stack developer (React, Node.js,
              MERN stack). I build fast, clean products. Previously built
              portfolio sites for LinkedIn coaches. I'm open to freelance work
              and consulting while building TrueHire
            </p>
          </div>

          <div className="mt-6 flex justify-start">
            <Button variant="primary" onClick={() => setIsResumeOpen(true)}>
              <FaDownload size={16} className="mr-2" />
              View Resume
            </Button>
          </div>
        </motion.div>
      </div>

      <ResumePreviewModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />
    </section>
  );
};

export default Bio;
