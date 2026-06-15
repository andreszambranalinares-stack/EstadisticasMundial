import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import FlagCircle from '@/components/common/FlagCircle';
import Badge from '@/components/common/Badge';
import { PageLoader } from '@/components/common/LoadingSpinner';
import MatchStatsGrid from '@/components/sections/MatchStatsGrid';
import BettingMetricsPanel from '@/components/sections/BettingMetricsPanel';
import LiveMatchTicker from '@/components/sections/LiveMatchTicker';
import XGComparisonChart from '@/components/charts/xGComparisonChart';
import GoalTimingChart from '@/components/charts/GoalTimingChart';
import { useMatchDetail } from '@/hooks/useMatchDetail';
import { useFixturePredictions } from '@/hooks/usePredictions';
import { getSpanishName } from '@/constants/teamMappings';
import { getRoundLabel } from '@/lib/formatters';

const TABS = [
  { id: 'stats', label: 'Estadísticas' },
  { id: 'events', label: 'Eventos' },
  { id: 'lineups', label: 'Alineaciones' },
  { id: 'betting', label: '📊 Apuestas' },
  { id: 'timing', label: 'Goles' },
];

export default function MatchDetail() {
  const { matchId } = useParams();
  const [activeTab, setActiveTab] = useState('stats');
  const { fixture, stats, events, lineups, isLoading, error } = useMatchDetail(matchId);
  const predictions = useFixturePredictions(fixture);

  if (isLoading) return <PageLoader />;
  if (error || !fixture) {
    return (
      <div className="text-center py-16">
        <div className="text-4xl mb-4">😕</div>
        <p className="text-slate-400">Partido no encontrado</p>
        <Link to="/partidos" className="btn-primary mt-4 inline-block">Volver a partidos</Link>
      </div>
    );
  }

  const { homeTeam, awayTeam, goals, status, round } = fixture;
  const isLive = ['1H', '2H', 'HT', 'ET', 'PEN'].includes(status?.short);
  const isFinished = ['FT', 'AET'].includes(status?.short);
  const isUpcoming = status?.short === 'NS';

  return (
    <div>
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-slate-500 mb-4">
        <Link to="/" className="hover:text-white transition-colors">Inicio</Link>
        <span>/</span>
        <Link to="/partidos" className="hover:text-white transition-colors">Partidos</Link>
        <span>/</span>
        <span className="text-slate-300">{getSpanishName(homeTeam.name)} vs {getSpanishName(awayTeam.name)}</span>
      </div>

      {/* Match header */}
      <div className="card p-6 mb-6">
        <div className="text-center mb-4">
          <span className="text-xs text-slate-400 uppercase tracking-wider">{getRoundLabel(round)}</span>
          {fixture.venue && <span className="text-xs text-slate-500 ml-2">· {fixture.venue}</span>}
        </div>

        <div className="flex items-center justify-center gap-4 md:gap-8">
          {/* Home */}
          <div className="flex flex-col items-center gap-3 flex-1 max-w-[140px]">
            <FlagCircle teamName={homeTeam.name} size="xl" />
            <h2 className="text-sm md:text-base font-bold text-white text-center leading-tight">
              {getSpanishName(homeTeam.name)}
            </h2>
          </div>

          {/* Score / Status */}
          <div className="flex flex-col items-center gap-2 min-w-[100px]">
            {isUpcoming ? (
              <div className="text-center">
                <div className="text-4xl font-black text-slate-400">vs</div>
                {isLive && (
                  <Badge variant="live" pulse className="mt-2">EN VIVO {status.elapsed}'</Badge>
                )}
              </div>
            ) : (
              <>
                <div className="flex items-center gap-3">
                  <span className="text-5xl md:text-6xl font-black text-white">{goals.home ?? '—'}</span>
                  <span className="text-2xl text-surface-4">–</span>
                  <span className="text-5xl md:text-6xl font-black text-white">{goals.away ?? '—'}</span>
                </div>
                {isLive && <Badge variant="live" pulse>{status.elapsed}'</Badge>}
                {isFinished && (
                  <div className="text-center text-xs text-slate-400">
                    <span>MT: {fixture.score?.halftime?.home}-{fixture.score?.halftime?.away}</span>
                  </div>
                )}
              </>
            )}
            {isFinished && <Badge variant="final">Final</Badge>}
          </div>

          {/* Away */}
          <div className="flex flex-col items-center gap-3 flex-1 max-w-[140px]">
            <FlagCircle teamName={awayTeam.name} size="xl" />
            <h2 className="text-sm md:text-base font-bold text-white text-center leading-tight">
              {getSpanishName(awayTeam.name)}
            </h2>
          </div>
        </div>
      </div>

      {/* Tab navigation */}
      <div className="flex gap-1 mb-6 overflow-x-auto pb-1 scrollbar-hide">
        {TABS.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all flex-shrink-0 ${
              activeTab === id
                ? 'bg-accent text-white'
                : 'text-slate-400 hover:text-white hover:bg-surface-3'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="card p-4 md:p-6">
        {activeTab === 'stats' && (
          <MatchStatsGrid
            stats={stats}
            homeTeam={homeTeam.name}
            awayTeam={awayTeam.name}
          />
        )}

        {activeTab === 'events' && (
          <div>
            <h3 className="text-sm font-semibold text-slate-300 mb-4">Eventos del partido</h3>
            <LiveMatchTicker
              events={events}
              homeTeam={homeTeam.name}
              awayTeam={awayTeam.name}
            />
          </div>
        )}

        {activeTab === 'lineups' && (
          <div>
            <h3 className="text-sm font-semibold text-slate-300 mb-4">Alineaciones</h3>
            {lineups.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-6">
                {lineups.map((lineup) => (
                  <div key={lineup.team?.id} className="bg-surface-3/30 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <FlagCircle teamName={lineup.team?.name} size="sm" />
                      <div>
                        <div className="text-sm font-bold text-white">{getSpanishName(lineup.team?.name)}</div>
                        <div className="text-xs text-slate-400">Formación: {lineup.formation}</div>
                      </div>
                    </div>
                    <div className="space-y-1">
                      {lineup.startXI?.map((player) => (
                        <div key={player.name} className="flex items-center gap-2 py-1 border-b border-surface-3/30 last:border-0">
                          <span className="text-xs text-slate-500 w-5 text-right font-mono">{player.number}</span>
                          <span className={`text-xs px-1 rounded font-bold ${player.pos === 'G' ? 'text-accent-gold bg-accent-gold/15' : player.pos === 'D' ? 'text-bet-green bg-bet-green/15' : player.pos === 'M' ? 'text-accent bg-accent/15' : 'text-bet-red bg-bet-red/10'}`}>
                            {player.pos}
                          </span>
                          <span className="text-sm text-slate-200">{player.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-slate-500 text-sm">Alineaciones no disponibles</div>
            )}
          </div>
        )}

        {activeTab === 'betting' && (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <h3 className="text-sm font-semibold text-slate-300">Análisis de Apuestas</h3>
              {stats && (
                <div className="ml-auto">
                  <XGComparisonChart
                    stats={stats}
                    homeTeam={homeTeam.name}
                    awayTeam={awayTeam.name}
                  />
                </div>
              )}
            </div>
            <BettingMetricsPanel
              predictions={predictions}
              homeTeam={homeTeam.name}
              awayTeam={awayTeam.name}
            />
          </div>
        )}

        {activeTab === 'timing' && (
          <div>
            <h3 className="text-sm font-semibold text-slate-300 mb-4">Distribución de Goles</h3>
            <GoalTimingChart
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
