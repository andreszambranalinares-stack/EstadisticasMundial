import { useMemo } from 'react';
import { calculatePredictions } from '@/lib/bettingEngine';
import { MOCK_TEAMS } from '@/services/mockData';
import { USE_MOCK } from '@/config/api';
import { useStandings } from '@/hooks/useStandings';

// Deriva estadísticas de ataque/defensa de un equipo a partir de la
// clasificación (1 sola request alimenta todas las predicciones).
function statsFromStandings(standings, teamId) {
  if (!teamId) return null;
  for (const { teams } of standings ?? []) {
    const entry = teams.find((t) => t.team?.id === teamId);
    if (entry) {
      const { team } = entry;
      const played = team.played || 0;
      return {
        avgGoalsScored: played > 0 ? team.goalsFor / played : 1.3,
        avgGoalsConceded: played > 0 ? team.goalsAgainst / played : 1.3,
      };
    }
  }
  return null;
}

function resolveStats(explicitStats, teamId, standings) {
  if (explicitStats) return explicitStats;
  if (USE_MOCK) return MOCK_TEAMS[teamId] ?? null;
  return statsFromStandings(standings, teamId) ?? { avgGoalsScored: 1.3, avgGoalsConceded: 1.3 };
}

export function usePredictions(homeTeamId, awayTeamId, homeStats, awayStats) {
  const { data: standings } = useStandings();
  return useMemo(() => {
    const home = resolveStats(homeStats, homeTeamId, standings);
    const away = resolveStats(awayStats, awayTeamId, standings);
    if (!home || !away) return null;
    return calculatePredictions(home, away);
  }, [homeTeamId, awayTeamId, homeStats, awayStats, standings]);
}

export function useFixturePredictions(fixture) {
  const { data: standings } = useStandings();
  return useMemo(() => {
    if (!fixture?.homeTeam || !fixture?.awayTeam) return null;
    const home = resolveStats(null, fixture.homeTeam.id, standings);
    const away = resolveStats(null, fixture.awayTeam.id, standings);
    if (!home || !away) return null;
    return calculatePredictions(home, away);
  }, [fixture, standings]);
}
