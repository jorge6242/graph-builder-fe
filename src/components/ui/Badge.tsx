import React from 'react';

/**
 * Visual variant types for the badge
 */
type BadgeVariant = 'default' | 'success' | 'warning' | 'danger' | 'info';

/**
 * Available sizes for the badge
 */
type BadgeSize = 'sm' | 'md' | 'lg';

/**
 * Props for the Badge component
 */
interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  className?: string;
}

/**
 * Reusable Badge component for displaying labels, scores, or statuses
 */
export const Badge = React.memo<BadgeProps>(({
  children,
  variant = 'default',
  size = 'md',
  className = '',
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-full';
  
  const variantStyles: Record<BadgeVariant, string> = {
    default: 'bg-gray-100 text-gray-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    danger: 'bg-red-100 text-red-800',
    info: 'bg-blue-100 text-blue-800',
  };
  
  const sizeStyles: Record<BadgeSize, string> = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
    lg: 'px-3 py-1.5 text-base',
  };
  
  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`.trim();
  
  return (
    <span className={combinedClassName}>
      {children}
    </span>
  );
});

Badge.displayName = 'Badge';
