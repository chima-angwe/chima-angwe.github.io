import React from 'react';
import { motion } from 'framer-motion';
import { FaTrophy, FaCertificate } from 'react-icons/fa';
import { MdWork } from 'react-icons/md';

import { containerVariants, fadeInUp } from '../../../utils/animations';
import './AwardsSection.css';

const AwardsSection = () => {
  const achievements = [
    {
      icon: FaCertificate,
      title: 'Advanced Diploma in Software Engineering',
      organization: 'Aptech Computer Education',
      date: '2025',
      description:
        'Comprehensive training in software development, covering multiple programming languages and frameworks.',
    },
    {
      icon: MdWork,
      title: 'Software Engineer',
      organization: 'BorrowXchange',
      date: '2025-2026',
      description:
        'Played a key role in developing scalable web applications and improving user experience.',
    },
    {
      icon: FaTrophy,
      title: 'Award of Recognition',
      organization: 'Aptech Computer Education',
      date: '2025',
      description:
        'Received for outstanding performance and dedication during the software engineering course.',
    },
    {
      icon: FaCertificate,
      title: 'Data Science Career Path',
      organization: 'Udemy',
      date: '2024',
      description:
        'Completed a rigorous curriculum covering data analysis and data visualization.',
    },
    {
      icon: MdWork,
      title: 'Frontend Developer',
      organization: 'Optimalvid',
      date: '2024',
      description:
        'Contributed to the development of user-friendly interfaces and improved website performance.',
    },
  ];

  return (
    <section className="awards-section">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="awards-section-title">Achievements & Certifications</h2>
        <p className="awards-section-subtitle">
          Recognition and certifications I've earned along the way
        </p>
      </motion.div>

      <motion.div
        className="awards-timeline"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {achievements.map((achievement, index) => {
          const Icon = achievement.icon;
          return (
            <motion.div key={index} className="award-item" variants={fadeInUp}>
              <div className="award-icon-wrapper">
                <div className="award-icon">
                  <Icon size={24} />
                </div>
                {index < achievements.length - 1 && (
                  <div className="award-line"></div>
                )}
              </div>
              <div className="award-content">
                <span className="award-date">{achievement.date}</span>
                <h3 className="award-title">{achievement.title}</h3>
                <p className="award-organization">{achievement.organization}</p>
                <p className="award-description">{achievement.description}</p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
};

export default AwardsSection;
