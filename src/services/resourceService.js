import api from './api';

// Get all resources
export const getAllResources = async () => {
  const response = await api.get('/resources');
  return response.data;
};

// Get a single resource by slug — used for direct links from Journey posts
export const getResourceBySlug = async (slug) => {
  const response = await api.get(`/resources/${slug}`);
  return response.data;
};

// Request a download — the email gate. Returns { success, url, title }.
export const requestResourceDownload = async (resourceId, email) => {
  const response = await api.post(`/resources/${resourceId}/download`, { email });
  return response.data;
};

// Admin CRUD
export const createResource = async (data) => {
  const response = await api.post('/resources', data);
  return response.data;
};

export const updateResource = async (id, data) => {
  const response = await api.put(`/resources/${id}`, data);
  return response.data;
};

export const deleteResource = async (id) => {
  const response = await api.delete(`/resources/${id}`);
  return response.data;
};