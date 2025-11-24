import api from './api';

// Get all gallery images
export const getAllGalleryImages = async () => {
  const response = await api.get('/gallery');
  return response.data;
};

// Get single gallery image
export const getGalleryImage = async (id) => {
  const response = await api.get(`/gallery/${id}`);
  return response.data;
};

// Create gallery image (protected)
export const createGalleryImage = async (imageData) => {
  const response = await api.post('/gallery', imageData);
  return response.data;
};

// Update gallery image (protected)
export const updateGalleryImage = async (id, imageData) => {
  const response = await api.put(`/gallery/${id}`, imageData);
  return response.data;
};

// Delete gallery image (protected)
export const deleteGalleryImage = async (id) => {
  const response = await api.delete(`/gallery/${id}`);
  return response.data;
};
