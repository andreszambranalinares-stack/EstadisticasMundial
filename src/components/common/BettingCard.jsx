import { getProbColor } from '@/constants/bettingThresholds';
import { formatPercent, formatOddsDecimal } from '@/lib/formatters';

export default function BettingCard({ label, prob, showOdds = true, icon = null, size = 'md' }) {
  const { text, bg, border } = getProbColor(prob);
  const isSmall = size === 'sm';

  return (
    <div className={`${bg} ${border} border rounded-xl p-3 flex flex-col items-center gap-1 text-center`}>
      {icon && <span className="text-lg">{icon}</span>}
      <span className={`${isSmall ? 'text-xs' : 'text-xs'} text-slate-400 font-medium uppercase tracking-wide leading-tight`}>
        {label}
      </span>
      <span className={`${isSmall ? 'text-xl' : 'text-2xl'} font-black ${text}`}>
        {formatPercent(prob)}
      </span>
      {showOdds && (
        <span className="text-xs text-slate-500 font-mono">
          Cuota: {formatOddsDecimal(prob)}
        </span>
      )}
    </div>
  );
}
