import { create } from 'zustand';

export type PinColor = 'red' | 'orange' | 'yellow' | 'green' | 'teal' | 'blue' | 'purple' | 'pink';

export interface UserLocation {
  id: string;
  name: string;
  color: PinColor | string; // Support custom colors
  icon?: string; // New icon field
  latitude: number;
  longitude: number;
  lastUpdated: Date;
}

export interface UserSession {
  name: string;
  passkey: string;
  color: PinColor | string; // Support custom colors
  icon?: string; // New icon field
}

interface LocationStore {
  session: UserSession | null;
  members: UserLocation[];
  isConnected: boolean;
  mapboxToken: string | null;
  setSession: (session: UserSession | null) => void;
  setMembers: (members: UserLocation[]) => void;
  updateMember: (member: UserLocation) => void;
  removeMember: (id: string) => void;
  setConnected: (connected: boolean) => void;
  stopSharing: () => void;
  resumeSharing: () => void;
  setMapboxToken: (token: string) => void;
  clearSession: () => void;
}

export const useLocationStore = create<LocationStore>((set) => ({
  session: null,
  members: [],
  isConnected: false,
  mapboxToken: import.meta.env.VITE_MAPBOX_TOKEN || localStorage.getItem('mapbox-token'),

  setSession: (session) => set({ session }),

  setMembers: (members) => set({ members }),

  updateMember: (member) =>
    set((state) => ({
      members: state.members.some((m) => m.id === member.id)
        ? state.members.map((m) => (m.id === member.id ? member : m))
        : [...state.members, member],
    })),

  removeMember: (id) =>
    set((state) => ({
      members: state.members.filter((m) => m.id !== id),
    })),

  setConnected: (isConnected) => set({ isConnected }),

  // Stop sharing but keep session data (name/color/icon) locally
  stopSharing: () => set({ isConnected: false, members: [] }),

  // Resume sharing
  resumeSharing: () => set({ isConnected: true }),

  setMapboxToken: (token) => {
    localStorage.setItem('mapbox-token', token);
    set({ mapboxToken: token });
  },

  clearSession: () =>
    set({
      session: null,
      members: [],
      isConnected: false,
    }),
}));
