import React from 'react';
import { FaDownload, FaFilePdf } from 'react-icons/fa';
import Card from '../../common/card/Card';
import './ResourceCard.css';

const ResourceCard = ({ resource, onDownloadClick }) => {
  return (
    <Card className="resource-card">
      <div className="resource-card-thumb">
        {resource.thumbnail ? (
          <img src={resource.thumbnail} alt={resource.title} />
        ) : (
          <FaFilePdf size={32} className="resource-card-icon-fallback" />
        )}
      </div>
      <div className="resource-card-body">
        <span className="resource-card-category">{resource.category}</span>
        <h3 className="resource-card-title">{resource.title}</h3>
        <p className="resource-card-desc">{resource.description}</p>
        <button
          className="resource-card-btn"
          onClick={() => onDownloadClick(resource)}
        >
          <FaDownload size={13} />
          Get the guide
        </button>
      </div>
    </Card>
  );
};

export default ResourceCard;