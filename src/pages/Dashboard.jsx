import { Link } from 'react-router-dom';
import MatchCard from '@/components/common/MatchCard';
import GroupStandingsTable from '@/components/sections/GroupStandingsTable';
import { PageLoader } from '@/components/common/LoadingSpinner';
import Badge from '@/components/common/Badge';
import { useAllMatches } from '@/hooks/useMatches';
import { useLiveMatches } from '@/hooks/useLiveMatches';
import { useStandings } from '@/hooks/useStandings';

export default function Dashboard() {
  const { data: allMatches = [], isLoading } = useAllMatches();
  const { data: liveMatches = [] } = useLiveMatches();
  const { data: standings = [] } = useStandings();

  const upcoming = allMatches
    .filter((f) => f.status?.short === 'NS' || f.status?.short === 'TBD')
    .slice(0, 8);

  const recent = allMatches
    .filter((f) => f.status?.short === 'FT')
    .slice(-4)
    .reverse();

  if (isLoading) return <PageLoader />;

  return (
    <div className="space-y-8">
      {/* Hero */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-accent/30 via-surface-2 to-accent-gold/10 border border-accent/20 p-6 md:p-10">
        <div className="absolute inset-0 bg-hero-pattern opacity-30" />
        <div className="relative text-center">
          <div className="text-5xl mb-3">🏆</div>
          <h1 className="text-3xl md:text-5xl font-black text-white mb-2">
            Copa Mundial 2026
          </h1>
          <p className="text-slate-300 text-lg mb-6">
            Estadísticas en tiempo real · Análisis de apuestas · Predicciones IA
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/predicciones" className="btn-primary px-6 py-2.5 text-sm">
              📊 Ver Predicciones
            </Link>
            <Link to="/en-vivo" className="flex items-center gap-2 bg-bet-red/20 border border-bet-red/40 text-bet-red px-6 py-2.5 rounded-lg font-medium text-sm hover:bg-bet-red/30 transition-colors">
              <span className="w-2 h-2 rounded-full bg-bet-red animate-pulse" />
              EN VIVO
            </Link>
          </div>
        </div>
      </div>

      {/* Live matches */}
      {liveMatches.length > 0 && (
        <section>
          <div className="flex items-center gap-3 mb-4">
            <Badge variant="live" pulse>EN VIVO</Badge>
            <h2 className="section-title">Partidos en Curso</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {liveMatches.map((f) => (
              <MatchCard key={f.id} fixture={f} />
            ))}
          </div>
        </section>
      )}

      {/* Upcoming */}
      {upcoming.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="section-title">Próximos Partidos</h2>
            <Link to="/partidos" className="text-sm text-accent hover:text-white transition-colors">
              Ver todos →
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {upcoming.map((f) => (
              <MatchCard key={f.id} fixture={f} showPredictions />
            ))}
          </div>
        </section>
      )}

      {/* Recent results */}
      {recent.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="section-title">Últimos Resultados</h2>
            <Link to="/partidos" className="text-sm text-accent hover:text-white transition-colors">
              Ver todos →
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {recent.map((f) => (
              <MatchCard key={f.id} fixture={f} />
            ))}
          </div>
        </section>
      )}

      {/* Standings */}
      {standings.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="section-title">Clasificación por Grupos</h2>
            <Link to="/equipos" className="text-sm text-accent hover:text-white transition-colors">
              Ver equipos →
            </Link>
          </div>
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
            {standings.map(({ group, teams }) => (
              <GroupStandingsTable key={group} group={group} teams={teams} compact />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
