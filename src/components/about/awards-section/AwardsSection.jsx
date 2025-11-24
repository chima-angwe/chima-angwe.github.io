import React from 'react';
import { motion } from 'framer-motion';
import { FaTrophy, FaCertificate } from 'react-icons/fa';
import { containerVariants, fadeInUp } from '../../../utils/animations';
import './AwardsSection.css';

const AwardsSection = () => {
  const achievements = [
    {
      icon: FaCertificate,
      title: 'Full Stack Web Development Certification',
      organization: 'freeCodeCamp',
      date: '2023',
      description: 'Completed comprehensive curriculum covering frontend and backend development.',
    },
    {
      icon: FaCertificate,
      title: 'React Advanced Patterns',
      organization: 'Udemy',
      date: '2023',
      description: 'Mastered advanced React concepts including hooks, context, and performance optimization.',
    },
    {
      icon: FaTrophy,
      title: 'Hackathon Winner',
      organization: 'Tech Conference Lagos',
      date: '2022',
      description: 'First place winner for building an innovative solution to local business challenges.',
    },
    {
      icon: FaCertificate,
      title: 'Node.js & Express Certification',
      organization: 'Coursera',
      date: '2022',
      description: 'Specialized in building RESTful APIs and server-side applications.',
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
            <motion.div
              key={index}
              className="award-item"
              variants={fadeInUp}
            >
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