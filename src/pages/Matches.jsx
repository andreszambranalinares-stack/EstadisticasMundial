import { useState } from 'react';
import MatchCard from '@/components/common/MatchCard';
import { PageLoader } from '@/components/common/LoadingSpinner';
import { useAllMatches } from '@/hooks/useMatches';
import { getRoundLabel } from '@/lib/formatters';

const STATUS_FILTERS = [
  { value: 'all', label: 'Todos' },
  { value: 'NS', label: 'Por jugar' },
  { value: 'LIVE', label: 'En vivo' },
  { value: 'FT', label: 'Finalizados' },
];

const GROUP_FILTERS = [
  { value: 'all', label: 'Todos' },
  ...['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'].map((g) => ({
    value: g,
    label: `Grupo ${g}`,
  })),
  { value: 'knockout', label: 'Eliminatorias' },
];

export default function Matches() {
  const { data: matches = [], isLoading } = useAllMatches();
  const [statusFilter, setStatusFilter] = useState('all');
  const [groupFilter, setGroupFilter] = useState('all');

  const filtered = matches.filter((f) => {
    const statusMatch =
      statusFilter === 'all' ||
      (statusFilter === 'LIVE' && ['1H', '2H', 'HT', 'ET'].includes(f.status?.short)) ||
      f.status?.short === statusFilter;

    const groupMatch =
      groupFilter === 'all' ||
      (groupFilter === 'knockout' && !f.round?.startsWith('Group Stage')) ||
      f.round?.includes(`Group Stage`) && f.round?.includes(groupFilter);

    return statusMatch && groupMatch;
  });

  const grouped = filtered.reduce((acc, f) => {
    const key = getRoundLabel(f.round) || 'Sin fase';
    if (!acc[key]) acc[key] = [];
    acc[key].push(f);
    return acc;
  }, {});

  if (isLoading) return <PageLoader />;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-black text-white">Partidos</h1>
        <span className="text-sm text-slate-400">{filtered.length} partidos</span>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="flex gap-2 flex-wrap">
          {STATUS_FILTERS.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => setStatusFilter(value)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                statusFilter === value
                  ? 'bg-accent text-white'
                  : 'bg-surface-2 text-slate-400 hover:text-white border border-surface-3/50'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        <select
          value={groupFilter}
          onChange={(e) => setGroupFilter(e.target.value)}
          className="bg-surface-2 border border-surface-3/50 text-slate-200 text-sm rounded-lg px-3 py-1.5 focus:outline-none focus:border-accent"
        >
          {GROUP_FILTERS.map(({ value, label }) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
      </div>

      {/* Match list grouped by round */}
      {Object.entries(grouped).length === 0 ? (
        <div className="text-center py-16 text-slate-500">No se encontraron partidos con estos filtros</div>
      ) : (
        <div className="space-y-8">
          {Object.entries(grouped).map(([round, roundMatches]) => (
            <section key={round}>
              <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <span className="w-1 h-4 bg-accent rounded-full" />
                {round}
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {roundMatches.map((f) => (
                  <MatchCard key={f.id} fixture={f} showPredictions={f.status?.short === 'NS'} />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
