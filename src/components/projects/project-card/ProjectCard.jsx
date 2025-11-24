import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import Card from '../../common/card/Card';
import './ProjectCard.css';

const ProjectCard = ({ project, onClick }) => {
  return (
    <Card className="project-card" hover={true}>
      {/* Project Image */}
      <div className="project-card-image-wrapper" onClick={onClick}>
        <img
          src={project.thumbnail}
          alt={project.title}
          className="project-card-image"
        />
        <div className="project-card-overlay">
          <span className="project-card-view-more">View Details</span>
        </div>
      </div>

      {/* Project Content */}
      <div className="project-card-content">
        {/* Category Badge */}
        <span className="project-card-category">{project.category}</span>

        {/* Title */}
        <h3 className="project-card-title" onClick={onClick}>
          {project.title}
        </h3>

        {/* Description */}
        <p className="project-card-description">{project.description}</p>

        {/* Tech Stack */}
        <div className="project-card-tech">
          {project.techStack.slice(0, 4).map((tech, index) => (
            <span key={index} className="project-card-tech-badge">
              {tech}
            </span>
          ))}
          {project.techStack.length > 4 && (
            <span className="project-card-tech-badge">
              +{project.techStack.length - 4}
            </span>
          )}
        </div>

        {/* Links */}
        <div className="project-card-links">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="project-card-link"
              onClick={(e) => e.stopPropagation()}
            >
              <FaGithub size={20} />
              <span>Code</span>
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="project-card-link"
              onClick={(e) => e.stopPropagation()}
            >
              <FaExternalLinkAlt size={18} />
              <span>Live Demo</span>
            </a>
          )}
        </div>
      </div>
    </Card>
  );
};

export default ProjectCard;