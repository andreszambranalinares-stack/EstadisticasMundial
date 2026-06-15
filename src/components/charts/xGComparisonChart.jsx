import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell, ResponsiveContainer, ReferenceLine } from 'recharts';
import { getSpanishName } from '@/constants/teamMappings';

export default function XGComparisonChart({ stats, homeTeam, awayTeam }) {
  if (!stats) return null;

  const data = [
    { name: getSpanishName(homeTeam), xg: stats.home?.xg ?? 0, color: '#3B82F6', fill: '#3B82F6' },
    { name: getSpanishName(awayTeam), xg: stats.away?.xg ?? 0, color: '#F59E0B', fill: '#F59E0B' },
  ];

  return (
    <div className="h-40">
      <p className="text-xs text-slate-400 mb-2 text-center">Expected Goals (xG)</p>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 4, right: 16, bottom: 4, left: -24 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
          <XAxis dataKey="name" tick={{ fill: '#94a3b8', fontSize: 11 }} />
          <YAxis tick={{ fill: '#94a3b8', fontSize: 10 }} domain={[0, 'auto']} />
          <Tooltip
            contentStyle={{ background: '#1E293B', border: '1px solid #334155', borderRadius: '8px' }}
            formatter={(val) => [val.toFixed(2), 'xG']}
          />
          <ReferenceLine y={1.3} stroke="#475569" strokeDasharray="4 4" label={{ value: 'Media WC', fill: '#64748b', fontSize: 9 }} />
          <Bar dataKey="xg" radius={[6, 6, 0, 0]}>
            {data.map((entry, i) => (
              <Cell key={i} fill={entry.fill} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
