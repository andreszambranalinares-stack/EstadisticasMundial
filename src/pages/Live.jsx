import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import FlagCircle from '@/components/common/FlagCircle';
import Badge from '@/components/common/Badge';
import LiveMatchTicker from '@/components/sections/LiveMatchTicker';
import MatchStatsGrid from '@/components/sections/MatchStatsGrid';
import { useLiveMatches } from '@/hooks/useLiveMatches';
import { useMatchDetail } from '@/hooks/useMatchDetail';
import { getSpanishName } from '@/constants/teamMappings';
import { useAllMatches } from '@/hooks/useMatches';
import { formatMatchDate } from '@/lib/formatters';

function LiveMatchPanel({ fixture }) {
  const { stats, events } = useMatchDetail(fixture.id);
  const [elapsed, setElapsed] = useState(fixture.status?.elapsed ?? 0);

  useEffect(() => {
    if (!['1H', '2H'].includes(fixture.status?.short)) return;
    const interval = setInterval(() => setElapsed((e) => e + 1), 60_000);
    return () => clearInterval(interval);
  }, [fixture.status?.short]);

  const { homeTeam, awayTeam, goals } = fixture;

  return (
    <div className="card overflow-hidden">
      {/* Live match header */}
      <div className="bg-bet-red/10 border-b border-bet-red/20 px-4 py-3 flex items-center justify-between">
        <Badge variant="live" pulse>EN VIVO {elapsed}'</Badge>
        <Link to={`/partidos/${fixture.id}`} className="text-xs text-accent hover:text-white transition-colors">
          Ver detalles →
        </Link>
      </div>

      <div className="p-4">
        {/* Score */}
        <div className="flex items-center justify-between gap-4 mb-4">
          <div className="flex flex-col items-center gap-2 flex-1">
            <FlagCircle teamName={homeTeam.name} size="lg" />
            <span className="text-xs font-semibold text-slate-200 text-center">{getSpanishName(homeTeam.name)}</span>
          </div>

          <div className="text-center">
            <div className="flex items-center gap-2">
              <span className="text-4xl font-black text-white">{goals.home ?? 0}</span>
              <span className="text-xl text-surface-4">–</span>
              <span className="text-4xl font-black text-white">{goals.away ?? 0}</span>
            </div>
            {fixture.score?.halftime && (
              <div className="text-xs text-slate-500 mt-1">
                MT: {fixture.score.halftime.home}-{fixture.score.halftime.away}
              </div>
            )}
          </div>

          <div className="flex flex-col items-center gap-2 flex-1">
            <FlagCircle teamName={awayTeam.name} size="lg" />
            <span className="text-xs font-semibold text-slate-200 text-center">{getSpanishName(awayTeam.name)}</span>
          </div>
        </div>

        {/* Quick stats */}
        {stats && (
          <div className="grid grid-cols-3 gap-3 mb-4 p-3 bg-surface-3/20 rounded-lg text-xs text-center">
            <div>
              <div className="font-bold text-white">{stats.home?.possession}%</div>
              <div className="text-slate-500">Posesión</div>
              <div className="font-bold text-accent-gold">{stats.away?.possession}%</div>
            </div>
            <div>
              <div className="font-bold text-white">{stats.home?.shots}</div>
              <div className="text-slate-500">Tiros</div>
              <div className="font-bold text-accent-gold">{stats.away?.shots}</div>
            </div>
            <div>
              <div className="font-bold text-white">{stats.home?.xg?.toFixed(1)}</div>
              <div className="text-slate-500">xG</div>
              <div className="font-bold text-accent-gold">{stats.away?.xg?.toFixed(1)}</div>
            </div>
          </div>
        )}

        {/* Events ticker */}
        {events.length > 0 && (
          <div>
            <h4 className="text-xs font-semibold text-slate-400 uppercase mb-2">Últimos eventos</h4>
            <LiveMatchTicker
              events={events}
              homeTeam={homeTeam.name}
              awayTeam={awayTeam.name}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default function Live() {
  const { data: liveMatches = [], isLoading } = useLiveMatches();
  const { data: allMatches = [] } = useAllMatches();

  const upcoming = allMatches
    .filter((f) => f.status?.short === 'NS')
    .slice(0, 4);

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Badge variant="live" pulse>EN VIVO</Badge>
        <h1 className="text-2xl font-black text-white">Partidos en Directo</h1>
        <span className="text-sm text-slate-400">{liveMatches.length} en curso</span>
        <span className="ml-auto text-xs text-slate-500 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-bet-green animate-pulse" />
          Actualiza cada 30s
        </span>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-16">
          <div className="w-8 h-8 border-2 border-surface-3 border-t-accent rounded-full animate-spin" />
        </div>
      ) : liveMatches.length > 0 ? (
        <div className="grid md:grid-cols-2 gap-6">
          {liveMatches.map((fixture) => (
            <LiveMatchPanel key={fixture.id} fixture={fixture} />
          ))}
        </div>
      ) : (
        <div className="card p-12 text-center">
          <div className="text-5xl mb-4">😴</div>
          <h2 className="text-xl font-bold text-white mb-2">No hay partidos en directo</h2>
          <p className="text-slate-400 mb-6">Vuelve cuando haya partidos en curso</p>
          {upcoming.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-slate-300 mb-3">Próximos partidos</h3>
              <div className="space-y-2 max-w-md mx-auto">
                {upcoming.map((f) => (
                  <Link
                    key={f.id}
                    to={`/partidos/${f.id}`}
                    className="flex items-center gap-3 p-3 bg-surface-2 rounded-lg hover:bg-surface-3 transition-colors"
                  >
                    <FlagCircle teamName={f.homeTeam.name} size="xs" />
                    <span className="text-xs font-medium text-slate-200">{getSpanishName(f.homeTeam.name)}</span>
                    <span className="text-xs text-slate-500 mx-1">vs</span>
                    <span className="text-xs font-medium text-slate-200">{getSpanishName(f.awayTeam.name)}</span>
                    <FlagCircle teamName={f.awayTeam.name} size="xs" />
                    <span className="ml-auto text-xs text-accent">{formatMatchDate(f.date)}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
