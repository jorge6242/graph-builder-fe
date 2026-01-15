'use client';

import React from 'react';

/**
 * Footer Component - Application footer with tech stack information
 */
export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-12">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between text-sm text-gray-600">
          <div className="mb-2 md:mb-0"><p>Built with{' '} <strong>Next.js 16, React 19, TypeScript, Tailwind CSS</strong></p></div>
          <div className="flex items-center gap-4">
            <span>React Query</span>
            <span>•</span>
            <span>React Hook Form</span>
            <span>•</span>
            <span>Zod</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

Footer.displayName = 'Footer';
