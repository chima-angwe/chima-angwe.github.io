import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useFetch } from '../../hooks/useFetch';
import { getAllResources } from '../../services/resourceService';
import ResourceCard from '../../components/resources/resource-card/ResourceCard';
import DownloadModal from '../../components/resources/download-modal/DownloadModal';
import Loader from '../../components/common/loader/Loader';
import ErrorMessage from '../../components/common/error-message/ErrorMessage';
import './Resources.css';

const Resources = () => {
  const { data: resources, loading, error, refetch } = useFetch(getAllResources);
  const [activeResource, setActiveResource] = useState(null);

  if (loading) return <Loader fullScreen size="large" />;
  if (error) return <ErrorMessage message={error} onRetry={refetch} />;

  return (
    <div className="resources-page">
      <div className="container-custom section-padding">
        <motion.div
          className="resources-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="tag">
            <span className="tag-dot" />
            case file &middot; 005
          </span>
          <h1 className="resources-title">Resources</h1>
          <p className="resources-subtitle">
            Guides I've actually written, not curated from somewhere else &mdash;
            starting with the stuff I wished existed when I needed it.
          </p>
        </motion.div>

        {(!resources || resources.length === 0) ? (
          <div className="resources-empty">
            <p>New guides are on the way. Check back soon.</p>
          </div>
        ) : (
          <div className="resources-grid">
            {resources.map((resource) => (
              <ResourceCard
                key={resource._id}
                resource={resource}
                onDownloadClick={setActiveResource}
              />
            ))}
          </div>
        )}
      </div>


      <AnimatePresence>
        {activeResource && (
          <DownloadModal
            resource={activeResource}
            onClose={() => setActiveResource(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Resources;