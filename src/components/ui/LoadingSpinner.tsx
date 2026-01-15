import React from 'react';
import { SpinnerIcon } from '@/assets/icons/SpinnerIcon';

/**
 * Tamaños disponibles para el spinner
 */
type SpinnerSize = 'sm' | 'md' | 'lg' | 'xl';

/**
 * Props del componente LoadingSpinner
 */
interface LoadingSpinnerProps {
  /** Tamaño del spinner */
  size?: SpinnerSize;
  /** Mensaje opcional debajo del spinner */
  message?: string;
  /** Color del spinner (clase Tailwind) */
  color?: string;
  /** Centrar en contenedor */
  centered?: boolean;
  /** Clases CSS adicionales */
  className?: string;
}

/**
 * Componente LoadingSpinner animado con mensaje opcional
 */
export const LoadingSpinner = React.memo<LoadingSpinnerProps>(({
  size = 'md',
  message,
  color = 'text-blue-600',
  centered = true,
  className = '',
}) => {
  const sizeStyles: Record<SpinnerSize, string> = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16',
  };
  
  const containerStyles = centered
    ? 'flex flex-col items-center justify-center'
    : 'inline-flex flex-col items-center';
  
  return (
    <div className={`${containerStyles} ${className}`.trim()} role="status" aria-live="polite">
      <SpinnerIcon className={`animate-spin ${sizeStyles[size]} ${color}`} aria-label={message || 'Loading'} />
      
      {message && (
        <p className="mt-2 text-sm text-gray-600">
          {message}
        </p>
      )}
      
      <span className="sr-only">
        {message || 'Loading...'}
      </span>
    </div>
  );
});

LoadingSpinner.displayName = 'LoadingSpinner';
