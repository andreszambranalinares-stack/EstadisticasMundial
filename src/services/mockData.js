// ── TEAMS ──────────────────────────────────────────────────────────────────
export const MOCK_TEAMS = {
  1: { id: 1, name: 'United States', group: 'A', played: 1, wins: 0, draws: 1, losses: 0, goalsFor: 1, goalsAgainst: 1, pts: 1, avgGoalsScored: 1.8, avgGoalsConceded: 1.1, cleanSheets: 2, possession: 54, shotsPerGame: 14, passAccuracy: 83, form: 'D', logo: '' },
  2: { id: 2, name: 'España', group: 'A', played: 1, wins: 1, draws: 0, losses: 0, goalsFor: 2, goalsAgainst: 0, pts: 3, avgGoalsScored: 2.4, avgGoalsConceded: 0.7, cleanSheets: 4, possession: 67, shotsPerGame: 18, passAccuracy: 91, form: 'W', logo: '' },
  3: { id: 3, name: 'Morocco', group: 'A', played: 1, wins: 0, draws: 0, losses: 1, goalsFor: 0, goalsAgainst: 2, pts: 0, avgGoalsScored: 1.4, avgGoalsConceded: 0.9, cleanSheets: 3, possession: 44, shotsPerGame: 11, passAccuracy: 79, form: 'L', logo: '' },
  4: { id: 4, name: 'Japan', group: 'A', played: 1, wins: 0, draws: 1, losses: 0, goalsFor: 1, goalsAgainst: 1, pts: 1, avgGoalsScored: 1.6, avgGoalsConceded: 1.0, cleanSheets: 2, possession: 46, shotsPerGame: 12, passAccuracy: 80, form: 'D', logo: '' },
  5: { id: 5, name: 'Mexico', group: 'B', played: 0, wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, pts: 0, avgGoalsScored: 1.7, avgGoalsConceded: 1.2, cleanSheets: 2, possession: 51, shotsPerGame: 13, passAccuracy: 80, form: '', logo: '' },
  6: { id: 6, name: 'Germany', group: 'B', played: 1, wins: 1, draws: 0, losses: 0, goalsFor: 3, goalsAgainst: 1, pts: 3, avgGoalsScored: 2.3, avgGoalsConceded: 1.1, cleanSheets: 3, possession: 58, shotsPerGame: 16, passAccuracy: 86, form: 'W', logo: '' },
  7: { id: 7, name: 'Nigeria', group: 'B', played: 0, wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, pts: 0, avgGoalsScored: 1.5, avgGoalsConceded: 1.3, cleanSheets: 2, possession: 47, shotsPerGame: 12, passAccuracy: 76, form: '', logo: '' },
  8: { id: 8, name: 'South Korea', group: 'B', played: 1, wins: 0, draws: 0, losses: 1, goalsFor: 1, goalsAgainst: 3, pts: 0, avgGoalsScored: 1.4, avgGoalsConceded: 1.2, cleanSheets: 2, possession: 42, shotsPerGame: 11, passAccuracy: 78, form: 'L', logo: '' },
  9: { id: 9, name: 'Canada', group: 'C', played: 0, wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, pts: 0, avgGoalsScored: 1.5, avgGoalsConceded: 1.1, cleanSheets: 3, possession: 49, shotsPerGame: 12, passAccuracy: 79, form: '', logo: '' },
  10: { id: 10, name: 'France', group: 'C', played: 1, wins: 1, draws: 0, losses: 0, goalsFor: 1, goalsAgainst: 0, pts: 3, avgGoalsScored: 2.1, avgGoalsConceded: 0.8, cleanSheets: 4, possession: 60, shotsPerGame: 15, passAccuracy: 88, form: 'W', logo: '' },
  11: { id: 11, name: 'Senegal', group: 'C', played: 1, wins: 0, draws: 0, losses: 1, goalsFor: 0, goalsAgainst: 1, pts: 0, avgGoalsScored: 1.3, avgGoalsConceded: 1.1, cleanSheets: 2, possession: 40, shotsPerGame: 10, passAccuracy: 74, form: 'L', logo: '' },
  12: { id: 12, name: 'Australia', group: 'C', played: 0, wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, pts: 0, avgGoalsScored: 1.3, avgGoalsConceded: 1.3, cleanSheets: 2, possession: 46, shotsPerGame: 11, passAccuracy: 76, form: '', logo: '' },
  13: { id: 13, name: 'Argentina', group: 'D', played: 1, wins: 1, draws: 0, losses: 0, goalsFor: 3, goalsAgainst: 0, pts: 3, avgGoalsScored: 2.2, avgGoalsConceded: 0.8, cleanSheets: 4, possession: 59, shotsPerGame: 17, passAccuracy: 88, form: 'W', logo: '' },
  14: { id: 14, name: 'Portugal', group: 'D', played: 0, wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, pts: 0, avgGoalsScored: 2.3, avgGoalsConceded: 0.9, cleanSheets: 3, possession: 58, shotsPerGame: 16, passAccuracy: 87, form: '', logo: '' },
  15: { id: 15, name: 'Cameroon', group: 'D', played: 1, wins: 0, draws: 0, losses: 1, goalsFor: 0, goalsAgainst: 3, pts: 0, avgGoalsScored: 1.2, avgGoalsConceded: 1.5, cleanSheets: 1, possession: 38, shotsPerGame: 9, passAccuracy: 72, form: 'L', logo: '' },
  16: { id: 16, name: 'Jordan', group: 'D', played: 0, wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, pts: 0, avgGoalsScored: 1.0, avgGoalsConceded: 1.4, cleanSheets: 1, possession: 42, shotsPerGame: 9, passAccuracy: 71, form: '', logo: '' },
  17: { id: 17, name: 'Brasil', group: 'E', played: 1, wins: 1, draws: 0, losses: 0, goalsFor: 2, goalsAgainst: 1, pts: 3, avgGoalsScored: 2.4, avgGoalsConceded: 0.9, cleanSheets: 3, possession: 61, shotsPerGame: 18, passAccuracy: 89, form: 'W', logo: '' },
  18: { id: 18, name: 'Belgium', group: 'E', played: 0, wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, pts: 0, avgGoalsScored: 2.0, avgGoalsConceded: 1.0, cleanSheets: 3, possession: 56, shotsPerGame: 14, passAccuracy: 85, form: '', logo: '' },
  19: { id: 19, name: 'Tunisia', group: 'E', played: 1, wins: 0, draws: 0, losses: 1, goalsFor: 1, goalsAgainst: 2, pts: 0, avgGoalsScored: 1.1, avgGoalsConceded: 1.2, cleanSheets: 2, possession: 39, shotsPerGame: 9, passAccuracy: 73, form: 'L', logo: '' },
  20: { id: 20, name: 'Iraq', group: 'E', played: 0, wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, pts: 0, avgGoalsScored: 1.1, avgGoalsConceded: 1.4, cleanSheets: 1, possession: 43, shotsPerGame: 10, passAccuracy: 72, form: '', logo: '' },
  21: { id: 21, name: 'England', group: 'F', played: 1, wins: 0, draws: 1, losses: 0, goalsFor: 1, goalsAgainst: 1, pts: 1, avgGoalsScored: 2.0, avgGoalsConceded: 0.9, cleanSheets: 3, possession: 56, shotsPerGame: 16, passAccuracy: 86, form: 'D', logo: '' },
  22: { id: 22, name: 'Netherlands', group: 'F', played: 1, wins: 0, draws: 1, losses: 0, goalsFor: 1, goalsAgainst: 1, pts: 1, avgGoalsScored: 1.9, avgGoalsConceded: 1.0, cleanSheets: 3, possession: 54, shotsPerGame: 14, passAccuracy: 85, form: 'D', logo: '' },
  23: { id: 23, name: 'Ghana', group: 'F', played: 0, wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, pts: 0, avgGoalsScored: 1.3, avgGoalsConceded: 1.4, cleanSheets: 1, possession: 44, shotsPerGame: 11, passAccuracy: 75, form: '', logo: '' },
  24: { id: 24, name: 'Ecuador', group: 'F', played: 0, wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, pts: 0, avgGoalsScored: 1.5, avgGoalsConceded: 1.2, cleanSheets: 2, possession: 47, shotsPerGame: 12, passAccuracy: 78, form: '', logo: '' },
  25: { id: 25, name: 'Uruguay', group: 'G', played: 0, wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, pts: 0, avgGoalsScored: 1.8, avgGoalsConceded: 0.9, cleanSheets: 3, possession: 51, shotsPerGame: 13, passAccuracy: 81, form: '', logo: '' },
  26: { id: 26, name: 'Croatia', group: 'G', played: 0, wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, pts: 0, avgGoalsScored: 1.6, avgGoalsConceded: 1.0, cleanSheets: 3, possession: 53, shotsPerGame: 13, passAccuracy: 83, form: '', logo: '' },
  27: { id: 27, name: 'Ivory Coast', group: 'G', played: 0, wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, pts: 0, avgGoalsScored: 1.5, avgGoalsConceded: 1.2, cleanSheets: 2, possession: 47, shotsPerGame: 12, passAccuracy: 77, form: '', logo: '' },
  28: { id: 28, name: 'Saudi Arabia', group: 'G', played: 0, wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, pts: 0, avgGoalsScored: 1.2, avgGoalsConceded: 1.3, cleanSheets: 2, possession: 44, shotsPerGame: 10, passAccuracy: 74, form: '', logo: '' },
  29: { id: 29, name: 'Colombia', group: 'H', played: 0, wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, pts: 0, avgGoalsScored: 1.9, avgGoalsConceded: 1.0, cleanSheets: 3, possession: 54, shotsPerGame: 14, passAccuracy: 82, form: '', logo: '' },
  30: { id: 30, name: 'Poland', group: 'H', played: 0, wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, pts: 0, avgGoalsScored: 1.7, avgGoalsConceded: 1.1, cleanSheets: 2, possession: 50, shotsPerGame: 13, passAccuracy: 81, form: '', logo: '' },
  31: { id: 31, name: 'Egypt', group: 'H', played: 0, wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, pts: 0, avgGoalsScored: 1.3, avgGoalsConceded: 1.2, cleanSheets: 2, possession: 46, shotsPerGame: 11, passAccuracy: 77, form: '', logo: '' },
  32: { id: 32, name: 'New Zealand', group: 'H', played: 0, wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, pts: 0, avgGoalsScored: 1.0, avgGoalsConceded: 1.6, cleanSheets: 1, possession: 41, shotsPerGame: 9, passAccuracy: 71, form: '', logo: '' },
  33: { id: 33, name: 'Venezuela', group: 'I', played: 0, wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, pts: 0, avgGoalsScored: 1.5, avgGoalsConceded: 1.2, cleanSheets: 2, possession: 48, shotsPerGame: 12, passAccuracy: 79, form: '', logo: '' },
  34: { id: 34, name: 'Switzerland', group: 'I', played: 0, wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, pts: 0, avgGoalsScored: 1.7, avgGoalsConceded: 1.0, cleanSheets: 3, possession: 53, shotsPerGame: 13, passAccuracy: 83, form: '', logo: '' },
  35: { id: 35, name: 'Algeria', group: 'I', played: 0, wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, pts: 0, avgGoalsScored: 1.4, avgGoalsConceded: 1.1, cleanSheets: 2, possession: 47, shotsPerGame: 11, passAccuracy: 76, form: '', logo: '' },
  36: { id: 36, name: 'Iran', group: 'I', played: 0, wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, pts: 0, avgGoalsScored: 1.3, avgGoalsConceded: 1.3, cleanSheets: 2, possession: 45, shotsPerGame: 10, passAccuracy: 75, form: '', logo: '' },
  37: { id: 37, name: 'Chile', group: 'J', played: 0, wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, pts: 0, avgGoalsScored: 1.7, avgGoalsConceded: 1.1, cleanSheets: 2, possession: 52, shotsPerGame: 13, passAccuracy: 81, form: '', logo: '' },
  38: { id: 38, name: 'Denmark', group: 'J', played: 0, wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, pts: 0, avgGoalsScored: 1.8, avgGoalsConceded: 0.9, cleanSheets: 3, possession: 55, shotsPerGame: 14, passAccuracy: 84, form: '', logo: '' },
  39: { id: 39, name: 'Serbia', group: 'J', played: 0, wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, pts: 0, avgGoalsScored: 1.6, avgGoalsConceded: 1.2, cleanSheets: 2, possession: 49, shotsPerGame: 12, passAccuracy: 80, form: '', logo: '' },
  40: { id: 40, name: 'Costa Rica', group: 'J', played: 0, wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, pts: 0, avgGoalsScored: 1.2, avgGoalsConceded: 1.4, cleanSheets: 1, possession: 44, shotsPerGame: 10, passAccuracy: 74, form: '', logo: '' },
  41: { id: 41, name: 'Panama', group: 'K', played: 0, wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, pts: 0, avgGoalsScored: 1.1, avgGoalsConceded: 1.3, cleanSheets: 2, possession: 43, shotsPerGame: 10, passAccuracy: 73, form: '', logo: '' },
  42: { id: 42, name: 'Austria', group: 'K', played: 0, wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, pts: 0, avgGoalsScored: 1.7, avgGoalsConceded: 1.1, cleanSheets: 2, possession: 53, shotsPerGame: 13, passAccuracy: 82, form: '', logo: '' },
  43: { id: 43, name: 'Mali', group: 'K', played: 0, wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, pts: 0, avgGoalsScored: 1.3, avgGoalsConceded: 1.2, cleanSheets: 2, possession: 45, shotsPerGame: 11, passAccuracy: 74, form: '', logo: '' },
  44: { id: 44, name: 'Honduras', group: 'K', played: 0, wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, pts: 0, avgGoalsScored: 1.1, avgGoalsConceded: 1.5, cleanSheets: 1, possession: 41, shotsPerGame: 9, passAccuracy: 71, form: '', logo: '' },
  45: { id: 45, name: 'El Salvador', group: 'L', played: 0, wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, pts: 0, avgGoalsScored: 1.0, avgGoalsConceded: 1.5, cleanSheets: 1, possession: 40, shotsPerGame: 8, passAccuracy: 70, form: '', logo: '' },
  46: { id: 46, name: 'Scotland', group: 'L', played: 0, wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, pts: 0, avgGoalsScored: 1.5, avgGoalsConceded: 1.3, cleanSheets: 2, possession: 50, shotsPerGame: 12, passAccuracy: 79, form: '', logo: '' },
  47: { id: 47, name: 'Turkey', group: 'L', played: 0, wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, pts: 0, avgGoalsScored: 1.6, avgGoalsConceded: 1.2, cleanSheets: 2, possession: 51, shotsPerGame: 13, passAccuracy: 80, form: '', logo: '' },
  48: { id: 48, name: 'Guatemala', group: 'L', played: 0, wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, pts: 0, avgGoalsScored: 0.9, avgGoalsConceded: 1.6, cleanSheets: 0, possession: 38, shotsPerGame: 8, passAccuracy: 68, form: '', logo: '' },
};

