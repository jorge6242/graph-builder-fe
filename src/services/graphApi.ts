import { apiClient } from '@/lib/axios';
import type {
  CreateGraphRequest,
  CreateGraphResponse,
  Graph,
  AddTopicsRequest,
  RelatedTopicsResponse,
} from '@/types/graph';

/**
 * API service for knowledge graph operations
 *
 * Endpoints:
 * - POST   /graphs                                    - Create graph
 * - GET    /graphs/{graphId}                          - Get graph
 * - POST   /graphs/{graphId}/topics                   - Add topics
 * - GET    /graphs/{graphId}/topics/{topicId}/related - Get related topics
 */

/**
 * Creates a new knowledge graph
 *
 * @param data - Request with name, topics, strategy, threshold
 * @returns Promise with graphId and stats
 */
export async function createGraph(
  data: CreateGraphRequest
): Promise<CreateGraphResponse> {
  const response = await apiClient.post<CreateGraphResponse>('/graphs', data);
  return response.data;
}

/**
 * Fetches an existing graph by its ID
 *
 * @param graphId - Graph UUID
 * @returns Promise with graph nodes and edges
 *
 * @throws Error if the graph does not exist (404)
 */
export async function fetchGraph(graphId: string): Promise<Graph> {
  const response = await apiClient.get<Graph>(`/graphs/${graphId}`);
  return response.data;
}

/**
 * Adds new topics to an existing graph
 *
 * @param graphId - Graph UUID
 * @param data - Request with topics, strategy, threshold
 * @returns Promise with updated stats
 */
export async function addTopics(
  graphId: string,
  data: AddTopicsRequest
): Promise<CreateGraphResponse> {
  const response = await apiClient.post<CreateGraphResponse>(`/graphs/${graphId}/topics`,data);
  return response.data;
}

/**
 * Fetches topics related to a specific topic
 *
 * @param graphId - Graph UUID
 * @param topicId - Topic UUID
 * @param limit - Optional: result limit (default: no limit)
 * @returns Promise with selected topic and list of related topics with scores
 */
export async function fetchRelatedTopics(
  graphId: string,
  topicId: string,
  limit?: number
): Promise<RelatedTopicsResponse> {
  const params = limit ? { limit } : undefined;
  const response = await apiClient.get<RelatedTopicsResponse>(`/graphs/${graphId}/topics/${topicId}/related`,{ params });
  return response.data;
}
