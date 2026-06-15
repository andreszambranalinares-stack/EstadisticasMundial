import { Routes, Route, Navigate } from 'react-router-dom';
import PageWrapper from '@/components/layout/PageWrapper';
import Dashboard from '@/pages/Dashboard';
import Teams from '@/pages/Teams';
import TeamDetail from '@/pages/TeamDetail';
import Matches from '@/pages/Matches';
import MatchDetail from '@/pages/MatchDetail';
import H2H from '@/pages/H2H';
import Predictions from '@/pages/Predictions';
import Live from '@/pages/Live';

export default function App() {
  return (
    <PageWrapper>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/equipos" element={<Teams />} />
        <Route path="/equipos/:teamId" element={<TeamDetail />} />
        <Route path="/partidos" element={<Matches />} />
        <Route path="/partidos/:matchId" element={<MatchDetail />} />
        <Route path="/h2h" element={<H2H />} />
        <Route path="/predicciones" element={<Predictions />} />
        <Route path="/en-vivo" element={<Live />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </PageWrapper>
  );
}
