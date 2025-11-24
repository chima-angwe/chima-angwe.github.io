import api from './api';

// Submit contact form
export const submitContactForm = async (contactData) => {
  const response = await api.post('/contact', contactData);
  return response.data;
};

// Get all contact messages (protected)
export const getAllMessages = async () => {
  const response = await api.get('/contact');
  return response.data;
};

// Mark message as read (protected)
export const markAsRead = async (id) => {
  const response = await api.patch(`/contact/${id}/read`);
  return response.data;
};

// Delete message (protected)
export const deleteMessage = async (id) => {
  const response = await api.delete(`/contact/${id}`);
  return response.data;
};