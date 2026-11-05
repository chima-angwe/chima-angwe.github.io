import React from 'react';
import { motion } from 'framer-motion';
import { FaLinkedin, FaGithub, FaTwitter, FaEnvelope, FaArrowRight } from 'react-icons/fa';
import './Contact.css';

const socials = [
  { name: 'GitHub', detail: 'See what I’m building', href: 'https://github.com/chima-angwe', icon: FaGithub },
  { name: 'X', detail: 'Follow along', href: 'https://x.com/chimaangwe', icon: FaTwitter },
  { name: 'Email', detail: 'Send me a note', href: 'mailto:angwechima@gmail.com', icon: FaEnvelope },
];

const Contact = () => (
  <main className="contact-page contact-page-modern">
    <div className="contact-shell container-custom">
      <motion.section
        className="contact-hero"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <span className="contact-kicker"><span className="contact-kicker-dot" /> OPEN TO CONVERSATIONS</span>
        <h1 className="contact-title">Got something<br /><em>good in mind?</em></h1>
        <p className="contact-subtitle">
          Whether you’re looking for an engineer to build with, want to talk through an idea, or just want to connect, I’d be glad to hear from you.
        </p>
        <a
          className="contact-linkedin-cta"
          href="https://www.linkedin.com/in/chima-angwe-679560274/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedin size={20} />
          <span>Connect with me on LinkedIn</span>
          <FaArrowRight className="contact-cta-arrow" size={15} />
        </a>
        <p className="contact-location">Based in Lagos, Nigeria <span>·</span> Open to engineering and consulting work</p>
      </motion.section>

      <motion.section
        className="contact-socials"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.55, ease: 'easeOut' }}
        aria-labelledby="contact-socials-title"
      >
        <div className="contact-socials-heading">
          <span className="contact-socials-overline">AROUND THE WEB</span>
          <h2 id="contact-socials-title">Find me elsewhere</h2>
        </div>
        <div className="contact-social-grid">
          {socials.map(({ name, detail, href, icon: Icon }, index) => (
            <motion.a
              key={name}
              href={href}
              target={name === 'Email' ? undefined : '_blank'}
              rel={name === 'Email' ? undefined : 'noopener noreferrer'}
              className="contact-social-card"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 + index * 0.08, duration: 0.4 }}
              whileHover={{ y: -3 }}
            >
              <span className="contact-social-icon"><Icon size={19} /></span>
              <span className="contact-social-copy"><strong>{name}</strong><small>{detail}</small></span>
              <FaArrowRight className="contact-social-arrow" size={13} />
            </motion.a>
          ))}
        </div>
      </motion.section>
    </div>
  </main>
);

export default Contact;
