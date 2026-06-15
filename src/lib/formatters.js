export function formatPercent(prob) {
  return `${Math.round((prob || 0) * 100)}%`;
}

export function formatOddsDecimal(prob) {
  if (!prob || prob <= 0.001) return '—';
  return (1 / prob).toFixed(2);
}

export function formatGoals(value) {
  if (value === null || value === undefined) return '—';
  return Number(value).toFixed(1);
}

export function formatStat(value, suffix = '') {
  if (value === null || value === undefined) return '—';
  return `${value}${suffix}`;
}

export function getMatchStatusLabel(status) {
  const map = {
    FT: 'Final',
    NS: 'Por jugar',
    '1H': 'En curso',
    '2H': 'En curso',
    HT: 'Descanso',
    ET: 'Prórroga',
    PEN: 'Penaltis',
    AET: 'Final (P.E.)',
    PST: 'Pospuesto',
    CANC: 'Cancelado',
    LIVE: 'En vivo',
    TBD: 'Por definir',
  };
  return map[status] || status;
}

export function getResultColor(result) {
  if (result === 'W') return 'bg-bet-green text-white';
  if (result === 'D') return 'bg-surface-3 text-slate-300';
  if (result === 'L') return 'bg-bet-red text-white';
  return 'bg-surface-3 text-slate-400';
}

export function formatMatchDate(dateStr) {
  if (!dateStr) return '—';
  const date = new Date(dateStr);
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const matchDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const diff = matchDay - today;

  const timeStr = date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });

  if (diff === 0) return `Hoy ${timeStr}`;
  if (diff === 86400000) return `Mañana ${timeStr}`;
  if (diff === -86400000) return `Ayer ${timeStr}`;

  return date.toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function formatRelativeTime(dateStr) {
  if (!dateStr) return '—';
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = date - now;
  const diffMin = Math.round(diffMs / 60000);
  const diffH = Math.round(diffMs / 3600000);
  const diffD = Math.round(diffMs / 86400000);

  if (Math.abs(diffMin) < 60) return diffMin > 0 ? `en ${diffMin}m` : `hace ${-diffMin}m`;
  if (Math.abs(diffH) < 24) return diffH > 0 ? `en ${diffH}h` : `hace ${-diffH}h`;
  return diffD > 0 ? `en ${diffD}d` : `hace ${-diffD}d`;
}

export function getRoundLabel(round) {
  const map = {
    'Group Stage': 'Fase de Grupos',
    'Round of 32': 'Octavos de Final',
    'Round of 16': 'Octavos de Final',
    'Quarter-finals': 'Cuartos de Final',
    'Semi-finals': 'Semifinales',
    'Final': 'Gran Final',
    '3rd Place Final': '3er y 4º Puesto',
  };
  if (map[round]) return map[round];
  if (round?.startsWith('Group Stage')) return `Fase Grupos – Jornada ${round.split(' - ')[1] || ''}`;
  return round || '';
}
