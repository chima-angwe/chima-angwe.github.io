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
          <h2 className="cta-title">Building in the open.</h2>
          <p className="cta-description">
            Following along, hiring for a project, or just want to talk discovery
            &mdash; I'm easy to find.
          </p>
          <div className="cta-buttons">
            <Link to="/contact">
              <Button variant="primary">Connect with me</Button>
            </Link>
            <Link to="/projects">
              <Button variant="text">See other work</Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CallToAction;
