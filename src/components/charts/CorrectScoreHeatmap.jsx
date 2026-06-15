import { formatPercent } from '@/lib/formatters';

export default function CorrectScoreHeatmap({ predictions, homeTeam, awayTeam }) {
  if (!predictions?.topScores) return null;

  const { topScores, matrix } = predictions;
  const topSet = new Set(topScores.slice(0, 5).map((s) => `${s.home}-${s.away}`));
  const maxProb = topScores[0]?.prob ?? 0.01;

  const rows = Array.from({ length: 5 }, (_, h) => h);
  const cols = Array.from({ length: 5 }, (_, a) => a);

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <p className="text-xs text-slate-400">Probabilidades de resultado exacto</p>
        <div className="flex items-center gap-3 text-xs text-slate-500">
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded border border-accent-gold/60 inline-block" /> Top 5
          </span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr>
              <th className="text-slate-500 p-1 text-center w-8">↓L/V→</th>
              {cols.map((a) => (
                <th key={a} className="text-slate-400 p-1 text-center font-semibold">{a}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((h) => (
              <tr key={h}>
                <td className="text-slate-400 p-1 text-center font-semibold">{h}</td>
                {cols.map((a) => {
                  const prob = matrix?.[h]?.[a] ?? 0;
                  const isTop = topSet.has(`${h}-${a}`);
                  const opacity = Math.round((prob / maxProb) * 100);

                  return (
                    <td
                      key={a}
                      className={`p-0.5 text-center transition-all ${isTop ? 'ring-1 ring-accent-gold rounded' : ''}`}
                      title={`${h}-${a}: ${formatPercent(prob)}`}
                    >
                      <div
                        className="rounded text-xs font-medium py-1 px-0.5 min-w-[36px]"
                        style={{
                          backgroundColor: `rgba(59, 130, 246, ${opacity / 120})`,
                          color: opacity > 60 ? '#fff' : '#94a3b8',
                        }}
                      >
                        {formatPercent(prob)}
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-3 text-xs text-slate-400">
        <span className="font-semibold text-white">Más probables: </span>
        {topScores.slice(0, 5).map((s) => (
          <span key={s.label} className="mr-3 text-accent-gold font-bold">
            {s.label} ({formatPercent(s.prob)})
          </span>
        ))}
      </div>
    </div>
  );
}
