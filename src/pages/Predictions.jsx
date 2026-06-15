import { Link } from 'react-router-dom';
import FlagCircle from '@/components/common/FlagCircle';
import BettingCard from '@/components/common/BettingCard';
import CorrectScoreHeatmap from '@/components/charts/CorrectScoreHeatmap';
import Badge from '@/components/common/Badge';
import { PageLoader } from '@/components/common/LoadingSpinner';
import { useAllMatches } from '@/hooks/useMatches';
import { useFixturePredictions } from '@/hooks/usePredictions';
import { getSpanishName } from '@/constants/teamMappings';
import { formatMatchDate, formatOddsDecimal, formatPercent, getRoundLabel } from '@/lib/formatters';
import { getProbColor } from '@/constants/bettingThresholds';

function PredictionRow({ fixture }) {
  const predictions = useFixturePredictions(fixture);
  const { homeTeam, awayTeam, date, round } = fixture;

  if (!predictions) return null;

  const { homeWin, draw, awayWin, over25, btts, topScores } = predictions;
  const { text: hw } = getProbColor(homeWin);
  const { text: dw } = getProbColor(draw);
  const { text: aw } = getProbColor(awayWin);

  return (
    <div className="card p-4 space-y-4">
      {/* Match header */}
      <div className="flex items-center justify-between">
        <span className="text-xs text-slate-500">{getRoundLabel(round)}</span>
        <Badge variant="upcoming">{formatMatchDate(date)}</Badge>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex flex-col items-center gap-2 flex-1">
          <FlagCircle teamName={homeTeam.name} size="lg" />
          <span className="text-xs font-semibold text-slate-200 text-center">{getSpanishName(homeTeam.name)}</span>
        </div>
        <div className="text-xl font-black text-slate-500">vs</div>
        <div className="flex flex-col items-center gap-2 flex-1">
          <FlagCircle teamName={awayTeam.name} size="lg" />
          <span className="text-xs font-semibold text-slate-200 text-center">{getSpanishName(awayTeam.name)}</span>
        </div>
      </div>

      {/* 1X2 probabilities */}
      <div>
        <div className="text-xs text-slate-500 text-center mb-2 uppercase tracking-wide">Resultado (1X2)</div>
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: `1 ${getSpanishName(homeTeam.name)}`, prob: homeWin, textClass: hw },
            { label: 'X Empate', prob: draw, textClass: dw },
            { label: `2 ${getSpanishName(awayTeam.name)}`, prob: awayWin, textClass: aw },
          ].map(({ label, prob, textClass }) => (
            <div key={label} className="bg-surface-3/40 rounded-lg p-2.5 text-center">
              <div className="text-xs text-slate-500 mb-1 leading-tight">{label}</div>
              <div className={`text-xl font-black ${textClass}`}>{formatPercent(prob)}</div>
              <div className="text-xs text-slate-600 font-mono">{formatOddsDecimal(prob)}</div>
            </div>
          ))}
        </div>
      </div>

      {/* BTTS + Over 2.5 */}
      <div className="grid grid-cols-2 gap-3">
        <BettingCard label="Ambos marcan (BTTS)" prob={btts} icon="⚽" size="sm" />
        <BettingCard label="Más de 2.5 goles" prob={over25} icon="📈" size="sm" />
      </div>

      {/* Top correct scores */}
      <div>
        <div className="text-xs text-slate-500 mb-2">Resultados más probables</div>
        <div className="flex flex-wrap gap-2">
          {topScores?.slice(0, 5).map((s) => {
            const { text, bg, border } = getProbColor(s.prob);
            return (
              <span key={s.label} className={`${bg} ${border} border rounded-lg px-2.5 py-1 text-xs font-bold ${text}`}>
                {s.label} <span className="text-slate-400 font-normal">{formatPercent(s.prob)}</span>
              </span>
            );
          })}
        </div>
      </div>

      <Link
        to={`/partidos/${fixture.id}`}
        className="block text-center text-xs text-accent hover:text-white transition-colors pt-1 border-t border-surface-3/30"
      >
        Análisis completo →
      </Link>
    </div>
  );
}

export default function Predictions() {
  const { data: allMatches = [], isLoading } = useAllMatches();
  const upcoming = allMatches.filter((f) => f.status?.short === 'NS');

  if (isLoading) return <PageLoader />;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-black text-white mb-1">Predicciones de Apuestas</h1>
        <p className="text-sm text-slate-400">
          Probabilidades calculadas con distribución de Poisson · Media histórica WC: 2.6 goles/partido
        </p>
      </div>

      {/* Info card */}
      <div className="bg-accent/10 border border-accent/20 rounded-xl p-4 mb-6 flex gap-3">
        <span className="text-2xl flex-shrink-0">🔬</span>
        <div>
          <div className="text-sm font-semibold text-white mb-1">Modelo Poisson</div>
          <div className="text-xs text-slate-400">
            Las predicciones usan la distribución de Poisson calibrada con el histórico del Mundial.
            λ_local = (ataque_local × defensa_visitante × 2.6). Resultado exacto, BTTS y Over/Under
            se derivan de la matriz de probabilidades 7×7.
          </div>
        </div>
      </div>

      {upcoming.length === 0 ? (
        <div className="text-center py-16 text-slate-500">
          <div className="text-4xl mb-4">📅</div>
          <p>No hay partidos próximos con predicciones disponibles</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {upcoming.map((f) => (
            <PredictionRow key={f.id} fixture={f} />
          ))}
        </div>
      )}
    </div>
  );
}
