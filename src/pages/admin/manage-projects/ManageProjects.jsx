import React, { lazy, Suspense, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { useFetch } from '../../../hooks/useFetch';
import { getAllProjects, deleteProject } from '../../../services/projectService';
import Button from '../../../components/common/button/Button';
import Loader from '../../../components/common/loader/Loader';
import ErrorMessage from '../../../components/common/error-message/ErrorMessage';
import './ManageProjects.css';

// Lazy load heavy components
const ProjectsTable = lazy(() => import('../ProjectsTable'));
const EmptyProjectsState = lazy(() => import('../EmptyProjectsState'));
const ProjectFormModal = lazy(() => import('../../../components/admin/project-form/ProjectFormModal'));

const TableLoader = () => (
  <div className="table-loader">
    <div className="loader-skeleton" style={{ height: '400px' }} />
  </div>
);

const ManageProjects = () => {
  const [showModal, setShowModal] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const { data: projects, loading, error, refetch } = useFetch(getAllProjects);

  const handleCreate = () => {
    setEditingProject(null);
    setShowModal(true);
  };

  const handleEdit = (project) => {
    setEditingProject(project);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await deleteProject(id);
        refetch();
      } catch (error) {
        alert('Failed to delete project');
      }
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    setEditingProject(null);
    refetch();
  };

  if (loading) return <Loader fullScreen size="large" />;
  if (error) return <ErrorMessage message={error} onRetry={refetch} />;

  return (
    <div className="manage-projects-page">
      {/* Header - loads immediately */}
      <div className="manage-header">
        <div>
          <h1 className="manage-title">Manage Projects</h1>
          <p className="manage-subtitle">
            Create, edit, and delete your portfolio projects
          </p>
        </div>
        <Button variant="primary" onClick={handleCreate}>
          <FaPlus size={16} className="mr-2" />
          New Project
        </Button>
      </div>

      {/* Content - lazy loaded */}
      {projects && projects.length > 0 ? (
        <Suspense fallback={<TableLoader />}>
          <ProjectsTable 
            projects={projects} 
            onEdit={handleEdit} 
            onDelete={handleDelete} 
          />
        </Suspense>
      ) : (
        <Suspense fallback={<TableLoader />}>
          <EmptyProjectsState onCreate={handleCreate} />
        </Suspense>
      )}

      {/* Modal - lazy loaded (only when needed) */}
      {showModal && (
        <Suspense fallback={null}>
          <ProjectFormModal project={editingProject} onClose={handleModalClose} />
        </Suspense>
      )}
    </div>
  );
};

export default ManageProjects;