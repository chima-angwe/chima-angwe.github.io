import React from 'react';
import { motion } from 'framer-motion';
import './SkillsOverview.css';

// Curated subset for the homepage — full stack list with icons lives on the About page.
// A compliance officer or investor doesn't need to see 20 badges to trust the technical work.
const coreSkills = [
  'React',
  'Node.js',
  'Express',
  'MongoDB',
  'REST APIs',
  'Tailwind CSS',
  'Git',
];

const SkillsOverview = () => {
  return (
    <section className="skills-overview section-padding">
      <div className="container-custom">
        <div className="skills-overview-header">
          <h2 className="skills-overview-title">Stack</h2>
        </div>

        <motion.div
          className="skills-row"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {coreSkills.map((skill) => (
            <span key={skill} className="skill-pill">{skill}</span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsOverview;