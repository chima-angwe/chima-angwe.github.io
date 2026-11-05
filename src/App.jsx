import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/admin/protected-route/ProtectedRoute';
import Layout from './components/layouts/layout/Layout';
import PageSkeleton from './components/common/skeleton/Skeleton';

// Lazy load all pages - only loads when needed
const Home = lazy(() => import('./pages/home/Home'));
const Projects = lazy(() => import('./pages/projects/Projects'));
const Blog = lazy(() => import('./pages/blog/Blog'));
const BlogPostPage = lazy(() => import('./pages/blog-post/BlogPostPage'));
const Contact = lazy(() => import('./pages/contact/Contact'));
const Resources = lazy(() => import('./pages/resources/Resources'));
const ResourceDetail = lazy(() => import('./pages/resources/ResourceDetail'));

// Admin Pages - lazy loaded
const AdminLayout = lazy(() => import('./components/admin/layout/AdminLayout'));
const Login = lazy(() => import('./pages/admin/login/Login'));
const AdminDashboard = lazy(() => import('./pages/admin/admin-dashboard/AdminDashboard'));
const ManageProjects = lazy(() => import('./pages/admin/manage-projects/ManageProjects'));
const ManageGallery = lazy(() => import('./pages/admin/manage-gallery/ManageGallery'));
const ManagerBlog = lazy(() => import('./pages/admin/manage-blog/ManageBlog'));
const ManageSubscribers = lazy(() => import('./pages/admin/manage-subscribers/ManageSubscribers'));
const ManageResources = lazy(() => import('./pages/admin/manage-resources/ManageResources'));
const ManageBooks = lazy(() => import('./pages/admin/manage-books/ManageBooks'));
const ViewMessages = lazy(() => import('./pages/admin/view-messages/ViewMessages'));

const PageLoader = () => <PageSkeleton variant="route" />;

function App() {
  return (
    <AuthProvider>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<Navigate to="/" replace />} />
            <Route path="projects" element={<Projects />} />
            <Route path="blog" element={<Blog />} />
            <Route path="blog/:slug" element={<BlogPostPage />} />
            <Route path="resources" element={<Resources />} />
            <Route path="resources/:slug" element={<ResourceDetail />} />
            <Route path="contact" element={<Contact />} />
          </Route>

          {/* Admin Routes */}
          <Route path="/admin/login" element={<Login />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="projects" element={<ManageProjects />} />
            <Route path="gallery" element={<ManageGallery />} />
            <Route path="blog" element={<ManagerBlog />} />
            <Route path="subscribers" element={<ManageSubscribers />} />
            <Route path="resources" element={<ManageResources />} />
            <Route path="books" element={<ManageBooks />} />
            <Route path="messages" element={<ViewMessages />} />
          </Route>
        </Routes>
      </Suspense>
    </AuthProvider>
  );
}

export default App;