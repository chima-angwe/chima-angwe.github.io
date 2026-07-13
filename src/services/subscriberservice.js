import api from './api';

// Subscribe an email to the journey
export const subscribeToJourney = async (email) => {
  const response = await api.post('/subscribers', { email });
  return response.data;
};

// Get all subscribers (protected)
export const getSubscribers = async () => {
  const response = await api.get('/subscribers');
  return response.data;
};

// Unsubscribe (protected, soft delete)
export const unsubscribeSubscriber = async (id) => {
  const response = await api.patch(`/subscribers/${id}/unsubscribe`);
  return response.data;
};