// ── STANDINGS ─────────────────────────────────────────────────────────────
export const MOCK_STANDINGS = [
  // Group A
  [
    { team: MOCK_TEAMS[2], rank: 1 },
    { team: MOCK_TEAMS[1], rank: 2 },
    { team: MOCK_TEAMS[4], rank: 3 },
    { team: MOCK_TEAMS[3], rank: 4 },
  ],
  // Group B
  [
    { team: MOCK_TEAMS[6], rank: 1 },
    { team: MOCK_TEAMS[5], rank: 2 },
    { team: MOCK_TEAMS[7], rank: 3 },
    { team: MOCK_TEAMS[8], rank: 4 },
  ],
  // Group C
  [
    { team: MOCK_TEAMS[10], rank: 1 },
    { team: MOCK_TEAMS[9], rank: 2 },
    { team: MOCK_TEAMS[12], rank: 3 },
    { team: MOCK_TEAMS[11], rank: 4 },
  ],
  // Group D
  [
    { team: MOCK_TEAMS[13], rank: 1 },
    { team: MOCK_TEAMS[14], rank: 2 },
    { team: MOCK_TEAMS[16], rank: 3 },
    { team: MOCK_TEAMS[15], rank: 4 },
  ],
  // Group E
  [
    { team: MOCK_TEAMS[17], rank: 1 },
    { team: MOCK_TEAMS[18], rank: 2 },
    { team: MOCK_TEAMS[19], rank: 3 },
    { team: MOCK_TEAMS[20], rank: 4 },
  ],
  // Group F
  [
    { team: MOCK_TEAMS[21], rank: 1 },
    { team: MOCK_TEAMS[22], rank: 2 },
    { team: MOCK_TEAMS[24], rank: 3 },
    { team: MOCK_TEAMS[23], rank: 4 },
  ],
  // Group G
  [
    { team: MOCK_TEAMS[25], rank: 1 },
    { team: MOCK_TEAMS[26], rank: 2 },
    { team: MOCK_TEAMS[27], rank: 3 },
    { team: MOCK_TEAMS[28], rank: 4 },
  ],
  // Group H
  [
    { team: MOCK_TEAMS[29], rank: 1 },
    { team: MOCK_TEAMS[30], rank: 2 },
    { team: MOCK_TEAMS[31], rank: 3 },
    { team: MOCK_TEAMS[32], rank: 4 },
  ],
  // Group I
  [
    { team: MOCK_TEAMS[34], rank: 1 },
    { team: MOCK_TEAMS[33], rank: 2 },
    { team: MOCK_TEAMS[35], rank: 3 },
    { team: MOCK_TEAMS[36], rank: 4 },
  ],
  // Group J
  [
    { team: MOCK_TEAMS[38], rank: 1 },
    { team: MOCK_TEAMS[37], rank: 2 },
    { team: MOCK_TEAMS[39], rank: 3 },
    { team: MOCK_TEAMS[40], rank: 4 },
  ],
  // Group K
  [
    { team: MOCK_TEAMS[42], rank: 1 },
    { team: MOCK_TEAMS[41], rank: 2 },
    { team: MOCK_TEAMS[43], rank: 3 },
    { team: MOCK_TEAMS[44], rank: 4 },
  ],
  // Group L
  [
    { team: MOCK_TEAMS[47], rank: 1 },
    { team: MOCK_TEAMS[46], rank: 2 },
    { team: MOCK_TEAMS[45], rank: 3 },
    { team: MOCK_TEAMS[48], rank: 4 },
  ],
];

