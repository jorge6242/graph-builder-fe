'use client';

import React, { useState, useCallback } from 'react';
import { useGraphQuery } from '@/hooks';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { GraphForm } from '@/components/GraphForm';
import { GraphVisualization } from '@/components/GraphVisualization';
import { NodeDetails } from '@/components/NodeDetails';
import { LoadingSpinner, Card } from '@/components/ui';

/**
 * HomePage - Main application orchestrator
 * 
 * Architecture:
 * - 3-column responsive layout (Form | Visualization | Details)
 * - Global states: graphId, selectedNodeId
 * - Optimized handlers with useCallback
 * - Data fetching with React Query
 * 
 * Flow:
 * 1. User creates graph → onGraphCreated(graphId)
 * 2. Automatic graph fetch → useGraphQuery
 * 3. User clicks node → onNodeClick(nodeId)
 * 4. Automatic related topics fetch → useRelatedTopics (in NodeDetails)
 */
export default function HomePage() {
  // Global application states
  const [graphId, setGraphId] = useState<string | null>(null);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  // Fetch current graph
  const { data: graphData, isLoading: isLoadingGraph } = useGraphQuery(graphId);

  /**
   * Optimized handler for graph creation
   * Updates graphId and resets node selection
   */
  const handleGraphCreated = useCallback((id: string) => {
    setGraphId(id);
    setSelectedNodeId(null);
  }, []);

  /**
   * Optimized handler for node clicks
   * Updates selected node to show details
   */
  const handleNodeClick = useCallback((nodeId: string) => {
    setSelectedNodeId(nodeId);
  }, []);

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Sidebar - Form */}
          <aside className="lg:col-span-3">
            <GraphForm onGraphCreated={handleGraphCreated} />
          </aside>

          {/* Center - Graph Visualization */}
          <section className="lg:col-span-6">
            {!graphId && !isLoadingGraph && (
              <Card>
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <svg
                    className="h-24 w-24 text-gray-300 mb-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                  <h2 className="text-xl font-semibold text-gray-700 mb-2">
                    Start by creating your first graph!
                  </h2>
                  <p className="text-gray-500 max-w-md">
                    Use the form on the left to enter a list of topics and create your interactive knowledge graph
                  </p>
                </div>
              </Card>
            )}

            {isLoadingGraph && (
              <Card>
                <div className="flex items-center justify-center py-16">
                  <LoadingSpinner size="xl" message="Generating graph..." />
                </div>
              </Card>
            )}

            {graphData && !isLoadingGraph && (
              <GraphVisualization
                graphData={graphData}
                onNodeClick={handleNodeClick}
                isLoading={isLoadingGraph}
              />
            )}
          </section>

          {/* Right Sidebar - Node Details */}
          <aside className="lg:col-span-3">
            <NodeDetails graphId={graphId} nodeId={selectedNodeId} />
          </aside>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
