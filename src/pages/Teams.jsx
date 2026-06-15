import { Link } from 'react-router-dom';
import FlagCircle from '@/components/common/FlagCircle';
import GroupStandingsTable from '@/components/sections/GroupStandingsTable';
import { useStandings } from '@/hooks/useStandings';
import { PageLoader } from '@/components/common/LoadingSpinner';
import { getSpanishName } from '@/constants/teamMappings';

export default function Teams() {
  const { data: standings = [], isLoading } = useStandings();

  if (isLoading) return <PageLoader />;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black text-white">Equipos</h1>
          <p className="text-sm text-slate-400 mt-1">48 selecciones · 12 grupos · Copa Mundial 2026</p>
        </div>
      </div>

      {/* Team grid cards */}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        {standings.map(({ group, teams }) => (
          <div key={group} className="card overflow-hidden">
            <div className="bg-gradient-to-r from-accent/20 to-transparent border-b border-surface-3/50 px-4 py-3">
              <h2 className="font-black text-white text-sm uppercase tracking-wider">Grupo {group}</h2>
            </div>

            {/* Team flags row */}
            <div className="flex items-center justify-around px-4 pt-4 pb-2">
              {teams.map(({ team, rank }) => (
                <Link
                  key={team.id}
                  to={`/equipos/${team.id}`}
                  className="flex flex-col items-center gap-2 hover:scale-105 transition-transform group"
                >
                  <div className="relative">
                    <FlagCircle teamName={team.name} logoUrl={team.logo} size="lg" />
                    {rank === 1 && (
                      <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent-gold rounded-full flex items-center justify-center text-[9px] font-black text-surface">1</span>
                    )}
                    {rank === 2 && (
                      <span className="absolute -top-1 -right-1 w-5 h-5 bg-slate-300 rounded-full flex items-center justify-center text-[9px] font-black text-surface">2</span>
                    )}
                  </div>
                  <span className="text-xs font-semibold text-slate-300 group-hover:text-white transition-colors text-center leading-tight max-w-[64px]">
                    {getSpanishName(team.name)}
                  </span>
                  <span className="text-xs font-black text-white">{team.pts ?? 0} pts</span>
                </Link>
              ))}
            </div>

            {/* Compact standings table */}
            <div className="px-2 pb-2">
              <GroupStandingsTable group={group} teams={teams} compact />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
