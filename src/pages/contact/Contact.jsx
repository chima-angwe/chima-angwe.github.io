import React from 'react';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaEnvelope, FaPhone } from 'react-icons/fa';
import ContactForm from '../../components/contact/contact-form/ContactForm';
import SocialLinks from '../../components/contact/social-links/SocialLinks';
import './Contact.css';

const Contact = () => {
  const contactInfo = [
    {
      icon: FaMapMarkerAlt,
      label: 'Location',
      value: 'Lagos, Nigeria',
    },
    {
      icon: FaEnvelope,
      label: 'Email',
      value: 'angwechima@gmail.com',
      link: 'mailto:angwechima@gmail.com',
    },
    {
      icon: FaPhone,
      label: 'Phone',
      value: '+234 810 401 8914',
      link: 'tel:+2348104018914',
    },
  ];

  return (
    <div className="contact-page">
      <div className="container-custom section-padding">
        {/* Page Header */}
        <motion.div
          className="contact-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="contact-kicker tag">
            <span className="tag-dot" />
            case file &middot; 004
          </span>
          <h1 className="contact-title">Let's Connect</h1>
          <p className="contact-subtitle">
            Most of what's on this site came out of a conversation somewhere
            &mdash; a discovery call, a DM, a comment on a post. If you want to
            start one, this is how.
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="contact-content">
          {/* Contact Form */}
          <div className="contact-form-section">
            <ContactForm />
          </div>

          {/* Contact Info */}
          <motion.div
            className="contact-info-section"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <h2 className="contact-info-title">Other ways in</h2>
            <p className="contact-info-description">
              Prefer email or a call? Either works.
            </p>

            <div className="contact-info-list">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <div key={index} className="contact-info-item">
                    <div className="contact-info-icon">
                      <Icon size={18} />
                    </div>
                    <div className="contact-info-text">
                      <p className="contact-info-label">{info.label}</p>
                      {info.link ? (
                        <a
                          href={info.link}
                          className="contact-info-value contact-info-link"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="contact-info-value">{info.value}</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Availability */}
            <div className="contact-availability">
              <h3 className="contact-availability-title">A heads-up on timing</h3>
              <p className="contact-availability-text">
                Between TrueHire discovery calls and two teaching schedules,
                some weeks are fuller than others &mdash; but I read
                everything, and you'll hear back within a day or two.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Social Links */}
        <SocialLinks />
      </div>
    </div>
  );
};

export default Contact;