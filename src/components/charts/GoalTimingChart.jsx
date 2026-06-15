import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getGoalTimingBuckets } from '@/lib/bettingEngine';
import { getSpanishName } from '@/constants/teamMappings';

export default function GoalTimingChart({ events = [], homeTeam, awayTeam }) {
  const data = getGoalTimingBuckets(events);

  const hasData = data.some((b) => b.home > 0 || b.away > 0);

  if (!hasData) {
    return (
      <div className="flex items-center justify-center h-32 text-slate-500 text-sm">
        Sin datos de goles disponibles
      </div>
    );
  }

  return (
    <div className="h-44">
      <p className="text-xs text-slate-400 mb-2 text-center">Distribución de goles por periodo</p>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 4, right: 4, bottom: 4, left: -24 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis dataKey="label" tick={{ fill: '#94a3b8', fontSize: 10 }} />
          <YAxis tick={{ fill: '#94a3b8', fontSize: 10 }} allowDecimals={false} />
          <Tooltip
            contentStyle={{ background: '#1E293B', border: '1px solid #334155', borderRadius: '8px' }}
            labelStyle={{ color: '#cbd5e1', fontSize: 12 }}
          />
          <Legend
            formatter={(value) => (
              <span style={{ color: '#94a3b8', fontSize: 11 }}>
                {value === 'home' ? getSpanishName(homeTeam) : getSpanishName(awayTeam)}
              </span>
            )}
          />
          <Bar dataKey="home" fill="#3B82F6" radius={[3, 3, 0, 0]} name="home" />
          <Bar dataKey="away" fill="#F59E0B" radius={[3, 3, 0, 0]} name="away" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
