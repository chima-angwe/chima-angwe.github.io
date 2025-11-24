import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useFetch } from '../../hooks/useFetch';
import { getAllProjects } from '../../services/projectService';
import ProjectGrid from '../../components/projects/project-grid/ProjectGrid';
import Loader from '../../components/common/loader/Loader';
import ErrorMessage from '../../components/common/error-message/ErrorMessage';
import { PROJECT_CATEGORIES } from '../../utils/constants';
import './Projects.css';

const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { data: projects, loading, error, refetch } = useFetch(getAllProjects);

  // Filter projects by category
  const filteredProjects = projects
    ? selectedCategory === 'All'
      ? projects
      : projects.filter((project) => project.category === selectedCategory)
    : [];

  return (
    <div className="projects-page">
      <div className="container-custom section-padding">
        {/* Page Header */}
        <motion.div
          className="projects-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="projects-title">My Projects</h1>
          <p className="projects-subtitle">
            A collection of projects I've worked on, showcasing my skills and creativity
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          className="projects-filter"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <button
            className={`filter-button ${
              selectedCategory === 'All' ? 'filter-button-active' : ''
            }`}
            onClick={() => setSelectedCategory('All')}
          >
            All Projects
          </button>
          {PROJECT_CATEGORIES.map((category) => (
            <button
              key={category}
              className={`filter-button ${
                selectedCategory === category ? 'filter-button-active' : ''
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Loading State */}
        {loading && <Loader size="large" />}

        {/* Error State */}
        {error && <ErrorMessage message={error} onRetry={refetch} />}

        {/* Projects Grid */}
        {!loading && !error && filteredProjects.length > 0 && (
          <ProjectGrid projects={filteredProjects} />
        )}

        {/* Empty State */}
        {!loading && !error && filteredProjects.length === 0 && (
          <motion.div
            className="projects-empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="projects-empty-text">
              No projects found in this category.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Projects;