// ── FIXTURES ──────────────────────────────────────────────────────────────
const d = (dateStr) => new Date(dateStr).toISOString();

export const MOCK_FIXTURES = [
  // ── Completed matches ──
  {
    id: 1001,
    date: d('2026-06-12T16:00:00Z'),
    status: { short: 'FT', elapsed: 90 },
    round: 'Group Stage - 1',
    homeTeam: MOCK_TEAMS[2],
    awayTeam: MOCK_TEAMS[3],
    goals: { home: 2, away: 0 },
    score: { halftime: { home: 1, away: 0 }, fulltime: { home: 2, away: 0 } },
    venue: 'SoFi Stadium, Los Ángeles',
  },
  {
    id: 1002,
    date: d('2026-06-12T19:00:00Z'),
    status: { short: 'FT', elapsed: 90 },
    round: 'Group Stage - 1',
    homeTeam: MOCK_TEAMS[1],
    awayTeam: MOCK_TEAMS[4],
    goals: { home: 1, away: 1 },
    score: { halftime: { home: 0, away: 1 }, fulltime: { home: 1, away: 1 } },
    venue: 'MetLife Stadium, Nueva York',
  },
  {
    id: 1003,
    date: d('2026-06-13T18:00:00Z'),
    status: { short: 'FT', elapsed: 90 },
    round: 'Group Stage - 1',
    homeTeam: MOCK_TEAMS[13],
    awayTeam: MOCK_TEAMS[15],
    goals: { home: 3, away: 0 },
    score: { halftime: { home: 2, away: 0 }, fulltime: { home: 3, away: 0 } },
    venue: 'Rose Bowl, Pasadena',
  },
  {
    id: 1004,
    date: d('2026-06-13T21:00:00Z'),
    status: { short: 'FT', elapsed: 90 },
    round: 'Group Stage - 1',
    homeTeam: MOCK_TEAMS[10],
    awayTeam: MOCK_TEAMS[11],
    goals: { home: 1, away: 0 },
    score: { halftime: { home: 1, away: 0 }, fulltime: { home: 1, away: 0 } },
    venue: 'AT&T Stadium, Dallas',
  },
  {
    id: 1005,
    date: d('2026-06-14T16:00:00Z'),
    status: { short: 'FT', elapsed: 90 },
    round: 'Group Stage - 1',
    homeTeam: MOCK_TEAMS[17],
    awayTeam: MOCK_TEAMS[19],
    goals: { home: 2, away: 1 },
    score: { halftime: { home: 1, away: 1 }, fulltime: { home: 2, away: 1 } },
    venue: 'Hard Rock Stadium, Miami',
  },
  {
    id: 1006,
    date: d('2026-06-14T19:00:00Z'),
    status: { short: 'FT', elapsed: 90 },
    round: 'Group Stage - 1',
    homeTeam: MOCK_TEAMS[6],
    awayTeam: MOCK_TEAMS[8],
    goals: { home: 3, away: 1 },
    score: { halftime: { home: 2, away: 0 }, fulltime: { home: 3, away: 1 } },
    venue: 'Estadio Azteca, Ciudad de México',
  },
  // ── Live match ──
  {
    id: 1007,
    date: d('2026-06-15T16:00:00Z'),
    status: { short: '2H', elapsed: 67 },
    round: 'Group Stage - 1',
    homeTeam: MOCK_TEAMS[21],
    awayTeam: MOCK_TEAMS[22],
    goals: { home: 1, away: 1 },
    score: { halftime: { home: 1, away: 0 }, fulltime: { home: null, away: null } },
    venue: 'Lumen Field, Seattle',
    isLive: true,
  },
  // ── Upcoming matches ──
  {
    id: 1008,
    date: d('2026-06-15T19:00:00Z'),
    status: { short: 'NS', elapsed: null },
    round: 'Group Stage - 1',
    homeTeam: MOCK_TEAMS[29],
    awayTeam: MOCK_TEAMS[30],
    goals: { home: null, away: null },
    score: { halftime: { home: null, away: null }, fulltime: { home: null, away: null } },
    venue: 'Estadio BBVA, Monterrey',
  },
  {
    id: 1009,
    date: d('2026-06-15T22:00:00Z'),
    status: { short: 'NS', elapsed: null },
    round: 'Group Stage - 1',
    homeTeam: MOCK_TEAMS[25],
    awayTeam: MOCK_TEAMS[26],
    goals: { home: null, away: null },
    score: { halftime: { home: null, away: null }, fulltime: { home: null, away: null } },
    venue: 'Arrowhead Stadium, Kansas City',
  },
  {
    id: 1010,
    date: d('2026-06-16T16:00:00Z'),
    status: { short: 'NS', elapsed: null },
    round: 'Group Stage - 1',
    homeTeam: MOCK_TEAMS[14],
    awayTeam: MOCK_TEAMS[16],
    goals: { home: null, away: null },
    score: { halftime: { home: null, away: null }, fulltime: { home: null, away: null } },
    venue: 'BC Place, Vancouver',
  },
  {
    id: 1011,
    date: d('2026-06-16T19:00:00Z'),
    status: { short: 'NS', elapsed: null },
    round: 'Group Stage - 1',
    homeTeam: MOCK_TEAMS[5],
    awayTeam: MOCK_TEAMS[7],
    goals: { home: null, away: null },
    score: { halftime: { home: null, away: null }, fulltime: { home: null, away: null } },
    venue: 'Estadio Akron, Guadalajara',
  },
  {
    id: 1012,
    date: d('2026-06-16T22:00:00Z'),
    status: { short: 'NS', elapsed: null },
    round: 'Group Stage - 1',
    homeTeam: MOCK_TEAMS[37],
    awayTeam: MOCK_TEAMS[39],
    goals: { home: null, away: null },
    score: { halftime: { home: null, away: null }, fulltime: { home: null, away: null } },
    venue: 'BMO Field, Toronto',
  },
  {
    id: 1013,
    date: d('2026-06-17T16:00:00Z'),
    status: { short: 'NS', elapsed: null },
    round: 'Group Stage - 1',
    homeTeam: MOCK_TEAMS[38],
    awayTeam: MOCK_TEAMS[40],
    goals: { home: null, away: null },
    score: { halftime: { home: null, away: null }, fulltime: { home: null, away: null } },
    venue: 'Lincoln Financial Field, Filadelfia',
  },
  {
    id: 1014,
    date: d('2026-06-17T19:00:00Z'),
    status: { short: 'NS', elapsed: null },
    round: 'Group Stage - 1',
    homeTeam: MOCK_TEAMS[18],
    awayTeam: MOCK_TEAMS[20],
    goals: { home: null, away: null },
    score: { halftime: { home: null, away: null }, fulltime: { home: null, away: null } },
    venue: 'NRG Stadium, Houston',
  },
  {
    id: 1015,
    date: d('2026-06-17T22:00:00Z'),
    status: { short: 'NS', elapsed: null },
    round: 'Group Stage - 1',
    homeTeam: MOCK_TEAMS[9],
    awayTeam: MOCK_TEAMS[12],
    goals: { home: null, away: null },
    score: { halftime: { home: null, away: null }, fulltime: { home: null, away: null } },
    venue: "Levi's Stadium, Santa Clara",
  },
];

