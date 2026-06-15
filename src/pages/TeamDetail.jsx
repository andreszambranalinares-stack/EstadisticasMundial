import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import FlagCircle from '@/components/common/FlagCircle';
import Badge from '@/components/common/Badge';
import StatBar from '@/components/common/StatBar';
import TeamFormTable from '@/components/sections/TeamFormTable';
import FormRadarChart from '@/components/charts/FormRadarChart';
import BettingMetricsPanel from '@/components/sections/BettingMetricsPanel';
import { PageLoader } from '@/components/common/LoadingSpinner';
import { useTeam } from '@/hooks/useTeam';
import { useAllMatches } from '@/hooks/useMatches';
import { usePredictions } from '@/hooks/usePredictions';
import { getSpanishName } from '@/constants/teamMappings';
import { getResultColor, formatStat } from '@/lib/formatters';

const TABS = [
  { id: 'stats', label: 'Estadísticas' },
  { id: 'players', label: 'Jugadores' },
  { id: 'matches', label: 'Partidos' },
  { id: 'betting', label: '📊 Apuestas' },
];

export default function TeamDetail() {
  const { teamId } = useParams();
  const [activeTab, setActiveTab] = useState('stats');
  const { team, stats, players, isLoading } = useTeam(teamId);
  const { data: allMatches = [] } = useAllMatches();

  const teamMatches = allMatches.filter(
    (f) => f.homeTeam?.id === Number(teamId) || f.awayTeam?.id === Number(teamId)
  );

  const nextMatch = teamMatches.find((f) => f.status?.short === 'NS');
  const nextOpponentId = nextMatch
    ? nextMatch.homeTeam?.id === Number(teamId)
      ? nextMatch.awayTeam?.id
      : nextMatch.homeTeam?.id
    : null;

  const { team: nextOpponent } = useTeam(nextOpponentId);
  const isHomeNext = nextMatch?.homeTeam?.id === Number(teamId);

  const nextMatchPredictions = usePredictions(
    isHomeNext ? Number(teamId) : nextOpponentId,
    isHomeNext ? nextOpponentId : Number(teamId),
    isHomeNext ? stats : nextOpponent,
    isHomeNext ? nextOpponent : stats
  );

  if (isLoading || !team) return <PageLoader />;

  const formStr = team.form || '';
  const formChars = formStr.split('');

  return (
    <div>
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-slate-500 mb-4">
        <Link to="/" className="hover:text-white">Inicio</Link>
        <span>/</span>
        <Link to="/equipos" className="hover:text-white">Equipos</Link>
        <span>/</span>
        <span className="text-slate-300">{getSpanishName(team.name)}</span>
      </div>

      {/* Hero */}
      <div className="card p-6 md:p-8 mb-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <FlagCircle teamName={team.name} size="xl" className="flex-shrink-0" />
          <div className="text-center sm:text-left flex-1">
            <div className="flex items-center gap-2 justify-center sm:justify-start mb-1">
              <Badge variant="group">Grupo {team.group}</Badge>
            </div>
            <h1 className="text-3xl font-black text-white mb-3">{getSpanishName(team.name)}</h1>

            {/* Form */}
            {formChars.length > 0 && (
              <div className="flex items-center gap-1.5 justify-center sm:justify-start mb-4">
                <span className="text-xs text-slate-500 mr-1">Forma:</span>
                {formChars.map((r, i) => (
                  <span key={i} className={`w-6 h-6 rounded-sm flex items-center justify-center text-xs font-black ${getResultColor(r)}`}>
                    {r}
                  </span>
                ))}
              </div>
            )}

            {/* Quick stats */}
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
              {[
                { label: 'PJ', value: team.played ?? 0 },
                { label: 'V', value: team.wins ?? 0 },
                { label: 'E', value: team.draws ?? 0 },
                { label: 'D', value: team.losses ?? 0 },
                { label: 'GF', value: team.goalsFor ?? 0 },
                { label: 'Pts', value: team.pts ?? 0 },
              ].map(({ label, value }) => (
                <div key={label} className="text-center bg-surface-3/30 rounded-lg p-2">
                  <div className="text-xs text-slate-500">{label}</div>
                  <div className="text-xl font-black text-white">{value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 overflow-x-auto pb-1">
        {TABS.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all flex-shrink-0 ${
              activeTab === id ? 'bg-accent text-white' : 'text-slate-400 hover:text-white hover:bg-surface-3'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="card p-4 md:p-6">
        {activeTab === 'stats' && stats && (
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-semibold text-slate-300 mb-4">Rendimiento de la selección</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                {[
                  { label: 'xG por partido', value: stats.avgGoalsScored?.toFixed(1) },
                  { label: 'Goles concedidos/P', value: stats.avgGoalsConceded?.toFixed(1) },
                  { label: 'Tiros por partido', value: formatStat(stats.shotsPerGame) },
                  { label: 'Precisión de pases', value: formatStat(stats.passAccuracy, '%') },
                ].map(({ label, value }) => (
                  <div key={label} className="bg-surface-3/30 rounded-xl p-4 text-center">
                    <div className="text-2xl font-black text-white mb-1">{value}</div>
                    <div className="text-xs text-slate-400">{label}</div>
                  </div>
                ))}
              </div>
              <FormRadarChart teamA={stats} nameA={team.name} />
            </div>

            {nextMatch && (
              <div>
                <h3 className="text-sm font-semibold text-slate-300 mb-3">Comparativa vs Próximo Rival</h3>
                {nextOpponent && (
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <FlagCircle teamName={nextOpponent.name} size="sm" />
                      <span className="text-sm font-semibold text-slate-200">vs {getSpanishName(nextOpponent.name)}</span>
                    </div>
                    <div className="space-y-1">
                      {[
                        { label: 'Media de goles', homeVal: stats.avgGoalsScored?.toFixed(1), awayVal: nextOpponent.avgGoalsScored?.toFixed(1) },
                        { label: 'Posesión (%)', homeVal: stats.possession, awayVal: nextOpponent.possession },
                        { label: 'Precisión pases (%)', homeVal: stats.passAccuracy, awayVal: nextOpponent.passAccuracy },
                        { label: 'Tiros por partido', homeVal: stats.shotsPerGame, awayVal: nextOpponent.shotsPerGame },
                      ].map(({ label, homeVal, awayVal }) => (
                        <StatBar key={label} label={label} homeValue={homeVal} awayValue={awayVal} />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {activeTab === 'players' && (
          <div>
            <h3 className="text-sm font-semibold text-slate-300 mb-4">Jugadores destacados</h3>
            {players.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-xs text-slate-500 uppercase tracking-wider border-b border-surface-3/50">
                      <th className="text-left py-2 px-2">#</th>
                      <th className="text-left py-2 px-2">Jugador</th>
                      <th className="text-center py-2 px-2">Pos</th>
                      <th className="text-center py-2 px-2">⚽ Goles</th>
                      <th className="text-center py-2 px-2">🅰️ Asist.</th>
                      <th className="text-center py-2 px-2">Min</th>
                      <th className="text-center py-2 px-2">Nota</th>
                    </tr>
                  </thead>
                  <tbody>
                    {players.map((p) => (
                      <tr key={p.id} className="border-b border-surface-3/20 hover:bg-surface-3/20 transition-colors">
                        <td className="py-2.5 px-2 text-slate-500 font-mono">{p.number}</td>
                        <td className="py-2.5 px-2 font-semibold text-slate-200">{p.name}</td>
                        <td className="py-2.5 px-2 text-center">
                          <span className={`text-xs px-1.5 py-0.5 rounded font-bold ${
                            p.pos === 'G' ? 'bg-accent-gold/20 text-accent-gold' :
                            p.pos === 'D' ? 'bg-bet-green/20 text-bet-green' :
                            p.pos === 'M' ? 'bg-accent/20 text-accent' :
                            'bg-bet-red/20 text-bet-red'
                          }`}>{p.pos}</span>
                        </td>
                        <td className="py-2.5 px-2 text-center font-bold text-white">{p.goals}</td>
                        <td className="py-2.5 px-2 text-center text-slate-300">{p.assists}</td>
                        <td className="py-2.5 px-2 text-center text-slate-400">{p.minutes}'</td>
                        <td className="py-2.5 px-2 text-center">
                          <span className={`font-bold ${p.rating >= 8 ? 'text-bet-green' : p.rating >= 7 ? 'text-bet-yellow' : 'text-slate-400'}`}>
                            {p.rating?.toFixed(1)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-8 text-slate-500 text-sm">Estadísticas de jugadores no disponibles</div>
            )}
          </div>
        )}

        {activeTab === 'matches' && (
          <div>
            <h3 className="text-sm font-semibold text-slate-300 mb-4">Historial de partidos</h3>
            <TeamFormTable fixtures={teamMatches} teamId={Number(teamId)} />
          </div>
        )}

        {activeTab === 'betting' && (
          <div>
            <h3 className="text-sm font-semibold text-slate-300 mb-4">
              {nextMatch && nextOpponent
                ? `Predicción: ${getSpanishName(team.name)} vs ${getSpanishName(nextOpponent.name)}`
                : 'Análisis de apuestas'}
            </h3>
            <BettingMetricsPanel
              predictions={nextMatchPredictions}
              homeTeam={isHomeNext ? team.name : nextOpponent?.name ?? ''}
              awayTeam={isHomeNext ? nextOpponent?.name ?? '' : team.name}
            />
          </div>
        )}
      </div>
    </div>
  );
}
