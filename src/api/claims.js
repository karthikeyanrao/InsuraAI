import axios from 'axios';
import { API_CONFIG } from '../config/api';

// Create axios instance with default configuration
const apiClient = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: API_CONFIG.HEADERS,
});

// Add request interceptor for debugging
apiClient.interceptors.request.use(
  (config) => {
    console.log('API Request:', {
      method: config.method?.toUpperCase(),
      url: config.url,
      baseURL: config.baseURL,
      fullURL: `${config.baseURL}${config.url}`,
      params: config.params,
      headers: config.headers
    });
    return config;
  },
  (error) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for debugging
apiClient.interceptors.response.use(
  (response) => {
    console.log('API Response:', {
      status: response.status,
      statusText: response.statusText,
      data: response.data,
      headers: response.headers
    });
    return response;
  },
  (error) => {
    console.error('Response Error:', {
      message: error.message,
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      config: {
        url: error.config?.url,
        method: error.config?.method,
        baseURL: error.config?.baseURL
      }
    });
    return Promise.reject(error);
  }
);

// API functions
export const fetchClaims = async (statusFilter = 'all') => {
  try {
    console.log('Fetching claims with filter:', statusFilter);
    
    const response = await apiClient.get(API_CONFIG.ENDPOINTS.CLAIMS, {
      params: { status: statusFilter }
    });
    
    console.log('Claims API Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching claims:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
      config: error.config
    });
    
    // Provide more specific error messages
    if (error.code === 'ECONNABORTED') {
      throw new Error('Request timeout - API server may be slow or unavailable');
    } else if (error.response?.status === 404) {
      throw new Error('API endpoint not found - check your Lambda URL');
    } else if (error.response?.status === 403) {
      throw new Error('Access denied - check CORS settings in your Lambda');
    } else if (error.response?.status >= 500) {
      throw new Error('Server error - check your Lambda function');
    } else if (error.message.includes('Network Error')) {
      throw new Error('Network error - check your internet connection and API URL');
    } else {
      throw new Error(`API Error: ${error.message}`);
    }
  }
};

export const fetchClaimById = async (id) => {
  try {
    const response = await apiClient.get(API_CONFIG.ENDPOINTS.CLAIM_BY_ID(id));
    
    console.log('Claim Details Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching claim details:', error);
    throw new Error('Failed to fetch claim details from API');
  }
};

export const updateClaimStatus = async (id, newStatus) => {
  try {
    const response = await apiClient.put(API_CONFIG.ENDPOINTS.CLAIM_STATUS(id), {
      status: newStatus
    });
    
    console.log('Status Update Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error updating claim status:', error);
    throw new Error('Failed to update claim status');
  }
};

export const addClaimNote = async (id, note) => {
  try {
    const response = await apiClient.post(API_CONFIG.ENDPOINTS.CLAIM_NOTES(id), {
      note: note
    });
    
    console.log('Add Note Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error adding claim note:', error);
    throw new Error('Failed to add claim note');
  }
};

// Additional API functions you might need
export const createClaim = async (claimData) => {
  try {
    const response = await apiClient.post(API_CONFIG.ENDPOINTS.CLAIMS, claimData);
    
    console.log('Create Claim Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error creating claim:', error);
    throw new Error('Failed to create claim');
  }
};

export const deleteClaim = async (id) => {
  try {
    const response = await apiClient.delete(API_CONFIG.ENDPOINTS.CLAIM_BY_ID(id));
    
    console.log('Delete Claim Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error deleting claim:', error);
    throw new Error('Failed to delete claim');
  }
}; 