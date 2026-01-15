/**
 * Componentes UI atómicos reutilizables
 * 
 * Exportaciones centralizadas de todos los componentes de UI.
 * Todos los componentes:
 * - Solo usan Tailwind CSS
 * - Son totalmente tipados con TypeScript
 * - Usan React.memo para optimización
 * - Compatible con React Hook Form donde aplica
 * - Accesibles (ARIA, semantic HTML)
 */

export { Button } from './Button';
export { Input } from './Input';
export { Select } from './Select';
export type { SelectOption } from './Select';
export { Card } from './Card';
export { Badge } from './Badge';
export { LoadingSpinner } from './LoadingSpinner';
export { ErrorMessage } from './ErrorMessage';
