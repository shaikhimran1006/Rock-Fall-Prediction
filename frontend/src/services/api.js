/**
 * API Service for Rockfall Prediction System
 * Handles all communication with the Flask backend
 */

import axios from 'axios';

// Configure axios defaults
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export const rockfallAPI = {
  // Get API status
  getStatus: async () => {
    try {
      const response = await apiClient.get('/');
      return response.data;
    } catch (error) {
      throw new Error(`Failed to get API status: ${error.message}`);
    }
  },

  // Health check
  checkHealth: async () => {
    try {
      const response = await apiClient.get('/health');
      return response.data;
    } catch (error) {
      throw new Error(`Health check failed: ${error.message}`);
    }
  },

  // Make rockfall prediction
  predict: async (sensorData) => {
    try {
      const response = await apiClient.post('/predict', sensorData);
      return response.data;
    } catch (error) {
      throw new Error(`Prediction failed: ${error.response?.data?.error || error.message}`);
    }
  },

  // Get mock sensor data for live monitoring
  getMockData: async () => {
    try {
      const response = await apiClient.get('/mock-data');
      return response.data;
    } catch (error) {
      throw new Error(`Failed to get mock data: ${error.message}`);
    }
  },

  // Get historical data for charts
  getHistoricalData: async () => {
    try {
      const response = await apiClient.get('/historical-data');
      return response.data;
    } catch (error) {
      throw new Error(`Failed to get historical data: ${error.message}`);
    }
  },
};

// Export utility functions
export const formatRiskLevel = (category) => {
  const levels = {
    Low: { color: '#10b981', bgColor: '#ecfdf5', level: 1 },
    Medium: { color: '#f59e0b', bgColor: '#fffbeb', level: 2 },
    High: { color: '#ef4444', bgColor: '#fef2f2', level: 3 },
    Critical: { color: '#dc2626', bgColor: '#fef2f2', level: 4 },
  };
  return levels[category] || levels.Medium;
};

export const formatTimestamp = (timestamp) => {
  return new Date(timestamp).toLocaleString();
};

export const validateSensorData = (data) => {
  const requiredFields = ['slope_angle', 'joint_spacing', 'rock_strength'];
  const missingFields = requiredFields.filter(field => !(field in data) || data[field] === '');

  if (missingFields.length > 0) {
    throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
  }

  // Validate ranges
  const validations = [
    { field: 'slope_angle', min: 0, max: 90 },
    { field: 'joint_spacing', min: 0, max: 10 },
    { field: 'rock_strength', min: 0, max: 200 },
  ];

  for (const { field, min, max } of validations) {
    if (data[field] !== undefined && (data[field] < min || data[field] > max)) {
      throw new Error(`${field} must be between ${min} and ${max}`);
    }
  }

  return true;
};

export default apiClient;