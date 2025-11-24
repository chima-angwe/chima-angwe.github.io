import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ProjectCard from '../project-card/ProjectCard';
import ProjectModal from '../project-modal/ProjectModal';
import { containerVariants, fadeInUp } from '../../../utils/animations';
import './ProjectGrid.css';

const ProjectGrid = ({ projects }) => {
  const [selectedProject, setSelectedProject] = useState(null);

  const handleProjectClick = (project) => {
    setSelectedProject(project);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  return (
    <>
      <motion.div
        className="project-grid"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {projects.map((project) => (
          <motion.div key={project._id} variants={fadeInUp}>
            <ProjectCard
              project={project}
              onClick={() => handleProjectClick(project)}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Project Modal */}
      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={handleCloseModal} />
      )}
    </>
  );
};

export default ProjectGrid;