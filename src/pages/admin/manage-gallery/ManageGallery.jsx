import React, { lazy, Suspense, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { useFetch } from '../../../hooks/useFetch';
import { getAllGalleryImages, deleteGalleryImage } from '../../../services/galleryService';
import Button from '../../../components/common/button/Button';
import Loader from '../../../components/common/loader/Loader';
import ErrorMessage from '../../../components/common/error-message/ErrorMessage';
import './ManageGallery.css';

// Lazy load heavy components
const GalleryGrid = lazy(() => import('../GalleryGrid'));
const EmptyGalleryState = lazy(() => import('../EmptyGalleryState'));
const GalleryFormModal = lazy(() => import('../../../components/admin/gallery-form/GalleryFormModal'));

const GridLoader = () => (
  <div className="gallery-grid-loader">
    <div className="loader-skeleton" style={{ aspectRatio: '1', height: '200px' }} />
    <div className="loader-skeleton" style={{ aspectRatio: '1', height: '200px' }} />
    <div className="loader-skeleton" style={{ aspectRatio: '1', height: '200px' }} />
  </div>
);

const ManageGallery = () => {
  const [showModal, setShowModal] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const { data: posts, loading, error, refetch } = useFetch(getAllGalleryImages);

  const handleCreate = () => {
    setEditingPost(null);
    setShowModal(true);
  };

  const handleEdit = (post) => {
    setEditingPost(post);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this gallery post?')) {
      try {
        await deleteGalleryImage(id);
        refetch();
      } catch (error) {
        alert('Failed to delete post');
      }
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    setEditingPost(null);
    refetch();
  };

  if (loading) return <Loader fullScreen size="large" />;
  if (error) return <ErrorMessage message={error} onRetry={refetch} />;

  return (
    <div className="manage-gallery-page">
      {/* Header - loads immediately */}
      <div className="manage-header">
        <div>
          <h1 className="manage-title">Manage Gallery</h1>
          <p className="manage-subtitle">Upload and manage your gallery posts with multiple images</p>
        </div>
        <Button variant="primary" onClick={handleCreate}>
          <FaPlus size={16} />
          New Post
        </Button>
      </div>

      {/* Content - lazy loaded */}
      {posts && posts.length > 0 ? (
        <Suspense fallback={<GridLoader />}>
          <GalleryGrid posts={posts} onEdit={handleEdit} onDelete={handleDelete} />
        </Suspense>
      ) : (
        <Suspense fallback={<GridLoader />}>
          <EmptyGalleryState onCreate={handleCreate} />
        </Suspense>
      )}

      {/* Modal - lazy loaded (only when needed) */}
      {showModal && (
        <Suspense fallback={null}>
          <GalleryFormModal image={editingPost} onClose={handleModalClose} />
        </Suspense>
      )}
    </div>
  );
};

export default ManageGallery;