import { useMemo } from 'react';
import { calculatePredictions } from '@/lib/bettingEngine';
import { MOCK_TEAMS } from '@/services/mockData';
import { USE_MOCK } from '@/config/api';

export function usePredictions(homeTeamId, awayTeamId, homeStats, awayStats) {
  return useMemo(() => {
    const home = homeStats ?? (USE_MOCK ? MOCK_TEAMS[homeTeamId] : null);
    const away = awayStats ?? (USE_MOCK ? MOCK_TEAMS[awayTeamId] : null);
    if (!home || !away) return null;
    return calculatePredictions(home, away);
  }, [homeTeamId, awayTeamId, homeStats, awayStats]);
}

export function useFixturePredictions(fixture) {
  return useMemo(() => {
    if (!fixture) return null;
    const home = USE_MOCK ? MOCK_TEAMS[fixture.homeTeam?.id] : null;
    const away = USE_MOCK ? MOCK_TEAMS[fixture.awayTeam?.id] : null;
    if (!home || !away) return null;
    return calculatePredictions(home, away);
  }, [fixture]);
}
