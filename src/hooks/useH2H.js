import { useQuery } from '@tanstack/react-query';
import { USE_MOCK } from '@/config/api';
import * as api from '@/services/footballApi';
import { MOCK_H2H } from '@/services/mockData';

export function useH2H(team1Id, team2Id) {
  const key = team1Id && team2Id
    ? [Math.min(team1Id, team2Id), Math.max(team1Id, team2Id)].join('-')
    : null;

  const mockKey1 = `${team1Id}-${team2Id}`;
  const mockKey2 = `${team2Id}-${team1Id}`;

  const mockData = USE_MOCK
    ? MOCK_H2H[mockKey1] ?? MOCK_H2H[mockKey2] ?? []
    : [];

  const query = useQuery({
    queryKey: ['h2h', key],
    queryFn: () => api.getH2H(team1Id, team2Id),
    enabled: !USE_MOCK && !!team1Id && !!team2Id,
    staleTime: 60 * 60 * 1000,
  });

  if (USE_MOCK) return { data: mockData, isLoading: false, error: null };
  return query;
}
