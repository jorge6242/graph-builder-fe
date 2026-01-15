import { z } from 'zod';

// ============================================
// Domain Types (according to Swagger OpenAPI 3.0)
// ============================================

/**
 * Represents a node in the knowledge graph
 */
export interface Node {
  id: string;
  label: string;
}

/**
 * Represents an edge between two nodes
 */
export interface Edge {
  id: string;
  source: string;
  target: string;
  score: number;
  strategy: string;
}

/**
 * Full graph response with nodes and edges
 */
export interface Graph {
  graphId: string;
  nodes: Node[];
  edges: Edge[];
}

/**
 * Request to create a new graph
 */
export interface CreateGraphRequest {
  name: string;
  topics: string[];
  strategy: 'keyword_jaccard' | 'semantic';
  threshold: number;
}

/**
 * Statistics for the created/updated graph
 */
export interface GraphStats {
  topicsCreated: number;
  edgesCreated: number;
  strategy: string;
  threshold: number;
}

/**
 * Response when creating a graph
 */
export interface CreateGraphResponse {
  graphId: string;
  stats: GraphStats;
}

/**
 * Request to add topics to an existing graph
 */
export interface AddTopicsRequest {
  topics: string[];
  strategy: 'keyword_jaccard' | 'semantic';
  threshold: number;
}

/**
 * Related topic with similarity score
 */
export interface RelatedTopic {
  topicId: string;
  label: string;
  score: number;
}

/**
 * Response for related topics
 */
export interface RelatedTopicsResponse {
  topic: {
    id: string;
    label: string;
  };
  related: RelatedTopic[];
}

// ============================================
// Zod Schemas for Validation
// ============================================

/**
 * Validation schema for creating a graph
 *
 * Rules:
 * - name: minimum 3 characters
 * - topics: array with at least 2 topics, each non-empty
 * - strategy: enum ['keyword_jaccard', 'semantic']
 * - threshold: number between 0 and 1
 */
export const CreateGraphSchema = z.object({
  name: z
    .string()
    .min(3, 'Name must be at least 3 characters')
    .max(100, 'Name must be at most 100 characters'),
  topics: z
    .array(
      z.string().min(1, 'Topic cannot be empty').trim()
    )
    .min(2, 'You must add at least 2 topics')
    .max(20, 'A maximum of 20 topics is allowed'),
  strategy: z.enum(['keyword_jaccard', 'semantic']),
  threshold: z
    .number()
    .min(0, 'Threshold must be at least 0')
    .max(1, 'Threshold must be at most 1')
});

/**
 * Validation schema for adding topics
 */
export const AddTopicsSchema = z.object({
  topics: z
    .array(
      z.string().min(1, 'Topic cannot be empty').trim()
    )
    .min(1, 'You must add at least 1 topic')
    .max(10, 'A maximum of 10 topics per request'),
  strategy: z.enum(['keyword_jaccard', 'semantic']),
  threshold: z.number().min(0).max(1)
});

// ============================================
// Zod Schema Type Inference
// ============================================

/**
 * Inferred type from the create graph schema
 * Useful for React Hook Form
 */
export type CreateGraphFormData = z.infer<typeof CreateGraphSchema>;

/**
 * Inferred type from the add topics schema
 */
export type AddTopicsFormData = z.infer<typeof AddTopicsSchema>;

// ============================================
// Types for react-force-graph-2d
// ============================================

/**
 * Node format for react-force-graph-2d
 */
export interface ForceGraphNode {
  id: string;
  name: string;
  val: number;
  color?: string;
}

/**
 * Link format for react-force-graph-2d
 */
export interface ForceGraphLink {
  source: string;
  target: string;
  value: number;
  label?: string;
}

/**
 * Complete data format for react-force-graph-2d
 */
export interface ForceGraphData {
  nodes: ForceGraphNode[];
  links: ForceGraphLink[];
}
