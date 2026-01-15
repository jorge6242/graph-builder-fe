import React, { useId } from 'react';
import { DropdownIcon } from '@/assets/icons/DropdownIcon';

/**
 * Individual select option
 */
export interface SelectOption {
  value: string;
  label: string;
}

/**
 * Props for the Select component
 */
interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  /** Select label */
  label?: string;
  /** Select options */
  options: SelectOption[];
  /** Error message (shows visual error state) */
  error?: string;
  /** Helper text below the select */
  helperText?: string;
  /** Placeholder as first disabled option */
  placeholder?: string;
  /** Full width of the container */
  fullWidth?: boolean;
}

/**
 * Reusable Select component compatible with React Hook Form
 * 
 */
export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(({
  label,
  options,
  error,
  helperText,
  placeholder,
  fullWidth = true,
  className = '',
  id,
  ...props
}, ref) => {
  const reactId = useId();
  const selectId = id || `select-${reactId}`;
  const errorId = `${selectId}-error`;
  const helperId = `${selectId}-helper`;
  
  const baseStyles = 'block px-3 py-2 pr-10 border rounded-lg text-gray-900 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-0 appearance-none bg-white';
  
  const stateStyles = error
    ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
    : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500';
  
  const disabledStyles = props.disabled
    ? 'bg-gray-100 cursor-not-allowed'
    : 'cursor-pointer';
  
  const widthStyles = fullWidth ? 'w-full' : '';
  
  const combinedClassName = `${baseStyles} ${stateStyles} ${disabledStyles} ${widthStyles} ${className}`.trim();
  
  return (
    <div className={fullWidth ? 'w-full' : ''}>
      {label && (
        <label
          htmlFor={selectId}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
        </label>
      )}
      
      <div className="relative">
        <select
          ref={ref}
          id={selectId}
          className={combinedClassName}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : helperText ? helperId : undefined}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        
        {/* Icono de dropdown */}
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <DropdownIcon className="h-5 w-5" />
        </div>
      </div>
      
      {error && (
        <p
          id={errorId}
          className="mt-1 text-sm text-red-600"
          role="alert"
        >
          {error}
        </p>
      )}
      
      {!error && helperText && (
        <p
          id={helperId}
          className="mt-1 text-sm text-gray-500"
        >
          {helperText}
        </p>
      )}
    </div>
  );
});

Select.displayName = 'Select';
