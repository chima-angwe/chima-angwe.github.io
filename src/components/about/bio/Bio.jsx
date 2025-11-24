import React from 'react';
import { motion } from 'framer-motion';
import { FaDownload } from 'react-icons/fa';
import Button from '../../common/button/Button';
import './Bio.css';

const Bio = () => {
  return (
    <section className="bio-section">
      <div className="bio-content">
        {/* Image */}
        <motion.div
          className="bio-image-wrapper"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="bio-image-container">
            <img
              src="https://res.cloudinary.com/dpcgk2sev/image/upload/v1763986486/me_reading_master_your_emotions_zpg98e.jpg"
              alt="Chima Angwe"
              className="bio-image"
            />
            {/* Decorative border */}
            <div className="bio-image-border"></div>
          </div>
        </motion.div>

        {/* Text Content */}
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
              Hi! I'm <span className="text-gradient">Chima Angwe</span>, 
              a passionate Full Stack Developer based in Lagos, Nigeria. 
              I specialize in building exceptional digital experiences using the MERN stack 
              (MongoDB, Express.js, React, and Node.js).
            </p>

            <p>
              With a keen eye for design and a deep understanding of modern web technologies, 
              I create applications that are not only functional but also beautiful and user-friendly. 
              My journey in web development began with a curiosity about how things work on the internet, 
              and it has evolved into a career I'm truly passionate about.
            </p>

            <p>
              When I'm not coding, you'll find me exploring new technologies, contributing to open-source 
              projects, or sharing my knowledge through blog posts and tutorials. I believe in continuous 
              learning and staying up-to-date with the latest industry trends.
            </p>

            <p>
              I'm currently open to freelance opportunities and full-time positions where I can contribute 
              my skills and continue to grow as a developer. Let's build something amazing together!
            </p>
          </div>

          {/* Resume Download */}
          <a
            href="/resume.pdf"
            download
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="primary">
              <FaDownload size={16} className="mr-2" />
              Download Resume
            </Button>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Bio;