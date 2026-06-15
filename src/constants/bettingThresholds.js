export const WC_LEAGUE_ID = 1;
export const WC_SEASON = 2026;
export const LEAGUE_AVG_GOALS = 2.6;

export function getProbColor(prob) {
  if (prob >= 0.70) return { text: 'text-bet-green', bg: 'bg-bet-green/15', border: 'border-bet-green/40', label: 'Alta' };
  if (prob >= 0.50) return { text: 'text-bet-yellow', bg: 'bg-bet-yellow/15', border: 'border-bet-yellow/40', label: 'Media' };
  if (prob >= 0.35) return { text: 'text-bet-orange', bg: 'bg-bet-orange/15', border: 'border-bet-orange/40', label: 'Baja' };
  return { text: 'text-bet-red', bg: 'bg-bet-red/15', border: 'border-bet-red/40', label: 'Muy baja' };
}

export function getProbHex(prob) {
  if (prob >= 0.70) return '#00C853';
  if (prob >= 0.50) return '#FFD600';
  if (prob >= 0.35) return '#FF6D00';
  return '#D50000';
}
