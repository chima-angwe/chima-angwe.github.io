import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaTrophy, FaCertificate, FaLightbulb } from 'react-icons/fa';
import { MdWork } from 'react-icons/md';
import './AwardsSection.css';

const achievements = [
  {
    icon: MdWork,
    title: 'Software Programming Instructor',
    organization: 'Strivon Tech',
    date: '2026–Present',
    description:
      'Empowering young minds to think critically, build confidently, and create with technology.',
  },
  {
    icon: FaCertificate,
    title: 'Advanced Diploma in Software Engineering',
    organization: 'Aptech Computer Education',
    date: '2025',
    description:
      'Comprehensive training in software development, covering multiple programming languages and frameworks.',
  },
  {
    icon: FaLightbulb,
    title: 'Founder',
    organization: 'BorrowXchange',
    date: '2025–2026',
    description:
      "Built and shipped the full product solo, then paused after realizing we'd launched without validating demand—the lesson TrueQuo is built around.",
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
    title: 'YC Startup School',
    organization: 'Y Combinator',
    date: '2025',
    description:
      'Completed the Y Combinator Startup School program, gaining insights into startup growth and development.',
  },
  {
    icon: FaCertificate,
    title: 'Data Science Career Path',
    organization: 'Udemy',
    date: '2024',
    description:
      'Completed a curriculum covering data analysis and data visualization.',
  },
  {
    icon: MdWork,
    title: 'Frontend Developer',
    organization: 'Optimalvid',
    date: '2024',
    description:
      'Contributed to user-friendly interfaces and improved website performance.',
  },
];

const AwardsSection = () => {
  const timelineRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 75%', 'end 55%'],
  });

  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section className="awards-section">
      <motion.header
        className="awards-heading"
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <span className="awards-eyebrow">THE MILESTONES</span>
        <h2 className="awards-section-title">
          Achievements &amp; Certifications
        </h2>
        <p className="awards-section-subtitle">
          Recognition, experience, and things I’ve learned along the way.
        </p>
      </motion.header>

      <div className="awards-timeline" ref={timelineRef}>
        <div className="awards-track" aria-hidden="true">
          <motion.div
            className="awards-track-progress"
            style={{ scaleY: lineScale }}
          />
        </div>

        <div className="awards-list">
          {achievements.map((achievement, index) => {
            const Icon = achievement.icon;

            return (
              <motion.article
                className="award-item"
                key={`${achievement.title}-${achievement.date}`}
                tabIndex={0}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{
                  duration: 0.45,
                  delay: Math.min(index * 0.07, 0.28),
                  ease: 'easeOut',
                }}
                whileHover={{ y: -3 }}
              >
                <div className="award-marker" aria-hidden="true">
                  <span className="award-icon">
                    <Icon size={19} />
                  </span>
                </div>

                <div className="award-content">
                  <span className="award-date">{achievement.date}</span>
                  <h3 className="award-title">{achievement.title}</h3>
                  <p className="award-organization">
                    {achievement.organization}
                  </p>
                  <p className="award-description">
                    {achievement.description}
                  </p>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AwardsSection;