import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createGraph } from '@/services/graphApi';
import type { CreateGraphRequest, CreateGraphResponse } from '@/types/graph';

/**
 * Hook para crear un nuevo grafo de conocimiento
 * 
 * Usa React Query mutation para:
 * - Manejar loading state automáticamente
 * - Invalidar queries relacionadas después de crear
 * - Manejo de errores centralizado
 * 
 * @returns Mutation object con mutate, mutateAsync, isLoading, error, etc.
 */
export const useCreateGraph = () => {
  const queryClient = useQueryClient();

  return useMutation<CreateGraphResponse, Error, CreateGraphRequest>({
    mutationFn: createGraph,
    
    onSuccess: () => {
      // Invalidar lista de grafos si existiera
      queryClient.invalidateQueries({ queryKey: ['graphs'] });
    },
    
    onError: (error) => {
      console.error('Error creando grafo:', error.message);
    },
  });
};
