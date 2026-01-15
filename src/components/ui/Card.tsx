import React from 'react';

/**
 * Props for the Card component
 */
interface CardProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  className?: string;
}

/**
 * Reusable Card component for shadowed containers
 */
export const Card = React.memo<CardProps>(({
  children,
  title,
  description,
  padding = 'md',
  className = '',
}) => {
  const paddingStyles: Record<NonNullable<CardProps['padding']>, string> = {
    none: 'p-0',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
  };
  
  const baseStyles = 'bg-white rounded-lg shadow-lg border border-gray-200';
  const combinedClassName = `${baseStyles} ${paddingStyles[padding]} ${className}`.trim();
  
  return (
    <div className={combinedClassName}>
      {(title || description) && (
        <div className={padding !== 'none' ? 'mb-4' : 'p-4 pb-0'}>
          {title && (
            <h2 className="text-xl font-semibold text-gray-900">
              {title}
            </h2>
          )}
          {description && (
            <p className="mt-1 text-sm text-gray-600">
              {description}
            </p>
          )}
        </div>
      )}
      
      {children}
    </div>
  );
});

Card.displayName = 'Card';
