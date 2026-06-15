import apiClient from '@/config/api';
import { WC_LEAGUE_ID, WC_SEASON } from '@/constants/bettingThresholds';
import {
  normalizeFixture,
  normalizeFixtures,
  normalizeStandings,
  normalizeTeamProfile,
} from './normalize';

const norm = (data) => data?.response ?? [];

export async function getFixtures(params = {}) {
  const { data } = await apiClient.get('/fixtures', {
    params: { league: WC_LEAGUE_ID, season: WC_SEASON, ...params },
  });
  return normalizeFixtures(norm(data));
}

export async function getFixtureById(id) {
  const { data } = await apiClient.get('/fixtures', { params: { id } });
  return normalizeFixture(norm(data)[0] ?? null);
}

export async function getFixtureStatistics(fixtureId) {
  const { data } = await apiClient.get('/fixtures/statistics', {
    params: { fixture: fixtureId },
  });
  return norm(data);
}

export async function getFixtureEvents(fixtureId) {
  const { data } = await apiClient.get('/fixtures/events', {
    params: { fixture: fixtureId },
  });
  return norm(data);
}

export async function getFixtureLineups(fixtureId) {
  const { data } = await apiClient.get('/fixtures/lineups', {
    params: { fixture: fixtureId },
  });
  return norm(data);
}

export async function getLiveFixtures() {
  const { data } = await apiClient.get('/fixtures', {
    params: { live: 'all', league: WC_LEAGUE_ID },
  });
  return normalizeFixtures(norm(data));
}

export async function getTeam(teamId) {
  const { data } = await apiClient.get('/teams', { params: { id: teamId } });
  return normalizeTeamProfile(norm(data)[0] ?? null);
}

export async function getTeamStatistics(teamId) {
  const { data } = await apiClient.get('/teams/statistics', {
    params: { team: teamId, league: WC_LEAGUE_ID, season: WC_SEASON },
  });
  return data?.response ?? null;
}

export async function getH2H(team1Id, team2Id) {
  const { data } = await apiClient.get('/fixtures', {
    params: { h2h: `${team1Id}-${team2Id}`, last: 10 },
  });
  return normalizeFixtures(norm(data));
}

export async function getStandings() {
  const { data } = await apiClient.get('/standings', {
    params: { league: WC_LEAGUE_ID, season: WC_SEASON },
  });
  const leagueStandings = norm(data)[0]?.league?.standings ?? [];
  return normalizeStandings(leagueStandings);
}

export async function getPredictions(fixtureId) {
  const { data } = await apiClient.get('/predictions', {
    params: { fixture: fixtureId },
  });
  return norm(data)[0] ?? null;
}

export async function getPlayers(teamId) {
  const { data } = await apiClient.get('/players', {
    params: { team: teamId, league: WC_LEAGUE_ID, season: WC_SEASON },
  });
  return norm(data);
}
