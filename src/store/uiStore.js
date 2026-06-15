import { create } from 'zustand';

export const useUIStore = create((set, get) => ({
  sidebarOpen: false,
  apiQuotaRemaining: null,
  activeFilters: { group: 'all', status: 'all', round: 'all' },
  selectedCompareTeams: [null, null],

  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),

  setApiQuotaRemaining: (n) => set({ apiQuotaRemaining: n }),

  setFilter: (key, value) =>
    set((state) => ({
      activeFilters: { ...state.activeFilters, [key]: value },
    })),

  resetFilters: () =>
    set({ activeFilters: { group: 'all', status: 'all', round: 'all' } }),

  setCompareTeam: (index, teamId) =>
    set((state) => {
      const teams = [...state.selectedCompareTeams];
      teams[index] = teamId;
      return { selectedCompareTeams: teams };
    }),

  resetCompareTeams: () => set({ selectedCompareTeams: [null, null] }),
}));
