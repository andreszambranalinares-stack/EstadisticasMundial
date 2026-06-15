import { useQuery } from '@tanstack/react-query';
import { USE_MOCK } from '@/config/api';
import * as api from '@/services/footballApi';
import { MOCK_FIXTURES } from '@/services/mockData';

export function useMatches(params = {}) {
  return useQuery({
    queryKey: ['fixtures', params],
    queryFn: () => api.getFixtures(params),
    staleTime: 5 * 60 * 1000,
    enabled: !USE_MOCK,
  });
}

export function useAllMatches(params = {}) {
  const query = useQuery({
    queryKey: ['fixtures', params],
    queryFn: () => api.getFixtures(params),
    staleTime: 5 * 60 * 1000,
    enabled: !USE_MOCK,
  });

  if (USE_MOCK) return { data: MOCK_FIXTURES, isLoading: false, error: null };
  return query;
}
