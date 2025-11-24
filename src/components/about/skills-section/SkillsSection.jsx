import React from 'react';
import { motion } from 'framer-motion';
import * as FaIcons from 'react-icons/fa';
import * as SiIcons from 'react-icons/si';
import { getSkillsGroupedByCategory } from '../../../data/skills';
import { containerVariants, fadeInUp } from '../../../utils/animations';
import './SkillsSection.css';

const SkillsSection = () => {
  const groupedSkills = getSkillsGroupedByCategory();

  return (
    <section className="skills-section">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="skills-section-title">Skills & Expertise</h2>
        <p className="skills-section-subtitle">
          Technologies and tools I work with on a regular basis
        </p>
      </motion.div>

      <motion.div
        className="skills-categories"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {groupedSkills.map(({ category, skills }) => (
          <motion.div
            key={category}
            className="skills-category-card"
            variants={fadeInUp}
          >
            <h3 className="skills-category-title">{category}</h3>
            <div className="skills-category-items">
              {skills.map((skill) => {
                const Icon = FaIcons[skill.icon] || SiIcons[skill.icon];
                return (
                  <div key={skill.id} className="skill-badge">
                    {Icon && (
                      <Icon size={20} style={{ color: skill.color }} />
                    )}
                    <span>{skill.name}</span>
                  </div>
                );
              })}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default SkillsSection;