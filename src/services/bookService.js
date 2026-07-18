import api from './api';

// Get all books, ordered for the marquee
export const getAllBooks = async () => {
  const response = await api.get('/books');
  return response.data;
};

// Admin CRUD
export const createBook = async (data) => {
  const response = await api.post('/books', data);
  return response.data;
};

export const updateBook = async (id, data) => {
  const response = await api.put(`/books/${id}`, data);
  return response.data;
};

export const deleteBook = async (id) => {
  const response = await api.delete(`/books/${id}`);
  return response.data;
};