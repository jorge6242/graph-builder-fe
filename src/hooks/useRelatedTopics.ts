import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { fetchRelatedTopics } from '@/services/graphApi';
import type { RelatedTopicsResponse } from '@/types/graph';

/**
 * Hook para obtener topics relacionados a un topic específico
 * 
 * Usa React Query para:
 * - Cache por combinación graphId + topicId
 * - Ordenamiento automático por score (descendente)
 * - Solo fetch cuando ambos IDs existen
 * - Optimización con select para transformar data
 * 
 * @param graphId - UUID del grafo o null
 * @param topicId - UUID del topic o null
 * @param limit - Opcional: límite de resultados
 * @returns Query object con data ordenada, isLoading, error
 */
export const useRelatedTopics = (
  graphId: string | null,
  topicId: string | null,
  limit?: number
) => {
  return useQuery<RelatedTopicsResponse, Error>({
    queryKey: ['related-topics', graphId, topicId, limit],
    queryFn: () => {
      if (!graphId || !topicId) {
        throw new Error('graphId and topicId are required');
      }
      return fetchRelatedTopics(graphId, topicId, limit);
    },
    // Solo fetch si ambos IDs existen
    enabled: !!(graphId && topicId),
    // Transformar data: ordenar por score descendente
    select: (data) => ({
      ...data,
      related: data.related.sort((a, b) => b.score - a.score),
    }),
    // Mantener data previa durante refetch
    placeholderData: (previousData) => previousData,
  });
};

/**
 * Hook auxiliar para obtener solo los topics ordenados
 * Útil cuando solo necesitas el array de related sin el topic principal
 */
export const useRelatedTopicsList = (
  graphId: string | null,
  topicId: string | null,
  limit?: number
) => {
  const { data, ...rest } = useRelatedTopics(graphId, topicId, limit);
  const sortedTopics = useMemo(() => data?.related || [], [data]);
  return { topics: sortedTopics, ...rest };
};
