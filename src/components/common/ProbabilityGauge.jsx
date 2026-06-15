import { RadialBarChart, RadialBar, ResponsiveContainer } from 'recharts';
import { getProbColor, getProbHex } from '@/constants/bettingThresholds';
import { formatPercent } from '@/lib/formatters';

export default function ProbabilityGauge({ prob, label, size = 120 }) {
  const { text } = getProbColor(prob);
  const color = getProbHex(prob);
  const pct = Math.round((prob || 0) * 100);

  const data = [
    { value: pct, fill: color },
    { value: 100 - pct, fill: '#334155' },
  ];

  return (
    <div className="flex flex-col items-center gap-1">
      <div style={{ width: size, height: size / 1.8 }} className="relative">
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart
            cx="50%"
            cy="100%"
            innerRadius="70%"
            outerRadius="100%"
            startAngle={180}
            endAngle={0}
            data={data}
          >
            <RadialBar dataKey="value" cornerRadius={4} />
          </RadialBarChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex items-end justify-center pb-1">
          <span className={`text-xl font-black ${text}`}>{formatPercent(prob)}</span>
        </div>
      </div>
      <span className="text-xs text-slate-400 font-medium text-center leading-tight">{label}</span>
    </div>
  );
}