// ── MATCH STATISTICS ──────────────────────────────────────────────────────
export const MOCK_MATCH_STATS = {
  1001: {
    home: { possession: 67, shots: 18, shotsOnTarget: 8, shotsOffTarget: 7, shotsBlocked: 3, xg: 2.4, corners: 7, fouls: 9, yellowCards: 1, redCards: 0, offsides: 2, passAccuracy: 91, tackles: 16, interceptions: 8, saves: 2, bigChances: 4, dribbles: 6 },
    away: { possession: 33, shots: 8, shotsOnTarget: 2, shotsOffTarget: 5, shotsBlocked: 1, xg: 0.6, corners: 2, fouls: 14, yellowCards: 3, redCards: 0, offsides: 3, passAccuracy: 72, tackles: 22, interceptions: 12, saves: 6, bigChances: 1, dribbles: 3 },
  },
  1002: {
    home: { possession: 54, shots: 14, shotsOnTarget: 5, shotsOffTarget: 7, shotsBlocked: 2, xg: 1.8, corners: 5, fouls: 11, yellowCards: 2, redCards: 0, offsides: 1, passAccuracy: 83, tackles: 18, interceptions: 9, saves: 4, bigChances: 3, dribbles: 5 },
    away: { possession: 46, shots: 12, shotsOnTarget: 4, shotsOffTarget: 6, shotsBlocked: 2, xg: 1.5, corners: 4, fouls: 12, yellowCards: 1, redCards: 0, offsides: 2, passAccuracy: 80, tackles: 19, interceptions: 10, saves: 4, bigChances: 2, dribbles: 4 },
  },
  1003: {
    home: { possession: 60, shots: 20, shotsOnTarget: 10, shotsOffTarget: 7, shotsBlocked: 3, xg: 3.2, corners: 9, fouls: 8, yellowCards: 1, redCards: 0, offsides: 3, passAccuracy: 88, tackles: 14, interceptions: 7, saves: 0, bigChances: 6, dribbles: 8 },
    away: { possession: 40, shots: 7, shotsOnTarget: 1, shotsOffTarget: 5, shotsBlocked: 1, xg: 0.4, corners: 2, fouls: 16, yellowCards: 2, redCards: 1, offsides: 4, passAccuracy: 71, tackles: 28, interceptions: 14, saves: 7, bigChances: 1, dribbles: 2 },
  },
  1004: {
    home: { possession: 61, shots: 16, shotsOnTarget: 6, shotsOffTarget: 7, shotsBlocked: 3, xg: 1.9, corners: 8, fouls: 10, yellowCards: 1, redCards: 0, offsides: 2, passAccuracy: 88, tackles: 15, interceptions: 8, saves: 1, bigChances: 3, dribbles: 6 },
    away: { possession: 39, shots: 7, shotsOnTarget: 1, shotsOffTarget: 5, shotsBlocked: 1, xg: 0.5, corners: 2, fouls: 13, yellowCards: 2, redCards: 0, offsides: 3, passAccuracy: 74, tackles: 24, interceptions: 11, saves: 5, bigChances: 1, dribbles: 3 },
  },
  1005: {
    home: { possession: 62, shots: 19, shotsOnTarget: 9, shotsOffTarget: 7, shotsBlocked: 3, xg: 2.8, corners: 8, fouls: 9, yellowCards: 1, redCards: 0, offsides: 2, passAccuracy: 89, tackles: 13, interceptions: 7, saves: 3, bigChances: 5, dribbles: 9 },
    away: { possession: 38, shots: 9, shotsOnTarget: 4, shotsOffTarget: 4, shotsBlocked: 1, xg: 1.2, corners: 3, fouls: 14, yellowCards: 2, redCards: 0, offsides: 3, passAccuracy: 73, tackles: 25, interceptions: 12, saves: 7, bigChances: 2, dribbles: 3 },
  },
  1006: {
    home: { possession: 58, shots: 17, shotsOnTarget: 9, shotsOffTarget: 5, shotsBlocked: 3, xg: 2.9, corners: 7, fouls: 10, yellowCards: 1, redCards: 0, offsides: 2, passAccuracy: 86, tackles: 16, interceptions: 8, saves: 2, bigChances: 5, dribbles: 7 },
    away: { possession: 42, shots: 10, shotsOnTarget: 4, shotsOffTarget: 5, shotsBlocked: 1, xg: 1.3, corners: 3, fouls: 13, yellowCards: 2, redCards: 0, offsides: 3, passAccuracy: 78, tackles: 22, interceptions: 10, saves: 6, bigChances: 2, dribbles: 4 },
  },
  // Live match stats
  1007: {
    home: { possession: 56, shots: 13, shotsOnTarget: 5, shotsOffTarget: 6, shotsBlocked: 2, xg: 1.6, corners: 5, fouls: 8, yellowCards: 1, redCards: 0, offsides: 1, passAccuracy: 86, tackles: 14, interceptions: 7, saves: 3, bigChances: 3, dribbles: 5 },
    away: { possession: 44, shots: 10, shotsOnTarget: 4, shotsOffTarget: 5, shotsBlocked: 1, xg: 1.3, corners: 4, fouls: 10, yellowCards: 2, redCards: 0, offsides: 2, passAccuracy: 84, tackles: 18, interceptions: 9, saves: 4, bigChances: 2, dribbles: 4 },
  },
};

