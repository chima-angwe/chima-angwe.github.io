import api from './api';

// Get all projects
export const getAllProjects = async () => {
  const response = await api.get('/projects');
  return response.data;
};

// Get featured projects
export const getFeaturedProjects = async () => {
  const response = await api.get('/projects/featured');
  return response.data;
};

// Get single project by slug
export const getProjectBySlug = async (slug) => {
  const response = await api.get(`/projects/${slug}`);
  return response.data;
};

// Create project (protected)
export const createProject = async (projectData) => {
  const response = await api.post('/projects', projectData);
  return response.data;
};

// Update project (protected)
export const updateProject = async (id, projectData) => {
  const response = await api.put(`/projects/${id}`, projectData);
  return response.data;
};

// Delete project (protected)
export const deleteProject = async (id) => {
  const response = await api.delete(`/projects/${id}`);
  return response.data;
};