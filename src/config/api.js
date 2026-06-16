// API Configuration
export const API_CONFIG = {
  // Your actual AWS API Gateway URL with /prod stage
  BASE_URL: 'ENTER_API_KEY',
  
  // API endpoints
  ENDPOINTS: {
    CLAIMS: 'claims',
    CLAIM_BY_ID: (id) => `claims/${id}`,
    CLAIM_STATUS: (id) => `claims/${id}/status`,
    CLAIM_NOTES: (id) => `claims/${id}/notes`,
    UPLOAD: 'upload',
  },
  
  // Request timeout in milliseconds
  TIMEOUT: 15000, // Increased timeout for Lambda cold starts
  
  // Headers
  HEADERS: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    // Add any authentication headers if needed
    // 'Authorization': 'Bearer your-token',
  }
}; 
