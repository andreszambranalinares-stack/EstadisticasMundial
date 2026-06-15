import { Link } from 'react-router-dom';
import FlagCircle from './FlagCircle';
import Badge from './Badge';
import { getSpanishName } from '@/constants/teamMappings';
import { formatMatchDate, getMatchStatusLabel, getRoundLabel } from '@/lib/formatters';
import { useFixturePredictions } from '@/hooks/usePredictions';
import { formatPercent } from '@/lib/formatters';

export default function MatchCard({ fixture, showPredictions = false }) {
  const { homeTeam, awayTeam, goals, status, date, round } = fixture;
  const isLive = ['1H', '2H', 'HT', 'ET', 'PEN'].includes(status?.short);
  const isFinished = status?.short === 'FT' || status?.short === 'AET';
  const isUpcoming = status?.short === 'NS' || status?.short === 'TBD';
  const predictions = useFixturePredictions(showPredictions ? fixture : null);

  return (
    <Link to={`/partidos/${fixture.id}`} className="block card-hover p-4 group">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs text-slate-500">{getRoundLabel(round)}</span>
        {isLive && <Badge variant="live" pulse>EN VIVO {status.elapsed}'</Badge>}
        {isFinished && <Badge variant="final">Final</Badge>}
        {isUpcoming && <Badge variant="upcoming">{formatMatchDate(date)}</Badge>}
      </div>

      <div className="flex items-center justify-between gap-3">
        {/* Home team */}
        <div className="flex-1 flex flex-col items-center gap-2 text-center">
          <FlagCircle teamName={homeTeam.name} size="md" />
          <span className="text-xs font-semibold text-slate-200 leading-tight">
            {getSpanishName(homeTeam.name)}
          </span>
        </div>

        {/* Score / time */}
        <div className="flex flex-col items-center gap-1 min-w-[80px]">
          {isUpcoming ? (
            <div className="text-center">
              <div className="text-lg font-bold text-slate-400">vs</div>
              <div className="text-xs text-slate-500">{formatMatchDate(date)}</div>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-2">
                <span className={`text-3xl font-black ${isLive ? 'text-white' : 'text-slate-200'}`}>
                  {goals.home ?? '—'}
                </span>
                <span className="text-surface-4 font-bold">–</span>
                <span className={`text-3xl font-black ${isLive ? 'text-white' : 'text-slate-200'}`}>
                  {goals.away ?? '—'}
                </span>
              </div>
              {isLive && (
                <div className="text-xs text-bet-red font-bold animate-pulse">
                  {status.elapsed}'
                </div>
              )}
              {isFinished && (
                <div className="text-xs text-slate-500">Final</div>
              )}
            </>
          )}
        </div>

        {/* Away team */}
        <div className="flex-1 flex flex-col items-center gap-2 text-center">
          <FlagCircle teamName={awayTeam.name} size="md" />
          <span className="text-xs font-semibold text-slate-200 leading-tight">
            {getSpanishName(awayTeam.name)}
          </span>
        </div>
      </div>

      {/* Betting odds preview */}
      {showPredictions && predictions && isUpcoming && (
        <div className="mt-3 pt-3 border-t border-surface-3/50 flex justify-center gap-4">
          <div className="text-center">
            <div className="text-xs text-slate-500 mb-0.5">Local</div>
            <div className="text-sm font-bold text-bet-green">{formatPercent(predictions.homeWin)}</div>
          </div>
          <div className="text-center">
            <div className="text-xs text-slate-500 mb-0.5">Empate</div>
            <div className="text-sm font-bold text-bet-yellow">{formatPercent(predictions.draw)}</div>
          </div>
          <div className="text-center">
            <div className="text-xs text-slate-500 mb-0.5">Visitante</div>
            <div className="text-sm font-bold text-bet-orange">{formatPercent(predictions.awayWin)}</div>
          </div>
        </div>
      )}

      {/* Venue */}
      {fixture.venue && (
        <div className="mt-2 text-center text-xs text-slate-600">{fixture.venue}</div>
      )}
    </Link>
  );
}
