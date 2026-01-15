import React from 'react';
import { Card } from '@/components/ui';

interface EmptyStateProps {
  /** Main icon (SVG JSX) */
  icon?: React.ReactNode;
  /** Title text */
  title: string;
  /** Description text */
  description: string;
  /** Optional: custom className for container */
  className?: string;
}

/**
 * Generic EmptyState component for empty/placeholder UI
 */
export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  className = '',
}) => (
  <Card>
    <div className={`flex flex-col items-center justify-center py-12 text-center ${className}`}>
      {icon && icon}
      <h3 className="text-sm font-medium text-gray-700 mb-1">{title}</h3>
      <p className="text-xs text-gray-500 max-w-xs">{description}</p>
    </div>
  </Card>
);

EmptyState.displayName = 'EmptyState';
