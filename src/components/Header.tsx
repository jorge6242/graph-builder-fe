'use client';

import React from 'react';

/**
 * Header Component - Application header with branding and metadata
 */
export const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Knowledge Graph Builder
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              Create and explore interactive knowledge graphs
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

Header.displayName = 'Header';
