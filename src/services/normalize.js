// Traduce las respuestas crudas de api-sports (v3.football.api-sports.io)
// al formato plano que consumen los componentes (igual que mockData.js).

const LIVE_STATUSES = ['1H', '2H', 'HT', 'ET', 'BT', 'P', 'LIVE', 'INT'];

export function normalizeFixture(item) {
  if (!item) return null;
  // item puede venir ya plano (mock) o crudo (api-sports)
  if (item.homeTeam && item.awayTeam) return item; // ya normalizado

  const fx = item.fixture ?? {};
  const teams = item.teams ?? {};
  return {
    id: fx.id,
    date: fx.date,
    status: {
      short: fx.status?.short,
      elapsed: fx.status?.elapsed,
    },
    round: item.league?.round,
    homeTeam: teams.home
      ? { id: teams.home.id, name: teams.home.name, logo: teams.home.logo }
      : null,
    awayTeam: teams.away
      ? { id: teams.away.id, name: teams.away.name, logo: teams.away.logo }
      : null,
    goals: item.goals ?? { home: null, away: null },
    score: item.score ?? { halftime: {}, fulltime: {} },
    venue: fx.venue?.name ? `${fx.venue.name}${fx.venue.city ? `, ${fx.venue.city}` : ''}` : null,
    isLive: LIVE_STATUSES.includes(fx.status?.short),
  };
}

export function normalizeFixtures(arr) {
  if (!Array.isArray(arr)) return [];
  return arr.map(normalizeFixture).filter((f) => f && f.homeTeam && f.awayTeam);
}

// ── Statistics ──────────────────────────────────────────────────────────
function num(value) {
  if (value === null || value === undefined) return 0;
  if (typeof value === 'string') {
    const cleaned = value.replace('%', '').trim();
    const n = parseFloat(cleaned);
    return Number.isNaN(n) ? 0 : n;
  }
  return value;
}

function statBy(statsArr, type) {
  const found = statsArr?.find((s) => s.type === type);
  return found ? found.value : null;
}

function mapTeamStats(statsArr) {
  return {
    possession: num(statBy(statsArr, 'Ball Possession')),
    shots: num(statBy(statsArr, 'Total Shots')),
    shotsOnTarget: num(statBy(statsArr, 'Shots on Goal')),
    shotsOffTarget: num(statBy(statsArr, 'Shots off Goal')),
    shotsBlocked: num(statBy(statsArr, 'Blocked Shots')),
    xg: num(statBy(statsArr, 'expected_goals')),
    corners: num(statBy(statsArr, 'Corner Kicks')),
    fouls: num(statBy(statsArr, 'Fouls')),
    yellowCards: num(statBy(statsArr, 'Yellow Cards')),
    redCards: num(statBy(statsArr, 'Red Cards')),
    offsides: num(statBy(statsArr, 'Offsides')),
    passAccuracy: num(statBy(statsArr, 'Passes %')),
    tackles: num(statBy(statsArr, 'Total passes')) ? 0 : 0,
    interceptions: 0,
    saves: num(statBy(statsArr, 'Goalkeeper Saves')),
    bigChances: 0,
    dribbles: 0,
  };
}

export function normalizeStatistics(rawArr, homeTeamId) {
  if (!Array.isArray(rawArr) || rawArr.length === 0) return null;
  let home = null;
  let away = null;
  rawArr.forEach((entry) => {
    const mapped = mapTeamStats(entry.statistics);
    if (entry.team?.id === homeTeamId) home = mapped;
    else away = mapped;
  });
  // fallback por orden si no se pudo emparejar por id
  if (!home) home = mapTeamStats(rawArr[0]?.statistics);
  if (!away) away = mapTeamStats(rawArr[1]?.statistics);
  return { home, away };
}

// ── Events ──────────────────────────────────────────────────────────────
export function normalizeEvents(rawArr, homeTeamId) {
  if (!Array.isArray(rawArr)) return [];
  return rawArr.map((e) => ({
    time: { elapsed: e.time?.elapsed ?? 0 },
    team: {
      id: e.team?.id,
      name: e.team?.name,
      side: e.team?.id === homeTeamId ? 'home' : 'away',
    },
    player: { name: e.player?.name },
    assist: e.assist?.name ? { name: e.assist.name } : null,
    type: e.type,
    detail: e.detail,
  }));
}

// ── Lineups ─────────────────────────────────────────────────────────────
export function normalizeLineups(rawArr) {
  if (!Array.isArray(rawArr)) return [];
  return rawArr.map((l) => ({
    team: { id: l.team?.id, name: l.team?.name, logo: l.team?.logo },
    formation: l.formation,
    startXI: (l.startXI ?? []).map((p) => ({
      name: p.player?.name,
      number: p.player?.number,
      pos: p.player?.pos,
      grid: p.player?.grid,
    })),
  }));
}

// ── Standings ───────────────────────────────────────────────────────────
export function normalizeStandings(leagueStandings) {
  if (!Array.isArray(leagueStandings)) return [];
  return leagueStandings.map((groupArr) => {
    const groupName = (groupArr[0]?.group ?? '').replace('Group ', '').trim() || '?';
    return {
      group: groupName,
      teams: groupArr.map((s) => ({
        rank: s.rank,
        team: {
          id: s.team?.id,
          name: s.team?.name,
          logo: s.team?.logo,
          played: s.all?.played ?? 0,
          wins: s.all?.win ?? 0,
          draws: s.all?.draw ?? 0,
          losses: s.all?.lose ?? 0,
          goalsFor: s.all?.goals?.for ?? 0,
          goalsAgainst: s.all?.goals?.against ?? 0,
          pts: s.points ?? 0,
          form: s.form ?? '',
        },
      })),
    };
  });
}

// ── Team profile + statistics ───────────────────────────────────────────
export function normalizeTeamProfile(item) {
  if (!item) return null;
  if (item.name && !item.team) return item; // ya plano
  const t = item.team ?? {};
  return { id: t.id, name: t.name, logo: t.logo, country: t.country };
}

export function normalizeTeamStats(raw, profile) {
  if (!raw) return profile ?? null;
  const goals = raw.goals ?? {};
  const fixtures = raw.fixtures ?? {};
  return {
    id: raw.team?.id ?? profile?.id,
    name: raw.team?.name ?? profile?.name,
    logo: raw.team?.logo ?? profile?.logo,
    played: fixtures.played?.total ?? 0,
    wins: fixtures.wins?.total ?? 0,
    draws: fixtures.draws?.total ?? 0,
    losses: fixtures.loses?.total ?? 0,
    goalsFor: goals.for?.total?.total ?? 0,
    goalsAgainst: goals.against?.total?.total ?? 0,
    avgGoalsScored: parseFloat(goals.for?.average?.total ?? 1.3) || 1.3,
    avgGoalsConceded: parseFloat(goals.against?.average?.total ?? 1.3) || 1.3,
    cleanSheets: raw.clean_sheet?.total ?? 0,
    form: (raw.form ?? '').slice(-5),
    pts: 0,
    possession: 50,
    shotsPerGame: 12,
    passAccuracy: 80,
  };
}
