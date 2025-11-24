import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { useFetch } from '../../../hooks/useFetch';
import { getFeaturedProjects } from '../../../services/projectService';
import Card from '../../../components/common/card/Card';
import Button from '../../../components/common/button/Button';
import Loader from '../../../components/common/loader/Loader';
import ErrorMessage from '../../../components/common/error-message/ErrorMessage';
import { containerVariants, fadeInUp } from '../../../utils/animations';
import './FeaturedProjects.css';

const FeaturedProjects = () => {
  const { data: projects, loading, error, refetch } = useFetch(getFeaturedProjects);

  if (loading) {
    return (
      <section className="featured-projects section-padding">
        <div className="container-custom">
          <Loader size="large" />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="featured-projects section-padding">
        <div className="container-custom">
          <ErrorMessage message={error} onRetry={refetch} />
        </div>
      </section>
    );
  }

  return (
    <section className="featured-projects section-padding">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          className="featured-projects-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="featured-projects-title">Featured Projects</h2>
          <p className="featured-projects-subtitle">
            Here are some of my recent works that I'm most proud of
          </p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          className="featured-projects-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {projects?.map((project) => (
            <motion.div key={project._id} variants={fadeInUp}>
              <Card className="project-card">
                {/* Project Image */}
                <div className="project-image-wrapper">
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    className="project-image"
                  />
                  <div className="project-overlay">
                    <div className="project-links">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="project-link"
                        >
                          <FaGithub size={24} />
                        </a>
                      )}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="project-link"
                        >
                          <FaExternalLinkAlt size={20} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                {/* Project Info */}
                <div className="project-info">
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-description">{project.description}</p>

                  {/* Tech Stack */}
                  <div className="project-tech">
                    {project.techStack.slice(0, 3).map((tech, index) => (
                      <span key={index} className="project-tech-badge">
                        {tech}
                      </span>
                    ))}
                    {project.techStack.length > 3 && (
                      <span className="project-tech-badge">
                        +{project.techStack.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Button */}
        <motion.div
          className="featured-projects-cta"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <Link to="/projects">
            <Button variant="primary">View All Projects</Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedProjects;