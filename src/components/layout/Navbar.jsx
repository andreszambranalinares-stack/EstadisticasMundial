import { Link, useLocation } from 'react-router-dom';
import { useUIStore } from '@/store/uiStore';

const navLinks = [
  { to: '/', label: 'Inicio', icon: '🏠' },
  { to: '/en-vivo', label: 'En Vivo', icon: '🔴', live: true },
  { to: '/partidos', label: 'Partidos', icon: '⚽' },
  { to: '/equipos', label: 'Equipos', icon: '🌐' },
  { to: '/predicciones', label: 'Predicciones', icon: '📊' },
  { to: '/h2h', label: 'H2H', icon: '⚔️' },
];

export default function Navbar() {
  const location = useLocation();
  const { apiQuotaRemaining, toggleSidebar } = useUIStore();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface/95 backdrop-blur border-b border-surface-3/50">
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 shrink-0">
          <span className="text-2xl">⚽</span>
          <div className="hidden sm:block">
            <div className="text-sm font-black text-white leading-none">MUNDIAL 2026</div>
            <div className="text-xs text-accent-gold font-semibold leading-none">ESTADÍSTICAS</div>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map(({ to, label, icon, live }) => {
            const isActive = to === '/' ? location.pathname === '/' : location.pathname.startsWith(to);
            return (
              <Link
                key={to}
                to={to}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-accent/20 text-accent border border-accent/30'
                    : 'text-slate-400 hover:text-white hover:bg-surface-3'
                }`}
              >
                <span>{icon}</span>
                <span>{label}</span>
                {live && (
                  <span className="w-1.5 h-1.5 rounded-full bg-bet-red animate-pulse" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Quota indicator + mobile menu */}
        <div className="flex items-center gap-3">
          {apiQuotaRemaining !== null && (
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-500">
              <span className={`w-1.5 h-1.5 rounded-full ${apiQuotaRemaining > 50 ? 'bg-bet-green' : apiQuotaRemaining > 10 ? 'bg-bet-yellow' : 'bg-bet-red'}`} />
              {apiQuotaRemaining} req
            </div>
          )}
          {/* Mobile hamburger */}
          <button
            onClick={toggleSidebar}
            className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-surface-3 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile nav bar (bottom) - rendered via Sidebar on mobile */}
    </header>
  );
}
