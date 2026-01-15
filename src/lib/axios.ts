import axios from 'axios';

/**
 * HTTP client configured with Axios
 * 
 * Configuration:
 * - baseURL from environment variable
 * - Default headers: application/json
 * - Interceptor for error handling
 */
export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/v1',
  headers: {'Content-Type': 'application/json'},
  timeout: 30000, // 30 seconds timeout
});

