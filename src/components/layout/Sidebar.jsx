import { Link, useLocation } from 'react-router-dom';
import { useUIStore } from '@/store/uiStore';

const navLinks = [
  { to: '/', label: 'Inicio', icon: '🏠' },
  { to: '/en-vivo', label: 'En Vivo', icon: '🔴' },
  { to: '/partidos', label: 'Partidos', icon: '⚽' },
  { to: '/equipos', label: 'Equipos', icon: '🌐' },
  { to: '/predicciones', label: 'Predicciones', icon: '📊' },
  { to: '/h2h', label: 'H2H', icon: '⚔️' },
];

export default function Sidebar() {
  const location = useLocation();
  const { sidebarOpen, setSidebarOpen } = useUIStore();

  return (
    <>
      {/* Mobile bottom tab bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-surface border-t border-surface-3/50 flex">
        {navLinks.map(({ to, label, icon }) => {
          const isActive = to === '/' ? location.pathname === '/' : location.pathname.startsWith(to);
          return (
            <Link
              key={to}
              to={to}
              className={`flex-1 flex flex-col items-center gap-0.5 py-2.5 text-xs transition-colors ${
                isActive ? 'text-accent' : 'text-slate-500'
              }`}
            >
              <span className="text-lg leading-none">{icon}</span>
              <span className="leading-none font-medium">{label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Mobile overlay drawer */}
      {sidebarOpen && (
        <div className="md:hidden fixed inset-0 z-[60]">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="absolute left-0 top-0 bottom-0 w-64 bg-surface-2 border-r border-surface-3/50 p-6">
            <div className="flex items-center gap-2 mb-8">
              <span className="text-2xl">⚽</span>
              <div>
                <div className="text-sm font-black text-white">MUNDIAL 2026</div>
                <div className="text-xs text-accent-gold font-semibold">ESTADÍSTICAS</div>
              </div>
            </div>
            <nav className="flex flex-col gap-1">
              {navLinks.map(({ to, label, icon }) => {
                const isActive = to === '/' ? location.pathname === '/' : location.pathname.startsWith(to);
                return (
                  <Link
                    key={to}
                    to={to}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-accent/20 text-accent'
                        : 'text-slate-400 hover:text-white hover:bg-surface-3'
                    }`}
                  >
                    <span className="text-lg">{icon}</span>
                    <span>{label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
