import axios from 'axios';

// Create axios instance with base URL
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// API endpoints
export const apiService = {
  // Health check
  getHealth: () => api.get('/health'),
  
  // Projects
  getProjects: (params = {}) => api.get('/projects', { params }),
  getProject: (id) => api.get(`/projects/${id}`),
  getFeaturedProjects: () => api.get('/projects/featured/list'),
  createProject: (projectData) => api.post('/projects', projectData),
  updateProject: (id, projectData) => api.put(`/projects/${id}`, projectData),
  deleteProject: (id) => api.delete(`/projects/${id}`),
  
  // Skills
  getSkills: (params = {}) => api.get('/skills', { params }),
  getSkill: (id) => api.get(`/skills/${id}`),
  getSkillsByCategory: (category) => api.get(`/skills/category/${category}`),
  createSkill: (skillData) => api.post('/skills', skillData),
  updateSkill: (id, skillData) => api.put(`/skills/${id}`, skillData),
  deleteSkill: (id) => api.delete(`/skills/${id}`),
  
  // Contact
  getContacts: (params = {}) => api.get('/contact', { params }),
  createContact: (contactData) => api.post('/contact', contactData),
  updateContact: (id, status) => api.patch(`/contact/${id}`, { status }),
  deleteContact: (id) => api.delete(`/contact/${id}`),
  
  // Analytics
  getDashboardAnalytics: () => api.get('/analytics/dashboard'),
  getProjectAnalytics: (id) => api.get(`/analytics/projects/${id}/views`),
  getContactStats: (period = 'month') => api.get(`/contacts/stats?period=${period}`),
};

// Error handling helper
export const handleApiError = (error) => {
  if (error.response) {
    // Server responded with error status
    console.error('API Error:', error.response.data);
    return error.response.data;
  } else if (error.request) {
    // Request made but no response
    console.error('Network Error:', error.request);
    return { success: false, message: 'Network error occurred' };
  } else {
    // Something else happened
    console.error('Error:', error.message);
    return { success: false, message: error.message };
  }
};

export default apiService;
