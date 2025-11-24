import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Button from '../../common/button/Button';
import './CallToAction.css';

const CallToAction = () => {
  return (
    <section className="cta section-padding">
      <div className="container-custom">
        <motion.div
          className="cta-content"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="cta-title">Let's Work Together</h2>
          <p className="cta-description">
            Have a project in mind? I'm always open to discussing new opportunities,
            creative ideas, or partnerships.
          </p>
          <div className="cta-buttons">
            <Link to="/contact">
              <Button variant="primary">Get In Touch</Button>
            </Link>
            <a
              href="/resume.pdf"
              download
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="secondary">Download Resume</Button>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CallToAction;