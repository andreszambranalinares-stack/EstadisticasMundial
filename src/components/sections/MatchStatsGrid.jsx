import StatBar from '@/components/common/StatBar';
import FlagCircle from '@/components/common/FlagCircle';
import { getSpanishName } from '@/constants/teamMappings';

const STATS = [
  { key: 'possession', label: 'Posesión', suffix: '%', highlight: true },
  { key: 'shots', label: 'Tiros totales' },
  { key: 'shotsOnTarget', label: 'Tiros a puerta' },
  { key: 'shotsOffTarget', label: 'Tiros fuera' },
  { key: 'shotsBlocked', label: 'Tiros bloqueados' },
  { key: 'xg', label: 'xG (Goles esperados)', highlight: true },
  { key: 'corners', label: 'Córners' },
  { key: 'fouls', label: 'Faltas' },
  { key: 'yellowCards', label: 'Tarjetas amarillas' },
  { key: 'redCards', label: 'Tarjetas rojas' },
  { key: 'offsides', label: 'Fueras de juego' },
  { key: 'passAccuracy', label: 'Precisión de pases', suffix: '%', highlight: true },
  { key: 'tackles', label: 'Entradas' },
  { key: 'interceptions', label: 'Intercepciones' },
  { key: 'saves', label: 'Paradas del portero' },
  { key: 'bigChances', label: 'Grandes ocasiones', highlight: true },
  { key: 'dribbles', label: 'Regates completados' },
];

export default function MatchStatsGrid({ stats, homeTeam, awayTeam }) {
  if (!stats) {
    return (
      <div className="flex items-center justify-center py-16 text-slate-500 text-sm">
        Estadísticas no disponibles aún
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <FlagCircle teamName={homeTeam} size="sm" />
          <span className="text-sm font-semibold text-white">{getSpanishName(homeTeam)}</span>
        </div>
        <span className="text-xs text-slate-500 uppercase tracking-wider">Estadísticas</span>
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-white">{getSpanishName(awayTeam)}</span>
          <FlagCircle teamName={awayTeam} size="sm" />
        </div>
      </div>

      <div className="space-y-0.5">
        {STATS.map(({ key, label, suffix, highlight }) => (
          <StatBar
            key={key}
            label={label}
            homeValue={stats.home?.[key] ?? 0}
            awayValue={stats.away?.[key] ?? 0}
            suffix={suffix}
            highlight={highlight}
          />
        ))}
      </div>
    </div>
  );
}
