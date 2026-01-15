'use client';

import React, { useMemo } from 'react';
import { useRelatedTopics } from '@/hooks';
import { Card, Badge, LoadingSpinner, ErrorMessage } from '@/components/ui';
import { EmptyState } from '@/components/ui/EmptyState';
import { SelectNodeIcon } from '@/assets/icons/SelectNodeIcon';

/**
 * Props for the NodeDetails component
 */
interface NodeDetailsProps {
  /** Current graph ID */
  graphId: string | null;
  /** Selected node/topic ID */
  nodeId: string | null;
}

/**
 * NodeDetails component - Sidebar panel with related topics
 */
export const NodeDetails = React.memo<NodeDetailsProps>(({graphId, nodeId}) => {
  const { data, isLoading, error, refetch } = useRelatedTopics(graphId, nodeId);


  /**
   * Determine Badge variant based on score
   * - High (>0.7): success (green)
   * - Medium (0.4-0.7): info (blue)
   * - Low (<0.4): warning (yellow)
   */
  const getScoreBadgeVariant = useMemo(() => {
    return (score: number): 'success' | 'info' | 'warning' => {
      if (score > 0.7) return 'success';
      if (score >= 0.4) return 'info';
      return 'warning';
    };
  }, []);

  /**
   * Format score as percentage
   */
  const formatScore = useMemo(() => {
    return (score: number): string => {
      return `${(score * 100).toFixed(0)}%`;
    };
  }, []);

  // Empty state - No node selected
  if (!nodeId) {
    return (
      <EmptyState
        icon={<SelectNodeIcon className="h-16 w-16 text-gray-300 mb-3" />}
        title="Select a node"
        description="Click any node in the graph to see its related topics"
      />
    );
  }

  // Loading state
  if (isLoading) {
    return (
      <Card>
        <div className="flex items-center justify-center py-12">
          <LoadingSpinner size="md" message="Loading relations..." />
        </div>
      </Card>
    );
  }

  // Error state
  if (error) {
    return (
      <Card>
        <ErrorMessage
          title="Failed to load"
          message={error.message || 'Could not load related topics'}
          onRetry={() => refetch()}
        />
      </Card>
    );
  }

  // No data or no related topics
  if (!data || !data.related || data.related.length === 0) {
    return (
      <Card
        title={data?.topic.label || 'Topic'}
        description="No related topics"
      >
        <div className="text-center py-8">
          <p className="text-sm text-gray-500">
            This topic has no connections to other topics
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card
      title={data.topic.label}
      description={`${data.related.length} related topic${data.related.length !== 1 ? 's' : ''}`}
      padding="none"
    >
      {/* Scrollable list of related topics */}
      <div className="max-h-125 overflow-y-auto">
        <ul className="divide-y divide-gray-200">
          {data.related.map((relatedTopic, index) => (
            <li
              key={relatedTopic.topicId}
              className="px-4 py-3 hover:bg-gray-50 transition-colors duration-150"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0 mr-3">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-medium text-gray-500"> #{index + 1}</span>
                    <p className="text-sm font-medium text-gray-900 truncate">{relatedTopic.label}</p>
                  </div>
                  <p className="text-xs text-gray-500">Similarity: {formatScore(relatedTopic.score)}</p>
                </div>
                <Badge variant={getScoreBadgeVariant(relatedTopic.score)} size="md">{formatScore(relatedTopic.score)}</Badge>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Footer with statistics */}
      <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
        <div className="flex items-center justify-between text-xs text-gray-600">
          <span>
            Average score:{' '}
            <strong>
              {formatScore( data.related.reduce((sum, t) => sum + t.score, 0) / data.related.length)}
            </strong>
          </span>
          <span>
            Max: <strong>{formatScore(data.related[0]?.score || 0)}</strong>
          </span>
        </div>
      </div>
    </Card>
  );
});

NodeDetails.displayName = 'NodeDetails';