// ── MATCH EVENTS ──────────────────────────────────────────────────────────
export const MOCK_EVENTS = {
  1001: [
    { time: { elapsed: 23 }, team: { id: 2, name: 'España', side: 'home' }, player: { name: 'Pedri' }, type: 'Goal', detail: 'Normal Goal', assist: { name: 'Yamal' } },
    { time: { elapsed: 45 }, team: { id: 3, name: 'Morocco', side: 'away' }, player: { name: 'Al-Nasser' }, type: 'Card', detail: 'Yellow Card', assist: null },
    { time: { elapsed: 61 }, team: { id: 2, name: 'España', side: 'home' }, player: { name: 'Morata' }, type: 'Goal', detail: 'Normal Goal', assist: { name: 'Pedri' } },
    { time: { elapsed: 72 }, team: { id: 3, name: 'Morocco', side: 'away' }, player: { name: 'Hakimi' }, type: 'Card', detail: 'Yellow Card', assist: null },
    { time: { elapsed: 80 }, team: { id: 3, name: 'Morocco', side: 'away' }, player: { name: 'Boufal' }, type: 'Card', detail: 'Yellow Card', assist: null },
  ],
  1002: [
    { time: { elapsed: 32 }, team: { id: 4, name: 'Japan', side: 'away' }, player: { name: 'Kubo' }, type: 'Goal', detail: 'Normal Goal', assist: { name: 'Minamino' } },
    { time: { elapsed: 55 }, team: { id: 1, name: 'United States', side: 'home' }, player: { name: 'Pulisic' }, type: 'Goal', detail: 'Normal Goal', assist: { name: 'Reyna' } },
    { time: { elapsed: 68 }, team: { id: 1, name: 'United States', side: 'home' }, player: { name: 'Adams' }, type: 'Card', detail: 'Yellow Card', assist: null },
  ],
  1003: [
    { time: { elapsed: 15 }, team: { id: 13, name: 'Argentina', side: 'home' }, player: { name: 'Messi' }, type: 'Goal', detail: 'Normal Goal', assist: { name: 'Di María' } },
    { time: { elapsed: 38 }, team: { id: 13, name: 'Argentina', side: 'home' }, player: { name: 'Álvarez' }, type: 'Goal', detail: 'Normal Goal', assist: { name: 'Messi' } },
    { time: { elapsed: 54 }, team: { id: 15, name: 'Cameroon', side: 'away' }, player: { name: 'Anguissa' }, type: 'Card', detail: 'Yellow Card', assist: null },
    { time: { elapsed: 66 }, team: { id: 13, name: 'Argentina', side: 'home' }, player: { name: 'Lautaro' }, type: 'Goal', detail: 'Normal Goal', assist: { name: 'Álvarez' } },
    { time: { elapsed: 78 }, team: { id: 15, name: 'Cameroon', side: 'away' }, player: { name: 'Kunde' }, type: 'Card', detail: 'Red Card', assist: null },
  ],
  1005: [
    { time: { elapsed: 28 }, team: { id: 19, name: 'Tunisia', side: 'away' }, player: { name: 'Msakni' }, type: 'Goal', detail: 'Normal Goal', assist: { name: 'Sliti' } },
    { time: { elapsed: 44 }, team: { id: 17, name: 'Brasil', side: 'home' }, player: { name: 'Vinicius Jr.' }, type: 'Goal', detail: 'Normal Goal', assist: { name: 'Rodrygo' } },
    { time: { elapsed: 63 }, team: { id: 17, name: 'Brasil', side: 'home' }, player: { name: 'Rodrygo' }, type: 'Goal', detail: 'Normal Goal', assist: { name: 'Vinicius Jr.' } },
    { time: { elapsed: 75 }, team: { id: 19, name: 'Tunisia', side: 'away' }, player: { name: 'Drager' }, type: 'Card', detail: 'Yellow Card', assist: null },
  ],
  // Live match events
  1007: [
    { time: { elapsed: 34 }, team: { id: 21, name: 'England', side: 'home' }, player: { name: 'Kane' }, type: 'Goal', detail: 'Normal Goal', assist: { name: 'Bellingham' } },
    { time: { elapsed: 48 }, team: { id: 22, name: 'Netherlands', side: 'away' }, player: { name: 'Gakpo' }, type: 'Goal', detail: 'Normal Goal', assist: { name: 'de Jong' } },
    { time: { elapsed: 59 }, team: { id: 21, name: 'England', side: 'home' }, player: { name: 'Rice' }, type: 'Card', detail: 'Yellow Card', assist: null },
    { time: { elapsed: 65 }, team: { id: 22, name: 'Netherlands', side: 'away' }, player: { name: 'van Dijk' }, type: 'Card', detail: 'Yellow Card', assist: null },
  ],
};

