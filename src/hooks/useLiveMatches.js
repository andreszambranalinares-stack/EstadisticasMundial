import { useQuery } from '@tanstack/react-query';
import { USE_MOCK } from '@/config/api';
import * as api from '@/services/footballApi';
import { MOCK_FIXTURES } from '@/services/mockData';

const mockLive = MOCK_FIXTURES.filter((f) => f.isLive);

export function useLiveMatches() {
  const query = useQuery({
    queryKey: ['fixtures', 'live'],
    queryFn: api.getLiveFixtures,
    refetchInterval: 30_000,
    refetchIntervalInBackground: false,
    staleTime: 25_000,
    enabled: !USE_MOCK,
  });

  if (USE_MOCK) return { data: mockLive, isLoading: false, error: null };
  return query;
}
