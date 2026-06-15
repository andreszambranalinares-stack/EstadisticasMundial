import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from 'recharts';
import { getSpanishName } from '@/constants/teamMappings';

function normalize(value, min, max) {
  if (max === min) return 50;
  return Math.round(((value - min) / (max - min)) * 100);
}

function buildRadarData(teamA, teamB) {
  const metrics = [
    { key: 'avgGoalsScored', label: 'Ataque', min: 0.5, max: 3 },
    { key: 'possession', label: 'Posesión', min: 35, max: 70 },
    { key: 'passAccuracy', label: 'Pases', min: 65, max: 95 },
    { key: 'shotsPerGame', label: 'Tiros', min: 7, max: 20 },
    { key: 'cleanSheets', label: 'Portería', min: 0, max: 5 },
    { key: 'avgGoalsConceded', label: 'Defensa', min: 0.5, max: 2.5, invert: true },
  ];

  return metrics.map(({ key, label, min, max, invert }) => {
    const aVal = teamA?.[key] ?? min;
    const bVal = teamB?.[key] ?? min;
    const aN = invert ? 100 - normalize(aVal, min, max) : normalize(aVal, min, max);
    const bN = invert ? 100 - normalize(bVal, min, max) : normalize(bVal, min, max);
    return { label, A: aN, B: bN };
  });
}

export default function FormRadarChart({ teamA, teamB, nameA, nameB }) {
  const data = buildRadarData(teamA, teamB);
  const labelA = nameA ? getSpanishName(nameA) : 'Local';
  const labelB = nameB ? getSpanishName(nameB) : 'Visitante';

  return (
    <div className="h-56">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data} margin={{ top: 8, right: 24, bottom: 8, left: 24 }}>
          <PolarGrid stroke="#334155" />
          <PolarAngleAxis dataKey="label" tick={{ fill: '#94a3b8', fontSize: 10 }} />
          <Radar name={labelA} dataKey="A" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.25} strokeWidth={2} />
          {teamB && (
            <Radar name={labelB} dataKey="B" stroke="#F59E0B" fill="#F59E0B" fillOpacity={0.2} strokeWidth={2} />
          )}
          <Legend
            formatter={(val) => <span style={{ color: '#94a3b8', fontSize: 11 }}>{val}</span>}
          />
          <Tooltip
            contentStyle={{ background: '#1E293B', border: '1px solid #334155', borderRadius: '8px', fontSize: 12 }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