// ── LINEUPS ───────────────────────────────────────────────────────────────
export const MOCK_LINEUPS = {
  1001: [
    {
      team: MOCK_TEAMS[2],
      formation: '4-3-3',
      startXI: [
        { name: 'Raya', number: 1, pos: 'G', grid: '1:1' },
        { name: 'Carvajal', number: 2, pos: 'D', grid: '2:4' },
        { name: 'Le Normand', number: 3, pos: 'D', grid: '2:3' },
        { name: 'Laporte', number: 4, pos: 'D', grid: '2:2' },
        { name: 'Cucurella', number: 5, pos: 'D', grid: '2:1' },
        { name: 'Rodri', number: 6, pos: 'M', grid: '3:3' },
        { name: 'Pedri', number: 7, pos: 'M', grid: '3:2' },
        { name: 'Fabián Ruiz', number: 8, pos: 'M', grid: '3:1' },
        { name: 'Yamal', number: 9, pos: 'F', grid: '4:3' },
        { name: 'Morata', number: 10, pos: 'F', grid: '4:2' },
        { name: 'Nico Williams', number: 11, pos: 'F', grid: '4:1' },
      ],
    },
    {
      team: MOCK_TEAMS[3],
      formation: '4-4-2',
      startXI: [
        { name: 'Bono', number: 1, pos: 'G', grid: '1:1' },
        { name: 'Hakimi', number: 2, pos: 'D', grid: '2:4' },
        { name: 'Saiss', number: 3, pos: 'D', grid: '2:3' },
        { name: 'Aguerd', number: 4, pos: 'D', grid: '2:2' },
        { name: 'Attiyat-Allah', number: 5, pos: 'D', grid: '2:1' },
        { name: 'Amrabat', number: 6, pos: 'M', grid: '3:4' },
        { name: 'Ounahi', number: 7, pos: 'M', grid: '3:3' },
        { name: 'Louza', number: 8, pos: 'M', grid: '3:2' },
        { name: 'Ziyech', number: 9, pos: 'M', grid: '3:1' },
        { name: 'En-Nesyri', number: 10, pos: 'F', grid: '4:2' },
        { name: 'Boufal', number: 11, pos: 'F', grid: '4:1' },
      ],
    },
  ],
};

