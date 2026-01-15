import React from 'react';
import { ErrorIcon } from '@/assets/icons/ErrorIcon';

/**
 * Props for the ErrorMessage component
 */
interface ErrorMessageProps {
  /** Error message to display */
  message?: string;
  /** Optional error title */
  title?: string;
  /** Callback for retry button */
  onRetry?: () => void;
  /** Center in container */
  centered?: boolean;
  /** Additional CSS classes */
  className?: string;
}

/**
 * ErrorMessage component for displaying visual error messages
 */
export const ErrorMessage = React.memo<ErrorMessageProps>(({
  message = 'An error has occurred',
  title,
  onRetry,
  centered = true,
  className = '',
}) => {
  const containerStyles = centered
    ? 'flex flex-col items-center justify-center text-center'
    : 'flex flex-col items-start';
  
  return (
    <div
      className={`${containerStyles} p-4 bg-red-50 border border-red-200 rounded-lg ${className}`.trim()}
      role="alert"
      aria-live="assertive"
    >
      {/* Icono de error */}
      <ErrorIcon className="h-10 w-10 text-red-500 mb-2" />
      
      {title && (
        <h3 className="text-lg font-semibold text-red-900 mb-1">
          {title}
        </h3>
      )}
      
      <p className="text-sm text-red-800">
        {message}
      </p>
      
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-3 px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors duration-200"
        >
          Retry
        </button>
      )}
    </div>
  );
});

ErrorMessage.displayName = 'ErrorMessage';
