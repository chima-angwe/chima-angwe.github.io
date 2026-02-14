import React, { lazy, Suspense, useState } from 'react';
import { motion } from 'framer-motion';
import { FaPlus } from 'react-icons/fa';
import { useFetch } from '../../../hooks/useFetch';
import { getAllBlogPosts, deleteBlogPost } from '../../../services/blogService';
import Button from '../../../components/common/button/Button';
import Loader from '../../../components/common/loader/Loader';
import ErrorMessage from '../../../components/common/error-message/ErrorMessage';
import './ManageBlog.css';

// Lazy load the modal (only needed when creating/editing)
const SimpleBlogFormModal = lazy(
  () =>
    import(
      '../../../components/admin/simple-blog-form-modal/SimpleBlogFormModal'
    )
);

// Lazy load table component
const BlogPostsTable = lazy(() => import('../BlogPostsTable'));
const EmptyBlogState = lazy(() => import('../EmptyBlogState'));

const TableLoader = () => (
  <div className="table-loader">
    <div className="loader-skeleton" style={{ height: '400px' }} />
  </div>
);

const ManageBlog = () => {
  const [showModal, setShowModal] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const { data, loading, error, refetch } = useFetch(() =>
    getAllBlogPosts(1, 1000)
  );

  const posts = data?.posts || [];

  const handleCreate = () => {
    setEditingPost(null);
    setShowModal(true);
  };

  const handleEdit = (post) => {
    setEditingPost(post);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      try {
        await deleteBlogPost(id);
        refetch();
      } catch (error) {
        alert('Failed to delete blog post');
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
    <div className="manage-blog-page">
      {/* Header - loads immediately */}
      <div className="manage-header">
        <div>
          <h1 className="manage-title">Manage Blog Posts</h1>
          <p className="manage-subtitle">
            Create, edit, and delete your blog posts
          </p>
        </div>
        <Button variant="primary" onClick={handleCreate}>
          <FaPlus size={16} className="mr-2" />
          New Post
        </Button>
      </div>

      {/* Content - lazy loaded */}
      {posts.length > 0 ? (
        <Suspense fallback={<TableLoader />}>
          <BlogPostsTable
            posts={posts}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </Suspense>
      ) : (
        <Suspense fallback={<TableLoader />}>
          <EmptyBlogState onCreate={handleCreate} />
        </Suspense>
      )}

      {/* Modal - lazy loaded (only when needed) */}
      {showModal && (
        <Suspense fallback={null}>
          <SimpleBlogFormModal post={editingPost} onClose={handleModalClose} />
        </Suspense>
      )}
    </div>
  );
};

export default ManageBlog;