// ── H2H ───────────────────────────────────────────────────────────────────
export const MOCK_H2H = {
  '21-22': [
    { id: 901, date: d('2024-11-18T20:45:00Z'), homeTeam: MOCK_TEAMS[21], awayTeam: MOCK_TEAMS[22], goals: { home: 3, away: 1 }, status: { short: 'FT' }, round: 'Friendly' },
    { id: 902, date: d('2023-03-28T19:45:00Z'), homeTeam: MOCK_TEAMS[22], awayTeam: MOCK_TEAMS[21], goals: { home: 2, away: 3 }, status: { short: 'FT' }, round: 'Friendly' },
    { id: 903, date: d('2022-11-09T19:45:00Z'), homeTeam: MOCK_TEAMS[21], awayTeam: MOCK_TEAMS[22], goals: { home: 1, away: 1 }, status: { short: 'FT' }, round: 'Friendly' },
    { id: 904, date: d('2020-09-04T19:45:00Z'), homeTeam: MOCK_TEAMS[22], awayTeam: MOCK_TEAMS[21], goals: { home: 1, away: 0 }, status: { short: 'FT' }, round: 'UEFA Nations League' },
  ],
  '13-17': [
    { id: 905, date: d('2021-07-11T00:00:00Z'), homeTeam: MOCK_TEAMS[13], awayTeam: MOCK_TEAMS[17], goals: { home: 1, away: 0 }, status: { short: 'FT' }, round: 'Copa América - Final' },
    { id: 906, date: d('2019-07-02T01:00:00Z'), homeTeam: MOCK_TEAMS[17], awayTeam: MOCK_TEAMS[13], goals: { home: 2, away: 0 }, status: { short: 'FT' }, round: 'Copa América - SF' },
    { id: 907, date: d('2016-06-27T00:00:00Z'), homeTeam: MOCK_TEAMS[13], awayTeam: MOCK_TEAMS[17], goals: { home: 0, away: 1 }, status: { short: 'FT' }, round: 'Copa América - SF' },
  ],
};

