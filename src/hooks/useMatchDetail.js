import { useQuery } from '@tanstack/react-query';
import { USE_MOCK } from '@/config/api';
import * as api from '@/services/footballApi';
import { normalizeStatistics, normalizeEvents, normalizeLineups } from '@/services/normalize';
import {
  MOCK_FIXTURES,
  MOCK_MATCH_STATS,
  MOCK_EVENTS,
  MOCK_LINEUPS,
} from '@/services/mockData';

export function useMatchDetail(matchId) {
  const id = Number(matchId);
  const fixture = USE_MOCK ? MOCK_FIXTURES.find((f) => f.id === id) ?? null : null;
  const stats = USE_MOCK ? MOCK_MATCH_STATS[id] ?? null : null;
  const events = USE_MOCK ? MOCK_EVENTS[id] ?? [] : [];
  const lineups = USE_MOCK ? MOCK_LINEUPS[id] ?? [] : [];

  const fixtureQuery = useQuery({
    queryKey: ['fixture', id],
    queryFn: () => api.getFixtureById(id),
    staleTime: 5 * 60 * 1000,
    enabled: !USE_MOCK && !!id,
  });

  const statsQuery = useQuery({
    queryKey: ['fixture', id, 'statistics'],
    queryFn: () => api.getFixtureStatistics(id),
    enabled: !USE_MOCK && !!id,
    staleTime: 5 * 60 * 1000,
  });

  const eventsQuery = useQuery({
    queryKey: ['fixture', id, 'events'],
    queryFn: () => api.getFixtureEvents(id),
    enabled: !USE_MOCK && !!id,
    staleTime: 5 * 60 * 1000,
  });

  const lineupsQuery = useQuery({
    queryKey: ['fixture', id, 'lineups'],
    queryFn: () => api.getFixtureLineups(id),
    enabled: !USE_MOCK && !!id,
    staleTime: 60 * 60 * 1000,
  });

  if (USE_MOCK) {
    return {
      fixture,
      stats,
      events,
      lineups,
      isLoading: false,
      error: null,
    };
  }

  const realFixture = fixtureQuery.data ?? null;
  const homeId = realFixture?.homeTeam?.id;

  return {
    fixture: realFixture,
    stats: statsQuery.data ? normalizeStatistics(statsQuery.data, homeId) : null,
    events: eventsQuery.data ? normalizeEvents(eventsQuery.data, homeId) : [],
    lineups: lineupsQuery.data ? normalizeLineups(lineupsQuery.data) : [],
    isLoading: fixtureQuery.isLoading,
    error: fixtureQuery.error,
  };
}
