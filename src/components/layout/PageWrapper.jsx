import Navbar from './Navbar';
import Sidebar from './Sidebar';

export default function PageWrapper({ children }) {
  return (
    <div className="min-h-screen bg-surface">
      <Navbar />
      <Sidebar />
      <main className="pt-14 pb-20 md:pb-6">
        <div className="max-w-7xl mx-auto px-4 py-6">
          {children}
        </div>
      </main>
    </div>
  );
}