// ── PLAYERS ───────────────────────────────────────────────────────────────
export const MOCK_PLAYERS = {
  2: [
    { id: 201, name: 'Pedri', number: 7, pos: 'M', goals: 1, assists: 1, minutes: 90, rating: 8.4 },
    { id: 202, name: 'Lamine Yamal', number: 11, pos: 'F', goals: 0, assists: 1, minutes: 90, rating: 8.1 },
    { id: 203, name: 'Álvaro Morata', number: 9, pos: 'F', goals: 1, assists: 0, minutes: 90, rating: 7.8 },
    { id: 204, name: 'Rodri', number: 16, pos: 'M', goals: 0, assists: 0, minutes: 90, rating: 8.0 },
    { id: 205, name: 'Nico Williams', number: 10, pos: 'F', goals: 0, assists: 0, minutes: 80, rating: 7.5 },
  ],
  13: [
    { id: 301, name: 'Lionel Messi', number: 10, pos: 'F', goals: 1, assists: 1, minutes: 90, rating: 9.1 },
    { id: 302, name: 'Lautaro Martínez', number: 9, pos: 'F', goals: 1, assists: 0, minutes: 90, rating: 8.3 },
    { id: 303, name: 'Julián Álvarez', number: 19, pos: 'F', goals: 1, assists: 1, minutes: 90, rating: 8.5 },
    { id: 304, name: 'Di María', number: 11, pos: 'F', goals: 0, assists: 1, minutes: 75, rating: 7.6 },
  ],
  17: [
    { id: 401, name: 'Vinicius Jr.', number: 7, pos: 'F', goals: 1, assists: 1, minutes: 90, rating: 8.7 },
    { id: 402, name: 'Rodrygo', number: 11, pos: 'F', goals: 1, assists: 1, minutes: 90, rating: 8.2 },
    { id: 403, name: 'Raphinha', number: 10, pos: 'F', goals: 0, assists: 0, minutes: 90, rating: 7.4 },
  ],
  21: [
    { id: 501, name: 'Harry Kane', number: 9, pos: 'F', goals: 1, assists: 0, minutes: 67, rating: 8.1 },
    { id: 502, name: 'Jude Bellingham', number: 10, pos: 'M', goals: 0, assists: 1, minutes: 67, rating: 7.9 },
    { id: 503, name: 'Bukayo Saka', number: 7, pos: 'F', goals: 0, assists: 0, minutes: 67, rating: 7.3 },
  ],
};
