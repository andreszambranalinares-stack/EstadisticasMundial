import { buildScoreMatrix } from './poisson';
import { LEAGUE_AVG_GOALS } from '@/constants/bettingThresholds';

export function calculatePredictions(homeStats, awayStats) {
  const avg = LEAGUE_AVG_GOALS;

  const homeAttack = (homeStats.avgGoalsScored || 1.3) / avg;
  const homeDefense = (homeStats.avgGoalsConceded || 1.3) / avg;
  const awayAttack = (awayStats.avgGoalsScored || 1.3) / avg;
  const awayDefense = (awayStats.avgGoalsConceded || 1.3) / avg;

  const homeLambda = Math.max(0.1, homeAttack * awayDefense * avg);
  const awayLambda = Math.max(0.1, awayAttack * homeDefense * avg);

  const matrix = buildScoreMatrix(homeLambda, awayLambda);

  let homeWin = 0, draw = 0, awayWin = 0;
  let over05 = 0, over15 = 0, over25 = 0, over35 = 0;
  let btts = 0, homeCS = 0, awayCS = 0;
  const scores = [];

  for (let h = 0; h <= 6; h++) {
    for (let a = 0; a <= 6; a++) {
      const p = matrix[h][a];
      if (h > a) homeWin += p;
      else if (h === a) draw += p;
      else awayWin += p;

      const total = h + a;
      if (total >= 1) over05 += p;
      if (total >= 2) over15 += p;
      if (total >= 3) over25 += p;
      if (total >= 4) over35 += p;

      if (h > 0 && a > 0) btts += p;
      if (a === 0) homeCS += p;
      if (h === 0) awayCS += p;

      scores.push({ home: h, away: a, prob: p, label: `${h}-${a}` });
    }
  }

  scores.sort((a, b) => b.prob - a.prob);

  return {
    homeLambda,
    awayLambda,
    homeWin,
    draw,
    awayWin,
    over05,
    over15,
    over25,
    over35,
    under15: 1 - over15,
    under25: 1 - over25,
    under35: 1 - over35,
    btts,
    bttsFail: 1 - btts,
    homeCleanSheet: homeCS,
    awayCleanSheet: awayCS,
    topScores: scores.slice(0, 9),
    matrix,
  };
}

export function getImpliedOdds(prob) {
  if (prob <= 0.001) return 999;
  return Math.round((1 / prob) * 100) / 100;
}

export function formatOdds(prob) {
  return getImpliedOdds(prob).toFixed(2);
}

export function getValueBet(modelProb, bookmakerOdds) {
  const ev = modelProb * bookmakerOdds - 1;
  return { ev: Math.round(ev * 1000) / 10, isValue: ev > 0.05 };
}

export function getLiveXG(events, teamId) {
  return events
    .filter((e) => e.type === 'Goal' && e.team?.id === teamId)
    .reduce((sum, e) => sum + (e.xg || 0.8), 0);
}

export function getGoalTimingBuckets(events) {
  const buckets = [
    { label: '0-15', min: 0, max: 15, home: 0, away: 0 },
    { label: '16-30', min: 16, max: 30, home: 0, away: 0 },
    { label: '31-45', min: 31, max: 45, home: 0, away: 0 },
    { label: '46-60', min: 46, max: 60, home: 0, away: 0 },
    { label: '61-75', min: 61, max: 75, home: 0, away: 0 },
    { label: '76-90+', min: 76, max: 120, home: 0, away: 0 },
  ];

  events
    .filter((e) => e.type === 'Goal')
    .forEach((e) => {
      const min = e.time?.elapsed || 0;
      const bucket = buckets.find((b) => min >= b.min && min <= b.max);
      if (bucket) {
        if (e.team?.side === 'home') bucket.home += 1;
        else bucket.away += 1;
      }
    });

  return buckets;
}
