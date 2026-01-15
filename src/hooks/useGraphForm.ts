import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback } from 'react';
import { CreateGraphSchema } from '@/types/graph';
import { useCreateGraph } from './useCreateGraph';
import type { CreateGraphFormData, CreateGraphResponse } from '@/types/graph';

/**
 * Hook personalizado para el formulario de creación de grafos
 * 
 * Integra:
 * - React Hook Form para manejo del form
 * - Zod para validación
 * - React Query mutation para submit
 * - useCallback para optimización
 * 
 * @returns Objeto con form methods, submit handler, loading y error states
 */
export const useGraphForm = () => {
  // React Hook Form con validación Zod
  const form = useForm<CreateGraphFormData>({
    resolver: zodResolver(CreateGraphSchema),
    defaultValues: {
      name: '',
      topics: ['', ''], // Mínimo 2 topics para empezar
      strategy: 'keyword_jaccard',
      threshold: 0.1,
    },
    mode: 'onBlur', // Validar on blur para mejor UX
  });

  // React Query mutation
  const { mutateAsync, isPending, error } = useCreateGraph();

  /**
   * Handler de submit optimizado con useCallback
   * Evita re-renders innecesarios del componente padre
   */
  const onSubmit = useCallback(
    async (data: CreateGraphFormData): Promise<CreateGraphResponse> => {
      try {
        const result = await mutateAsync(data);
        
        // Reset form después de crear exitosamente
        form.reset();
        
        return result;
      } catch (err) {
        // Error ya manejado por React Query
        throw err;
      }
    },
    [mutateAsync, form]
  );

  return {
    form,
    onSubmit,
    isLoading: isPending,
    error,
  };
};
