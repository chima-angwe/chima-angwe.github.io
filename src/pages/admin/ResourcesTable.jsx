import React from 'react';
import { motion } from 'framer-motion';
import { FaEdit, FaTrash, FaFilePdf, FaDownload } from 'react-icons/fa';
import { formatDate } from '../../utils/formatDate';

const ResourcesTable = ({ resources, onEdit, onDelete }) => {
  return (
    <div className="resources-table-wrapper">
      <table className="resources-table">
        <thead>
          <tr>
            <th>Cover</th>
            <th>Title</th>
            <th>Category</th>
            <th>Downloads</th>
            <th>Created</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {resources.map((resource) => (
            <motion.tr
              key={resource._id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <td>
                {resource.thumbnail ? (
                  <img
                    src={resource.thumbnail}
                    alt={resource.title}
                    className="resource-thumbnail"
                  />
                ) : (
                  <div className="resource-thumbnail resource-thumbnail-fallback">
                    <FaFilePdf size={16} />
                  </div>
                )}
              </td>
              <td className="resource-title-cell">{resource.title}</td>
              <td>
                <span className="resource-category">{resource.category}</span>
              </td>
              <td>
                <div className="download-count">
                  <FaDownload size={12} />
                  {resource.downloadCount || 0}
                </div>
              </td>
              <td>{formatDate(resource.createdAt)}</td>
              <td>
                <div className="action-buttons">
                  <button
                    onClick={() => onEdit(resource)}
                    className="action-btn edit-btn"
                    title="Edit"
                  >
                    <FaEdit size={15} />
                  </button>
                  <button
                    onClick={() => onDelete(resource._id)}
                    className="action-btn delete-btn"
                    title="Delete"
                  >
                    <FaTrash size={15} />
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

export default ResourcesTable;