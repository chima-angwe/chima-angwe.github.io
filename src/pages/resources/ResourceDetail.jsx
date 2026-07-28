import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowLeft, FaDownload, FaFilePdf } from 'react-icons/fa';
import { useFetch } from '../../hooks/useFetch';
import { getResourceBySlug } from '../../services/resourceService';
import DownloadModal from '../../components/resources/download-modal/DownloadModal';
import Loader from '../../components/common/loader/Loader';
import ErrorMessage from '../../components/common/error-message/ErrorMessage';
import './ResourceDetail.css';

const ResourceDetail = () => {
  const { slug } = useParams();
  const [showModal, setShowModal] = useState(false);

  const {
    data: resource,
    loading,
    error,
    refetch,
  } = useFetch(() => getResourceBySlug(slug), [slug]);

  if (loading) return <Loader fullScreen size="large" />;
  if (error) return <ErrorMessage message={error} onRetry={refetch} />;
  if (!resource) return null;

  const metaDescription = resource.description;
  const metaImage =
    resource.thumbnail ||
    'https://res.cloudinary.com/dpcgk2sev/image/upload/v1767302939/my_new_chima_z7bzan.jpg';
  const metaUrl = `https://chima-angwe.github.io/#/resources/${resource.slug}`;

  return (
    <div className="resource-detail-page">
      <Helmet>
        <title>{resource.title} &mdash; Chima Angwe</title>
        <meta property="og:title" content={resource.title} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:image" content={metaImage} />
        <meta property="og:url" content={metaUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="The Thing About Chima" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={resource.title} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content={metaImage} />

        <meta name="description" content={metaDescription} />
      </Helmet>

      <div className="container-custom section-padding">
        <Link to="/resources" className="resource-detail-back">
          <FaArrowLeft size={13} />
          All resources
        </Link>

        <motion.div
          className="resource-detail-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="resource-detail-visual">
            {resource.thumbnail ? (
              <img src={resource.thumbnail} alt={resource.title} />
            ) : (
              <FaFilePdf size={48} className="resource-detail-icon-fallback" />
            )}
          </div>

          <div className="resource-detail-info">
            <span className="tag">
              <span className="tag-dot" />
              {resource.category?.toLowerCase() || 'guide'}
            </span>
            <h1 className="resource-detail-title">{resource.title}</h1>
            <p className="resource-detail-desc">{resource.description}</p>

            <button
              className="resource-detail-btn"
              onClick={() => setShowModal(true)}
            >
              <FaDownload size={14} />
              Get the guide
            </button>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {showModal && (
          <DownloadModal resource={resource} onClose={() => setShowModal(false)} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ResourceDetail;