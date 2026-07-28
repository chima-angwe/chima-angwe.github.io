import React from 'react';
import { Link } from 'react-router-dom';
import { FaDownload, FaFilePdf, FaLink } from 'react-icons/fa';
import Card from '../../common/card/Card';
import './ResourceCard.css';

const ResourceCard = ({ resource, onDownloadClick }) => {
  return (
    <Card className="resource-card">
      <Link to={`/resources/${resource.slug}`} className="resource-card-thumb">
        {resource.thumbnail ? (
          <img src={resource.thumbnail} alt={resource.title} />
        ) : (
          <FaFilePdf size={32} className="resource-card-icon-fallback" />
        )}
      </Link>
      <div className="resource-card-body">
        <span className="resource-card-category">{resource.category}</span>
        <Link to={`/resources/${resource.slug}`} className="resource-card-title-link">
          <h3 className="resource-card-title">{resource.title}</h3>
        </Link>
        <p className="resource-card-desc">{resource.description}</p>
        <div className="resource-card-actions">
          <button
            className="resource-card-btn"
            onClick={() => onDownloadClick(resource)}
          >
            <FaDownload size={13} />
            Get the guide
          </button>
          <Link
            to={`/resources/${resource.slug}`}
            className="resource-card-share-link"
            title="Open shareable page"
          >
            <FaLink size={13} />
          </Link>
        </div>
      </div>
    </Card>
  );
};

export default ResourceCard;