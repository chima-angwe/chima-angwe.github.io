import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaArrowRight } from 'react-icons/fa';
import Button from '../../common/button/Button';
import './Hero.css';

const Hero = () => (
  <section className="hero">
    <div className="hero-container container-custom">
      <div className="hero-grid">
        <div className="hero-content">
          <motion.div className="hero-kicker" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
            <span className="hero-status"><span className="tag-dot" /> SOFTWARE ENGINEER <span className="hero-kicker-divider">/</span> LAGOS, NIGERIA</span>
          </motion.div>
          <motion.h1 className="hero-headline" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08, duration: 0.55 }}>
            I turn ideas into <em>software people can use.</em>
          </motion.h1>
          <motion.p className="hero-lede" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18, duration: 0.55 }}>
            I’m Chima, a full-stack engineer who designs, builds, and ships web products—from the first interface to the API and database behind it. I work mainly with React, Node.js, and MongoDB, and care about making the whole thing useful, fast, and dependable.
          </motion.p>
          <motion.p className="hero-founder-note" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.5 }}>
            Currently building <strong>TrueQuo</strong>, while bringing lessons from my first startup, BorrowXchange, into how I build today.
          </motion.p>
          <motion.div className="hero-buttons" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.5 }}>
            <Link to="/projects"><Button variant="primary">Explore my work <FaArrowRight size={13} /></Button></Link>
            <Link to="/contact"><Button variant="text">Get in touch</Button></Link>
          </motion.div>
          <motion.div className="hero-social" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45, duration: 0.5 }}>
            <a href="https://github.com/chima-angwe" target="_blank" rel="noopener noreferrer" className="hero-social-link" aria-label="GitHub"><FaGithub size={18} /></a>
            <a href="https://www.linkedin.com/in/chima-angwe-679560274/" target="_blank" rel="noopener noreferrer" className="hero-social-link" aria-label="LinkedIn"><FaLinkedin size={18} /></a>
            <span className="hero-social-label">Open to engineering and consulting work</span>
          </motion.div>
        </div>
        <motion.div className="hero-photo-wrapper" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2, duration: 0.6 }}>
          <div className="hero-photo-frame">
            <img src="https://res.cloudinary.com/dpcgk2sev/image/upload/v1783783773/me_at_strivon_1_again_h5tfi4.png" alt="Chima Angwe" className="hero-photo" />
            <span className="hero-photo-badge">Engineer · Builder · Lagos</span>
          </div>
          <div className="hero-photo-caption"><span>Currently building</span><strong>TrueQuo <i>↗</i></strong></div>
        </motion.div>
      </div>
    </div>
    <div className="hero-techline"><div className="container-custom"><span>BUILDING WITH</span><p>React <b>·</b> Node.js <b>·</b> Express <b>·</b> MongoDB <b>·</b> REST APIs</p></div></div>
  </section>
);

export default Hero;
