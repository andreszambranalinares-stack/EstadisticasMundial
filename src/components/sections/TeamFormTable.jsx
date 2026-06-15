import { Link } from 'react-router-dom';
import FlagCircle from '@/components/common/FlagCircle';
import { getSpanishName } from '@/constants/teamMappings';
import { getResultColor } from '@/lib/formatters';

export default function TeamFormTable({ fixtures = [], teamId }) {
  if (!fixtures.length) {
    return <div className="text-center py-4 text-slate-500 text-sm">Sin partidos registrados</div>;
  }

  return (
    <div className="space-y-2">
      {fixtures.map((fixture) => {
        const isHome = fixture.homeTeam?.id === teamId;
        const opponent = isHome ? fixture.awayTeam : fixture.homeTeam;
        const myGoals = isHome ? fixture.goals?.home : fixture.goals?.away;
        const oppGoals = isHome ? fixture.goals?.away : fixture.goals?.home;
        const result = myGoals > oppGoals ? 'W' : myGoals === oppGoals ? 'D' : 'L';
        const isFinished = fixture.status?.short === 'FT';

        return (
          <Link key={fixture.id} to={`/partidos/${fixture.id}`} className="flex items-center gap-3 p-2.5 rounded-lg bg-surface-2 hover:bg-surface-3/50 transition-colors border border-surface-3/30">
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black flex-shrink-0 ${getResultColor(isFinished ? result : '?')}`}>
              {isFinished ? result : '?'}
            </span>
            <FlagCircle teamName={opponent?.name ?? ''} size="xs" />
            <span className="flex-1 text-sm text-slate-200 truncate">
              {getSpanishName(opponent?.name ?? '')}
            </span>
            <span className="text-sm font-bold text-white">
              {isFinished ? `${myGoals}-${oppGoals}` : '—'}
            </span>
            <span className="text-xs text-slate-500 text-right">{fixture.round?.replace('Group Stage - ', 'J')}</span>
          </Link>
        );
      })}
    </div>
  );
}
