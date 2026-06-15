import { getSpanishName } from '@/constants/teamMappings';

const EVENT_ICONS = {
  Goal: '⚽',
  Card: '🟨',
  subst: '🔄',
  var: '📺',
};

function getCardColor(detail) {
  if (detail?.includes('Red')) return 'text-bet-red';
  if (detail?.includes('Yellow')) return 'text-bet-yellow';
  return 'text-slate-400';
}

export default function LiveMatchTicker({ events = [], homeTeam, awayTeam }) {
  const displayEvents = [...events].reverse().slice(0, 10);

  if (!displayEvents.length) {
    return (
      <div className="text-center py-4 text-slate-500 text-sm">
        Sin eventos registrados aún
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {displayEvents.map((event, i) => {
        const isGoal = event.type === 'Goal';
        const isCard = event.type === 'Card';
        const isHome = event.team?.side === 'home';
        const teamName = isHome ? homeTeam : awayTeam;
        const icon = isCard ? (event.detail?.includes('Red') ? '🟥' : '🟨') : EVENT_ICONS[event.type] ?? '•';

        return (
          <div
            key={i}
            className={`flex items-center gap-3 p-2.5 rounded-lg border transition-all animate-fade-in ${
              isGoal
                ? 'bg-bet-green/10 border-bet-green/30'
                : isCard
                ? 'bg-surface-3/30 border-surface-3'
                : 'bg-surface-2 border-surface-3/30'
            }`}
          >
            <span className="text-xs font-bold text-slate-400 w-8 text-right">{event.time?.elapsed}'</span>
            <span className="text-lg">{icon}</span>
            <div className="flex-1 min-w-0">
              <div className={`text-sm font-semibold truncate ${isGoal ? 'text-white' : 'text-slate-200'}`}>
                {event.player?.name}
                {event.assist?.name && isGoal && (
                  <span className="text-slate-400 font-normal text-xs ml-1">(asist. {event.assist.name})</span>
                )}
              </div>
              <div className="text-xs text-slate-500">{getSpanishName(teamName)}</div>
            </div>
            <div className={`text-xs font-medium ${isCard ? getCardColor(event.detail) : 'text-slate-500'}`}>
              {isGoal ? 'Gol' : event.detail?.replace(' Card', '').replace('Normal ', '')}
            </div>
          </div>
        );
      })}
    </div>
  );
}
