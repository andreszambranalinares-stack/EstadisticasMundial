import BettingCard from '@/components/common/BettingCard';
import ProbabilityGauge from '@/components/common/ProbabilityGauge';
import CorrectScoreHeatmap from '@/components/charts/CorrectScoreHeatmap';
import PoissonDistChart from '@/components/charts/PoissonDistChart';
import { formatPercent, formatOddsDecimal } from '@/lib/formatters';
import { getProbColor } from '@/constants/bettingThresholds';
import { getSpanishName } from '@/constants/teamMappings';

function OverUnderRow({ label, overProb }) {
  const { text } = getProbColor(overProb);
  const underProb = 1 - overProb;
  return (
    <div className="flex items-center gap-3 py-2 border-b border-surface-3/30 last:border-0">
      <span className="text-xs text-slate-400 w-24 font-medium">{label}</span>
      <div className="flex-1 flex items-center gap-2">
        <span className="text-xs text-slate-500 w-6">+</span>
        <div className="flex-1 h-1.5 bg-surface-3 rounded-full overflow-hidden">
          <div className="h-full bg-accent rounded-full" style={{ width: `${overProb * 100}%` }} />
        </div>
        <span className={`text-xs font-bold w-10 text-right ${text}`}>{formatPercent(overProb)}</span>
        <span className="text-xs text-slate-600 w-12 text-right font-mono">{formatOddsDecimal(overProb)}</span>
      </div>
      <div className="flex-1 flex items-center gap-2">
        <span className="text-xs text-slate-500 w-6">-</span>
        <div className="flex-1 h-1.5 bg-surface-3 rounded-full overflow-hidden">
          <div className="h-full bg-accent-gold rounded-full" style={{ width: `${underProb * 100}%` }} />
        </div>
        <span className={`text-xs font-bold w-10 text-right ${getProbColor(underProb).text}`}>{formatPercent(underProb)}</span>
        <span className="text-xs text-slate-600 w-12 text-right font-mono">{formatOddsDecimal(underProb)}</span>
      </div>
    </div>
  );
}

export default function BettingMetricsPanel({ predictions, homeTeam, awayTeam }) {
  if (!predictions) {
    return (
      <div className="flex items-center justify-center py-12 text-slate-500 text-sm">
        Datos insuficientes para calcular predicciones
      </div>
    );
  }

  const {
    homeWin, draw, awayWin,
    over05, over15, over25, over35,
    btts, bttsFail,
    homeCleanSheet, awayCleanSheet,
    homeLambda, awayLambda,
  } = predictions;

  return (
    <div className="space-y-6">
      {/* 1X2 Gauges */}
      <div>
        <h4 className="text-sm font-semibold text-slate-300 mb-4">Resultado del Partido (1X2)</h4>
        <div className="grid grid-cols-3 gap-4">
          <ProbabilityGauge
            prob={homeWin}
            label={`Victoria ${getSpanishName(homeTeam)}`}
            size={110}
          />
          <ProbabilityGauge prob={draw} label="Empate" size={110} />
          <ProbabilityGauge
            prob={awayWin}
            label={`Victoria ${getSpanishName(awayTeam)}`}
            size={110}
          />
        </div>
      </div>

      {/* Cuotas */}
      <div className="grid grid-cols-3 gap-3 text-center">
        {[
          { label: `1 (${getSpanishName(homeTeam)})`, prob: homeWin },
          { label: 'X (Empate)', prob: draw },
          { label: `2 (${getSpanishName(awayTeam)})`, prob: awayWin },
        ].map(({ label, prob }) => (
          <div key={label} className="bg-surface-3/40 rounded-lg p-2">
            <div className="text-xs text-slate-500 mb-1">{label}</div>
            <div className="text-lg font-black text-white font-mono">{formatOddsDecimal(prob)}</div>
            <div className="text-xs text-slate-500">{formatPercent(prob)}</div>
          </div>
        ))}
      </div>

      {/* BTTS */}
      <div>
        <h4 className="text-sm font-semibold text-slate-300 mb-3">Ambos Equipos Marcan (BTTS)</h4>
        <div className="grid grid-cols-2 gap-3">
          <BettingCard label="Sí marcan ambos" prob={btts} icon="✅" />
          <BettingCard label="No marcan ambos" prob={bttsFail} icon="❌" />
        </div>
      </div>

      {/* Over/Under */}
      <div>
        <h4 className="text-sm font-semibold text-slate-300 mb-3">Más/Menos Goles</h4>
        <div className="card p-3">
          <div className="flex text-xs text-slate-500 mb-2 px-1 gap-3">
            <span className="w-24">Mercado</span>
            <span className="flex-1 text-center">Más de</span>
            <span className="flex-1 text-center">Menos de</span>
          </div>
          <OverUnderRow label="0.5 goles" overProb={over05} />
          <OverUnderRow label="1.5 goles" overProb={over15} />
          <OverUnderRow label="2.5 goles" overProb={over25} />
          <OverUnderRow label="3.5 goles" overProb={over35} />
        </div>
      </div>

      {/* Clean sheets */}
      <div>
        <h4 className="text-sm font-semibold text-slate-300 mb-3">Portería a Cero</h4>
        <div className="grid grid-cols-2 gap-3">
          <BettingCard label={`${getSpanishName(homeTeam)} sin encajar`} prob={homeCleanSheet} icon="🛡️" size="sm" />
          <BettingCard label={`${getSpanishName(awayTeam)} sin encajar`} prob={awayCleanSheet} icon="🛡️" size="sm" />
        </div>
      </div>

      {/* Double chance */}
      <div>
        <h4 className="text-sm font-semibold text-slate-300 mb-3">Doble Oportunidad</h4>
        <div className="grid grid-cols-3 gap-3">
          <BettingCard label={`1X (${getSpanishName(homeTeam)} no pierde)`} prob={homeWin + draw} showOdds size="sm" />
          <BettingCard label="12 (No empate)" prob={homeWin + awayWin} showOdds size="sm" />
          <BettingCard label={`X2 (${getSpanishName(awayTeam)} no pierde)`} prob={draw + awayWin} showOdds size="sm" />
        </div>
      </div>

      {/* Poisson distribution chart */}
      <div className="card p-4">
        <h4 className="text-sm font-semibold text-slate-300 mb-3">Distribución de Goles (Modelo Poisson)</h4>
        <PoissonDistChart
          homeLambda={homeLambda}
          awayLambda={awayLambda}
          homeTeam={homeTeam}
          awayTeam={awayTeam}
        />
      </div>

      {/* Correct score heatmap */}
      <div className="card p-4">
        <h4 className="text-sm font-semibold text-slate-300 mb-3">Resultado Exacto</h4>
        <CorrectScoreHeatmap
          predictions={predictions}
          homeTeam={homeTeam}
          awayTeam={awayTeam}
        />
      </div>
    </div>
  );
}
