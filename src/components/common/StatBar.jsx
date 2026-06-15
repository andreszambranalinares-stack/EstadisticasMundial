export default function StatBar({ label, homeValue, awayValue, suffix = '', highlight = false }) {
  const total = (Number(homeValue) || 0) + (Number(awayValue) || 0);
  const homePct = total === 0 ? 50 : (Number(homeValue) / total) * 100;
  const awayPct = 100 - homePct;
  const homeWins = Number(homeValue) > Number(awayValue);
  const awayWins = Number(awayValue) > Number(homeValue);

  return (
    <div className={`py-2.5 ${highlight ? 'bg-surface-3/30 rounded-lg px-3' : ''}`}>
      <div className="flex items-center justify-between mb-1.5">
        <span className={`text-sm font-bold min-w-[36px] text-right ${homeWins ? 'text-white' : 'text-slate-400'}`}>
          {homeValue}{suffix}
        </span>
        <span className="text-xs font-medium text-slate-400 uppercase tracking-wider flex-1 text-center px-2">
          {label}
        </span>
        <span className={`text-sm font-bold min-w-[36px] ${awayWins ? 'text-white' : 'text-slate-400'}`}>
          {awayValue}{suffix}
        </span>
      </div>
      <div className="flex h-1.5 rounded-full overflow-hidden gap-0.5">
        <div
          className={`h-full rounded-full transition-all duration-700 ${homeWins ? 'bg-accent' : 'bg-surface-3'}`}
          style={{ width: `${homePct}%` }}
        />
        <div
          className={`h-full rounded-full transition-all duration-700 ${awayWins ? 'bg-accent' : 'bg-surface-3'}`}
          style={{ width: `${awayPct}%` }}
        />
      </div>
    </div>
  );
}
