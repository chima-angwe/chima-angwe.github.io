import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { useFetch } from '../../../hooks/useFetch';
import { getFeaturedProjects } from '../../../services/projectService';
import Card from '../../../components/common/card/Card';
import Loader from '../../../components/common/loader/Loader';
import ErrorMessage from '../../../components/common/error-message/ErrorMessage';
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

  // Pull TrueHire out as the lead case file regardless of API return order —
  // don't trust array position, since this list is order-of-creation from the backend,
  // not curated. Falls back to the first item if TrueHire isn't in the response yet.
  const primary =
    projects?.find((p) => p.title?.toLowerCase().includes('truehire')) || projects?.[0];
  const secondary = projects?.filter((p) => p !== primary) || [];

  return (
    <section className="featured-projects section-padding">
      <div className="container-custom">
        <motion.div
          className="featured-projects-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="featured-projects-title">Case files</h2>
          <Link to="/projects" className="featured-projects-seeall">
            View all projects &rarr;
          </Link>
        </motion.div>

        {/* Primary case file */}
        {primary && (
          <motion.div
            className="case-primary"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="case-primary-info">
              <div className="case-primary-meta">
                {primary.category && <span className="tag">{primary.category}</span>}
                {primary.techStack?.slice(0, 3).map((tech, i) => (
                  <span key={i} className="tag">{tech}</span>
                ))}
              </div>
              <h3 className="case-primary-title">{primary.title}</h3>
              <p className="case-primary-desc">{primary.description}</p>
              <div className="case-primary-links">
                {primary.liveUrl && (
                  <a href={primary.liveUrl} target="_blank" rel="noopener noreferrer" className="link-inline">
                    View live <FaExternalLinkAlt size={12} />
                  </a>
                )}
                {primary.githubUrl && (
                  <a href={primary.githubUrl} target="_blank" rel="noopener noreferrer" className="link-inline">
                    <FaGithub size={14} /> Source
                  </a>
                )}
              </div>
            </div>
            <div className="case-primary-visual">
              {primary.thumbnail && <img src={primary.thumbnail} alt={primary.title} />}
            </div>
          </motion.div>
        )}

        {/* Secondary projects */}
        {secondary.length > 0 && (
          <>
            <div className="other-builds-label">Other builds</div>
            <div className="other-builds-grid">
              {secondary.map((project) => (
                <Card key={project._id} className="other-card">
                  <h4 className="other-card-title">{project.title}</h4>
                  <p className="other-card-desc">{project.description}</p>
                  <div className="other-card-stack">
                    {project.techStack?.slice(0, 3).join(' \u00b7 ')}
                  </div>
                </Card>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default FeaturedProjects;