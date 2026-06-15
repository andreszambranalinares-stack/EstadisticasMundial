import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getGoalDistribution } from '@/lib/poisson';
import { getSpanishName } from '@/constants/teamMappings';

export default function PoissonDistChart({ homeLambda, awayLambda, homeTeam, awayTeam }) {
  if (!homeLambda || !awayLambda) return null;

  const homeData = getGoalDistribution(homeLambda);
  const awayData = getGoalDistribution(awayLambda);

  const data = homeData.map((d, i) => ({
    goals: d.goals,
    home: Math.round(d.prob * 1000) / 10,
    away: Math.round((awayData[i]?.prob ?? 0) * 1000) / 10,
  }));

  return (
    <div className="h-44">
      <p className="text-xs text-slate-400 mb-2 text-center">
        Distribución Poisson — xG esperados: {homeLambda.toFixed(2)} vs {awayLambda.toFixed(2)}
      </p>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 4, right: 4, bottom: 4, left: -28 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis dataKey="goals" tick={{ fill: '#94a3b8', fontSize: 10 }} label={{ value: 'Goles', fill: '#94a3b8', fontSize: 9, position: 'insideRight', offset: -4 }} />
          <YAxis tick={{ fill: '#94a3b8', fontSize: 10 }} unit="%" />
          <Tooltip
            contentStyle={{ background: '#1E293B', border: '1px solid #334155', borderRadius: '8px', fontSize: 12 }}
            formatter={(val, name) => [`${val}%`, name === 'home' ? getSpanishName(homeTeam) : getSpanishName(awayTeam)]}
          />
          <Legend
            formatter={(val) => (
              <span style={{ color: '#94a3b8', fontSize: 11 }}>
                {val === 'home' ? getSpanishName(homeTeam) : getSpanishName(awayTeam)}
              </span>
            )}
          />
          <Area type="monotone" dataKey="home" name="home" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.25} strokeWidth={2} />
          <Area type="monotone" dataKey="away" name="away" stroke="#F59E0B" fill="#F59E0B" fillOpacity={0.2} strokeWidth={2} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
