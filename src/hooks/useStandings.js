import { useQuery } from '@tanstack/react-query';
import { USE_MOCK } from '@/config/api';
import * as api from '@/services/footballApi';
import { MOCK_STANDINGS } from '@/services/mockData';
import { WC2026_GROUPS } from '@/constants/teamMappings';

export function useStandings() {
  const query = useQuery({
    queryKey: ['standings'],
    queryFn: api.getStandings,
    staleTime: 60 * 60 * 1000,
    refetchInterval: false,
    enabled: !USE_MOCK,
  });

  if (USE_MOCK) {
    const groups = Object.keys(WC2026_GROUPS);
    const standingsWithLabel = MOCK_STANDINGS.map((group, i) => ({
      group: groups[i],
      teams: group,
    }));
    return { data: standingsWithLabel, isLoading: false, error: null };
  }

  return query;
}
