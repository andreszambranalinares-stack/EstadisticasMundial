import { useState } from 'react';
import FlagCircle from '@/components/common/FlagCircle';
import StatBar from '@/components/common/StatBar';
import FormRadarChart from '@/components/charts/FormRadarChart';
import BettingMetricsPanel from '@/components/sections/BettingMetricsPanel';
import TeamFormTable from '@/components/sections/TeamFormTable';
import { useH2H } from '@/hooks/useH2H';
import { useTeam } from '@/hooks/useTeam';
import { usePredictions } from '@/hooks/usePredictions';
import { getSpanishName } from '@/constants/teamMappings';
import { MOCK_TEAMS } from '@/services/mockData';

const allTeams = Object.values(MOCK_TEAMS);

function TeamSelector({ label, selectedId, onSelect, excludeId }) {
  return (
    <div className="flex-1">
      <label className="text-xs text-slate-400 uppercase tracking-wider mb-2 block">{label}</label>
      <select
        value={selectedId ?? ''}
        onChange={(e) => onSelect(Number(e.target.value) || null)}
        className="w-full bg-surface-2 border border-surface-3/50 text-slate-200 text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-accent appearance-none cursor-pointer"
      >
        <option value="">Seleccionar selección...</option>
        {allTeams
          .filter((t) => t.id !== excludeId)
          .map((t) => (
            <option key={t.id} value={t.id}>
              {getSpanishName(t.name)} (Grupo {t.group})
            </option>
          ))}
      </select>
    </div>
  );
}

export default function H2H() {
  const [team1Id, setTeam1Id] = useState(21); // England
  const [team2Id, setTeam2Id] = useState(22); // Netherlands

  const { team: team1, stats: stats1 } = useTeam(team1Id);
  const { team: team2, stats: stats2 } = useTeam(team2Id);
  const { data: h2hFixtures = [] } = useH2H(team1Id, team2Id);
  const predictions = usePredictions(team1Id, team2Id, stats1, stats2);

  const h2hRecord = h2hFixtures.reduce(
    (acc, f) => {
      const t1IsHome = f.homeTeam?.id === team1Id;
      const t1Goals = t1IsHome ? f.goals?.home : f.goals?.away;
      const t2Goals = t1IsHome ? f.goals?.away : f.goals?.home;
      if (t1Goals > t2Goals) acc.wins1++;
      else if (t1Goals < t2Goals) acc.wins2++;
      else acc.draws++;
      return acc;
    },
    { wins1: 0, draws: 0, wins2: 0 }
  );

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-black text-white mb-1">Cabeza a Cabeza</h1>
        <p className="text-sm text-slate-400">Compara dos selecciones y obtén predicciones de apuestas</p>
      </div>

      {/* Team selectors */}
      <div className="card p-4 mb-6">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <TeamSelector label="Equipo Local" selectedId={team1Id} onSelect={setTeam1Id} excludeId={team2Id} />
          <div className="text-xl font-black text-slate-500 py-2">VS</div>
          <TeamSelector label="Equipo Visitante" selectedId={team2Id} onSelect={setTeam2Id} excludeId={team1Id} />
        </div>
      </div>

      {team1 && team2 && (
        <>
          {/* Comparison header */}
          <div className="card p-6 mb-6">
            <div className="flex items-center justify-between gap-4">
              <div className="flex flex-col items-center gap-3 flex-1">
                <FlagCircle teamName={team1.name} size="xl" />
                <h2 className="text-lg font-black text-white text-center">{getSpanishName(team1.name)}</h2>
                <div className="text-xs text-slate-400 text-center">
                  Grupo {team1.group} · {team1.pts ?? 0} pts
                </div>
              </div>

              {/* H2H record */}
              <div className="flex flex-col items-center gap-2">
                <div className="text-xs text-slate-400 uppercase tracking-wider">H2H</div>
                <div className="flex items-center gap-3 text-2xl font-black">
                  <span className="text-bet-green">{h2hRecord.wins1}</span>
                  <span className="text-slate-500">{h2hRecord.draws}</span>
                  <span className="text-bet-red">{h2hRecord.wins2}</span>
                </div>
                <div className="text-xs text-slate-500 flex gap-3">
                  <span>V</span><span>E</span><span>D</span>
                </div>
              </div>

              <div className="flex flex-col items-center gap-3 flex-1">
                <FlagCircle teamName={team2.name} size="xl" />
                <h2 className="text-lg font-black text-white text-center">{getSpanishName(team2.name)}</h2>
                <div className="text-xs text-slate-400 text-center">
                  Grupo {team2.group} · {team2.pts ?? 0} pts
                </div>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Stats comparison */}
            <div className="card p-4">
              <h3 className="text-sm font-semibold text-slate-300 mb-4">Comparativa de Estadísticas</h3>
              <div className="space-y-1">
                {[
                  { label: 'Goles marcados/P', hv: stats1?.avgGoalsScored?.toFixed(1), av: stats2?.avgGoalsScored?.toFixed(1) },
                  { label: 'Goles concedidos/P', hv: stats1?.avgGoalsConceded?.toFixed(1), av: stats2?.avgGoalsConceded?.toFixed(1) },
                  { label: 'Posesión (%)', hv: stats1?.possession, av: stats2?.possession },
                  { label: 'Tiros por partido', hv: stats1?.shotsPerGame, av: stats2?.shotsPerGame },
                  { label: 'Precisión pases (%)', hv: stats1?.passAccuracy, av: stats2?.passAccuracy },
                  { label: 'Porterías a cero', hv: stats1?.cleanSheets, av: stats2?.cleanSheets },
                ].map(({ label, hv, av }) => (
                  <StatBar key={label} label={label} homeValue={hv} awayValue={av} />
                ))}
              </div>
            </div>

            {/* Radar chart */}
            <div className="card p-4">
              <h3 className="text-sm font-semibold text-slate-300 mb-4">Perfil Comparativo</h3>
              <FormRadarChart
                teamA={stats1}
                teamB={stats2}
                nameA={team1.name}
                nameB={team2.name}
              />
            </div>

            {/* H2H history */}
            {h2hFixtures.length > 0 && (
              <div className="card p-4">
                <h3 className="text-sm font-semibold text-slate-300 mb-4">Historial de encuentros</h3>
                <TeamFormTable fixtures={h2hFixtures} teamId={team1Id} />
              </div>
            )}

            {/* Betting predictions */}
            <div className="card p-4">
              <h3 className="text-sm font-semibold text-slate-300 mb-4">Predicción de Apuestas</h3>
              <BettingMetricsPanel
                predictions={predictions}
                homeTeam={team1.name}
                awayTeam={team2.name}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
