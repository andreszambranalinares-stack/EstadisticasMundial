import { useQuery } from '@tanstack/react-query';
import { USE_MOCK } from '@/config/api';
import * as api from '@/services/footballApi';
import { MOCK_TEAMS, MOCK_PLAYERS } from '@/services/mockData';

export function useTeam(teamId) {
  const id = Number(teamId);

  const teamQuery = useQuery({
    queryKey: ['team', id],
    queryFn: () => api.getTeam(id),
    staleTime: 60 * 60 * 1000,
    enabled: !USE_MOCK && !!id,
  });

  const statsQuery = useQuery({
    queryKey: ['team', id, 'statistics'],
    queryFn: () => api.getTeamStatistics(id),
    staleTime: 60 * 60 * 1000,
    enabled: !USE_MOCK && !!id,
  });

  const playersQuery = useQuery({
    queryKey: ['team', id, 'players'],
    queryFn: () => api.getPlayers(id),
    staleTime: 60 * 60 * 1000,
    enabled: !USE_MOCK && !!id,
  });

  if (USE_MOCK) {
    return {
      team: MOCK_TEAMS[id] ?? null,
      stats: MOCK_TEAMS[id] ?? null,
      players: MOCK_PLAYERS[id] ?? [],
      isLoading: false,
      error: null,
    };
  }

  return {
    team: teamQuery.data,
    stats: statsQuery.data,
    players: playersQuery.data ?? [],
    isLoading: teamQuery.isLoading,
    error: teamQuery.error,
  };
}

export function useAllTeams() {
  const query = useQuery({
    queryKey: ['teams', 'all'],
    queryFn: () => api.getFixtures().then((fixtures) =>
      [...new Map(
        fixtures.flatMap((f) => [
          [f.homeTeam.id, f.homeTeam],
          [f.awayTeam.id, f.awayTeam],
        ])
      ).values()]
    ),
    staleTime: 60 * 60 * 1000,
    enabled: !USE_MOCK,
  });

  if (USE_MOCK) return { data: Object.values(MOCK_TEAMS), isLoading: false, error: null };
  return query;
}
