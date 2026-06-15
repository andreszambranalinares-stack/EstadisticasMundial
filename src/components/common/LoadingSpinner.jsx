export default function LoadingSpinner({ size = 'md', className = '' }) {
  const sizes = { sm: 'w-4 h-4', md: 'w-8 h-8', lg: 'w-12 h-12' };
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className={`${sizes[size]} border-2 border-surface-3 border-t-accent rounded-full animate-spin`} />
    </div>
  );
}

export function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-2 border-surface-3 border-t-accent rounded-full animate-spin" />
        <p className="text-slate-400 text-sm">Cargando datos...</p>
      </div>
    </div>
  );
}

export function CardSkeleton({ lines = 3 }) {
  return (
    <div className="card p-4 animate-pulse">
      <div className="h-4 bg-surface-3 rounded w-3/4 mb-3" />
      {Array.from({ length: lines }).map((_, i) => (
        <div key={i} className="h-3 bg-surface-3 rounded mb-2" style={{ width: `${70 + (i * 10) % 30}%` }} />
      ))}
    </div>
  );
}
