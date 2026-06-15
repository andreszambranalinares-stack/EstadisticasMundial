import { Link } from 'react-router-dom';
import FlagCircle from '@/components/common/FlagCircle';
import { getSpanishName } from '@/constants/teamMappings';

function FormBadge({ result }) {
  const colors = {
    W: 'bg-bet-green text-white',
    D: 'bg-surface-4 text-white',
    L: 'bg-bet-red text-white',
  };
  return (
    <span className={`w-4 h-4 rounded-sm flex items-center justify-center text-[9px] font-black ${colors[result] ?? 'bg-surface-3 text-slate-400'}`}>
      {result}
    </span>
  );
}

export default function GroupStandingsTable({ group, teams = [], compact = false }) {
  return (
    <div className={`${compact ? '' : 'card'} overflow-hidden`}>
      {!compact && (
        <div className="px-4 py-3 border-b border-surface-3/50 flex items-center justify-between">
          <h3 className="text-sm font-bold text-white">Grupo {group}</h3>
        </div>
      )}
      <table className="w-full text-xs">
        <thead>
          <tr className="text-slate-500 uppercase tracking-wider border-b border-surface-3/30">
            <th className="text-left px-3 py-2 font-medium w-6">#</th>
            <th className="text-left px-2 py-2 font-medium">Selección</th>
            {!compact && <th className="text-center px-1 py-2 font-medium">PJ</th>}
            <th className="text-center px-1 py-2 font-medium">V</th>
            <th className="text-center px-1 py-2 font-medium">E</th>
            <th className="text-center px-1 py-2 font-medium">D</th>
            <th className="text-center px-1 py-2 font-medium">GF</th>
            <th className="text-center px-1 py-2 font-medium">GC</th>
            {!compact && <th className="text-center px-1 py-2 font-medium">Forma</th>}
            <th className="text-center px-2 py-2 font-bold text-white">Pts</th>
          </tr>
        </thead>
        <tbody>
          {teams.map(({ team, rank }, i) => {
            const qualifies = i < 2;
            const thirdPlace = i === 2;
            return (
              <tr
                key={team.id}
                className={`border-b border-surface-3/20 hover:bg-surface-3/20 transition-colors ${
                  qualifies ? 'bg-accent/5' : thirdPlace ? 'bg-accent-gold/5' : ''
                }`}
              >
                <td className="px-3 py-2.5">
                  <span className={`text-xs font-bold ${qualifies ? 'text-accent' : thirdPlace ? 'text-accent-gold' : 'text-slate-500'}`}>
                    {rank ?? i + 1}
                  </span>
                </td>
                <td className="px-2 py-2.5">
                  <Link to={`/equipos/${team.id}`} className="flex items-center gap-2 hover:text-white transition-colors">
                    <FlagCircle teamName={team.name} size="xs" />
                    <span className="font-medium text-slate-200 hover:text-white transition-colors leading-tight">
                      {getSpanishName(team.name)}
                    </span>
                  </Link>
                </td>
                {!compact && <td className="text-center px-1 py-2.5 text-slate-400">{team.played ?? 0}</td>}
                <td className="text-center px-1 py-2.5 text-slate-300">{team.wins ?? 0}</td>
                <td className="text-center px-1 py-2.5 text-slate-400">{team.draws ?? 0}</td>
                <td className="text-center px-1 py-2.5 text-slate-400">{team.losses ?? 0}</td>
                <td className="text-center px-1 py-2.5 text-slate-300">{team.goalsFor ?? 0}</td>
                <td className="text-center px-1 py-2.5 text-slate-400">{team.goalsAgainst ?? 0}</td>
                {!compact && (
                  <td className="px-1 py-2.5">
                    <div className="flex gap-0.5 justify-center">
                      {(team.form || '').split('').map((r, j) => (
                        <FormBadge key={j} result={r} />
                      ))}
                    </div>
                  </td>
                )}
                <td className="text-center px-2 py-2.5 font-black text-white">{team.pts ?? 0}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="flex gap-4 px-3 py-2 text-xs text-slate-500 border-t border-surface-3/20">
        <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-accent" />Clasifica</span>
        <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-accent-gold" />Posible 3º</span>
      </div>
    </div>
  );
}
