import api from './api';

// Get all blog posts (with pagination)
export const getAllBlogPosts = async (page = 1, limit = 10) => {
  const response = await api.get(`/blog?page=${page}&limit=${limit}`);
  return response.data;
};

// Get single blog post by slug
export const getBlogPostBySlug = async (slug) => {
  const response = await api.get(`/blog/${slug}`);
  return response.data;
};

// Increment view count
export const incrementViews = async (slug) => {
  const response = await api.patch(`/blog/${slug}/view`);
  return response.data;
};

// Create blog post (protected)
export const createBlogPost = async (postData) => {
  const response = await api.post('/blog', postData);
  return response.data;
};

// Update blog post (protected)
export const updateBlogPost = async (id, postData) => {
  const response = await api.put(`/blog/${id}`, postData);
  return response.data;
};

// Delete blog post (protected)
export const deleteBlogPost = async (id) => {
  const response = await api.delete(`/blog/${id}`);
  return response.data;
};