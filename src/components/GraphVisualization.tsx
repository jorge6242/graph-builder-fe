'use client';

import React, { useCallback, useMemo, useRef, useEffect } from 'react';
import { colors, fonts } from '@/styles/tokens';
import dynamic from 'next/dynamic';
import { Card, LoadingSpinner } from '@/components/ui';
import { EmptyState } from '@/components/ui/EmptyState';
import { NoGraphIcon } from '@/assets/icons/NoGraphIcon';
import type { Graph } from '@/types/graph';

// Dynamically import ForceGraph2D to avoid SSR issues
const ForceGraph2D = dynamic(() => import('react-force-graph-2d'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-150">
      <LoadingSpinner size="lg" message="Loading visualization..." />
    </div>
  ),
});

/**
 * GraphVisualization component props
 */
interface GraphVisualizationProps {
  /** Graph data to visualize */
  graphData: Graph | null;
  /** Callback when a node is clicked */
  onNodeClick: (nodeId: string) => void;
  /** Show loading state */
  isLoading?: boolean;
}

/**
 * GraphVisualization Component - Interactive graph visualization
 */
export const GraphVisualization = React.memo<GraphVisualizationProps>(({
  graphData,
  onNodeClick,
  isLoading = false,
}) => {
  const forceRef = useRef<any>(null);

  /**
   * Transform API data to the format expected by react-force-graph-2d
   * Optimized with useMemo to avoid unnecessary recalculations
   */
  const forceGraphData = useMemo(() => {
    if (!graphData) {
      return { nodes: [], links: [] };
    }

    return {
      nodes: graphData.nodes.map((node) => ({
        id: node.id,
        name: node.label,
        val: 10,
      })),
      links: graphData.edges.map((edge) => ({
        source: edge.source,
        target: edge.target,
        value: edge.score,
        label: `${(edge.score * 100).toFixed(0)}%`, 
      })),
    };
  }, [graphData]);

  /**
   * Optimized handler for node clicks
   * useCallback prevents unnecessary parent re-renders
   */
  const handleNodeClick = useCallback(
    (node: any) => {
      onNodeClick(node.id as string);
    },
    [onNodeClick]
  );

  /**
   * Handler for node hover (change cursor)
   */
  const handleNodeHover = useCallback((node: any) => {
    document.body.style.cursor = node ? 'pointer' : 'default';
  }, []);

  /**
   * Custom rendering function for nodes with labels
   * Draws circles + labels with semi-transparent background
   */
  const nodeCanvasObject = useCallback((node: any, ctx: CanvasRenderingContext2D, globalScale: number) => {
    const label = node.name as string;
    const fontSize = 12 / globalScale;
    ctx.font = `${fontSize}px ${fonts.sans}`;
    const textWidth = ctx.measureText(label).width;
    const bckgDimensions = [textWidth, fontSize].map((n) => n + fontSize * 0.2);

    // Draw node circle
    ctx.fillStyle = node.color || colors.primary;
    ctx.beginPath();
    ctx.arc(node.x, node.y, 5, 0, 2 * Math.PI, false);
    ctx.fill();

    // Draw label background
    ctx.fillStyle = colors.labelBg;
    ctx.fillRect(
      node.x - bckgDimensions[0] / 2,
      node.y - bckgDimensions[1] / 2 + 8,
      bckgDimensions[0],
      bckgDimensions[1]
    );

    // Draw label text
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = colors.text;
    ctx.fillText(label, node.x, node.y + 8);
  }, []);

  /**
   * Dynamically calculate width/height for responsiveness
   */
  const [dimensions, setDimensions] = React.useState({ width: 800, height: 600 });

  useEffect(() => {
    const updateDimensions = () => {
      const container = document.getElementById('graph-container');
      if (container) {
        setDimensions({
          width: container.clientWidth,
          height: 600,
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Loading state
  if (isLoading) {
    return (
      <Card>
        <div className="flex items-center justify-center h-150">
          <LoadingSpinner size="lg" message="Loading graph..." />
        </div>
      </Card>
    );
  }

  // Empty state - No graph to visualize
  if (!graphData || forceGraphData.nodes.length === 0) {
    return (
      <EmptyState
        icon={<NoGraphIcon className="h-24 w-24 text-gray-300 mb-4" />}
        title="No graph to visualize"
        description="Create a graph using the form on the left to see the interactive visualization"
        className="h-150"
      />
    );
  }

  return (
    <Card padding="none">
      <div id="graph-container" className="w-full h-150 overflow-hidden">
        <ForceGraph2D
          ref={forceRef}
          graphData={forceGraphData}
          
          // Node configuration
          nodeLabel="name"
          nodeAutoColorBy="id"
          nodeCanvasObject={nodeCanvasObject}
          nodeRelSize={6}
          
          // Link configuration
          linkColor={() => colors.link}
          linkWidth={(link: any) => Math.max(1, link.value * 3)}
          linkDirectionalParticles={2}
          linkDirectionalParticleWidth={2}
          linkDirectionalParticleSpeed={0.005}
          
          // Interaction
          onNodeClick={handleNodeClick}
          onNodeHover={handleNodeHover}
          
          // Performance & Physics
          enableZoomInteraction={true}
          enablePanInteraction={true}
          enableNodeDrag={true}
          cooldownTime={3000}
          d3AlphaDecay={0.02}
          d3VelocityDecay={0.3}
          
          // Dimensions
          width={dimensions.width}
          height={dimensions.height}
          backgroundColor={colors.background}
        />
      </div>

      {/* Info footer */}
      <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center gap-4">
            <span>
              <strong>{forceGraphData.nodes.length}</strong> nodes
            </span>
          </div>
          <div className="text-xs text-gray-500"> </div>
        </div>
      </div>
    </Card>
  );
});

GraphVisualization.displayName = 'GraphVisualization';
