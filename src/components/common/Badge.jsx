import clsx from 'clsx';

const variants = {
  live: 'bg-bet-red/20 text-bet-red border-bet-red/40',
  final: 'bg-surface-3 text-slate-300 border-surface-4/50',
  upcoming: 'bg-accent/15 text-accent border-accent/30',
  win: 'bg-bet-green/20 text-bet-green border-bet-green/40',
  draw: 'bg-surface-3 text-slate-300 border-surface-4/50',
  loss: 'bg-bet-red/15 text-bet-red border-bet-red/30',
  group: 'bg-accent-gold/15 text-accent-gold border-accent-gold/30',
  neutral: 'bg-surface-3 text-slate-400 border-surface-3',
};

export default function Badge({ variant = 'neutral', children, className = '', pulse = false }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full border',
        variants[variant],
        className
      )}
    >
      {pulse && variant === 'live' && (
        <span className="w-1.5 h-1.5 rounded-full bg-bet-red animate-pulse" />
      )}
      {children}
    </span>
  );
}
