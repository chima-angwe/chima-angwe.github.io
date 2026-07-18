import React, { lazy, Suspense, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { useFetch } from '../../../hooks/useFetch';
import { getAllResources, deleteResource } from '../../../services/resourceService';
import Button from '../../../components/common/button/Button';
import Loader from '../../../components/common/loader/Loader';
import ErrorMessage from '../../../components/common/error-message/ErrorMessage';
import './ManageResources.css';

const ResourcesTable = lazy(() => import('../ResourcesTable'));
const EmptyResourcesState = lazy(() => import('../EmptyResourcesState'));
const ResourceFormModal = lazy(() =>
  import('../../../components/admin/resource-form/ResourceFormModal')
);

const TableLoader = () => (
  <div className="table-loader">
    <div className="loader-skeleton" style={{ height: '400px' }} />
  </div>
);

const ManageResources = () => {
  const [showModal, setShowModal] = useState(false);
  const [editingResource, setEditingResource] = useState(null);
  const { data: resources, loading, error, refetch } = useFetch(getAllResources);

  const handleCreate = () => {
    setEditingResource(null);
    setShowModal(true);
  };

  const handleEdit = (resource) => {
    setEditingResource(resource);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this resource? This does not delete the file from Cloudinary.')) {
      try {
        await deleteResource(id);
        refetch();
      } catch (error) {
        alert('Failed to delete resource');
      }
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    setEditingResource(null);
    refetch();
  };

  if (loading) return <Loader fullScreen size="large" />;
  if (error) return <ErrorMessage message={error} onRetry={refetch} />;

  return (
    <div className="manage-resources-page">
      <div className="manage-header">
        <div>
          <h1 className="manage-title">Manage Resources</h1>
          <p className="manage-subtitle">
            Guides and downloads shown on the public Resources page
          </p>
        </div>
        <Button variant="primary" onClick={handleCreate}>
          <FaPlus size={15} />
          New Resource
        </Button>
      </div>

      {resources && resources.length > 0 ? (
        <Suspense fallback={<TableLoader />}>
          <ResourcesTable
            resources={resources}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </Suspense>
      ) : (
        <Suspense fallback={<TableLoader />}>
          <EmptyResourcesState onCreate={handleCreate} />
        </Suspense>
      )}

      {showModal && (
        <Suspense fallback={null}>
          <ResourceFormModal resource={editingResource} onClose={handleModalClose} />
        </Suspense>
      )}
    </div>
  );
};

export default ManageResources; 