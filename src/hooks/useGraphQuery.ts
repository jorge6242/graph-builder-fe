import { useQuery } from '@tanstack/react-query';
import { fetchGraph } from '@/services/graphApi';
import type { Graph } from '@/types/graph';

/**
 * Hook para obtener un grafo por su ID
 * 
 * Usa React Query para:
 * - Cache automático (5 min stale, 10 min gc)
 * - Loading/error states built-in
 * - Solo fetch cuando graphId existe (enabled)
 * - Refetch inteligente
 * 
 * @param graphId - UUID del grafo o null
 * @returns Query object con data, isLoading, error, etc.
 */
export const useGraphQuery = (graphId: string | null) => {
  return useQuery<Graph, Error>({
    queryKey: ['graph', graphId],
    queryFn: () => {
      if (!graphId) {
        throw new Error('graphId is required');
      }
      return fetchGraph(graphId);
    },
    // Solo hacer fetch si graphId existe
    enabled: !!graphId,
    // Mantener data previa mientras refetch
    placeholderData: (previousData) => previousData,
    // Stale time ya configurado en queryClient (5 min)
  });
};
