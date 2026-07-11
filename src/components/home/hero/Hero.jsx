import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import Button from '../../common/button/Button';
import './Hero.css';

const Hero = () => {
  const marqueeItems = [
    'Background Verification',
    'Customer Discovery',
    'Full-Stack Engineering',
    'Lagos, Nigeria',
  ];

  return (
    <section className="hero">
      <div className="hero-container container-custom">
        <div className="hero-grid">
          <div className="hero-content">
            {/* Case-file ref tag */}
            <motion.div
              className="hero-kicker"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="tag">
                <span className="tag-dot" />
                ref: ca&#8209;2026 &middot; lagos, nigeria
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              className="hero-headline"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
            >
              I build things, but first
              <br />
              I check if they're <em>true</em>.
            </motion.h1>

            {/* Lede */}
            <motion.p
              className="hero-lede"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.6 }}
            >
              Founder and full-stack engineer. I shipped a full startup once before validating
              anyone wanted it &mdash; that mistake is why <strong>TrueHire</strong> starts with
              discovery, not code. Right now that means 20+ conversations with recruiters and
              compliance teams before writing a single line.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="hero-buttons"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <Link to="/blog">
                <Button variant="primary">Follow the TrueHire journey</Button>
              </Link>
              <Link to="/contact">
                <Button variant="text">Available for freelance work</Button>
              </Link>
            </motion.div>

            {/* Social Links */}
            <motion.div
              className="hero-social"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55, duration: 0.6 }}
            >
              <a
                href="https://github.com/chima-angwe"
                target="_blank"
                rel="noopener noreferrer"
                className="hero-social-link"
              >
                <FaGithub size={18} />
              </a>
              <a
                href="https://www.linkedin.com/in/chima-angwe-679560274/"
                target="_blank"
                rel="noopener noreferrer"
                className="hero-social-link"
              >
                <FaLinkedin size={18} />
              </a>
            </motion.div>
          </div>

          {/* Case-file photo */}
          <motion.div
            className="hero-photo-wrapper"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            <div className="hero-photo-frame">
              <img
                src="https://res.cloudinary.com/dpcgk2sev/image/upload/v1783783773/me_at_strivon_1_again_h5tfi4.png"
                alt="Chima Angwe"
                className="hero-photo"
              />
              <span className="hero-photo-stamp">CHIMA</span>
              <span className="hero-photo-badge">Founder, TrueHire</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Full-bleed marquee band */}
      <div className="hero-marquee">
        <div className="hero-marquee-track">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span className="hero-marquee-item" key={i}>
              {item}
              <span className="hero-marquee-dot">&middot;</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;