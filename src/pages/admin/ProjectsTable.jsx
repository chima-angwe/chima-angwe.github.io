import React from 'react';
import { motion } from 'framer-motion';
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import { formatDate } from '../../utils/formatDate';

const ProjectsTable = ({ projects, onEdit, onDelete }) => {
  return (
    <div className="projects-table-wrapper">
      <table className="projects-table">
        <thead>
          <tr>
            <th>Thumbnail</th>
            <th>Title</th>
            <th>Category</th>
            <th>Tech Stack</th>
            <th>Featured</th>
            <th>Created</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <motion.tr
              key={project._id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <td>
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  className="project-thumbnail"
                />
              </td>
              <td className="project-title-cell">{project.title}</td>
              <td>
                <span className="project-category">{project.category}</span>
              </td>
              <td>
                <div className="tech-stack-cell">
                  {project.techStack.slice(0, 2).map((tech, i) => (
                    <span key={i} className="tech-badge">
                      {tech}
                    </span>
                  ))}
                  {project.techStack.length > 2 && (
                    <span className="tech-badge">
                      +{project.techStack.length - 2}
                    </span>
                  )}
                </div>
              </td>
              <td>
                {project.featured ? (
                  <span className="badge-success">Yes</span>
                ) : (
                  <span className="badge-default">No</span>
                )}
              </td>
              <td>{formatDate(project.createdAt)}</td>
              <td>
                <div className="action-buttons">
                  <button
                    onClick={() => window.open(`/projects`, '_blank')}
                    className="action-btn view-btn"
                    title="View"
                  >
                    <FaEye size={16} />
                  </button>
                  <button
                    onClick={() => onEdit(project)}
                    className="action-btn edit-btn"
                    title="Edit"
                  >
                    <FaEdit size={16} />
                  </button>
                  <button
                    onClick={() => onDelete(project._id)}
                    className="action-btn delete-btn"
                    title="Delete"
                  >
                    <FaTrash size={16} />
                  </button>
                </div>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectsTable;