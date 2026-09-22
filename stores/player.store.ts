"use client";

import { create } from "zustand";

interface PlayerStore {
  isPlayerOpen: boolean;
  currentTrailer: string | null;
  volume: number;
  muted: boolean;

  setPlayerOpen: (open: boolean) => void;
  setCurrentTrailer: (trailer: string | null) => void;
  setVolume: (volume: number) => void;
  setMuted: (muted: boolean) => void;
}

export const usePlayerStore = create<PlayerStore>((set) => ({
  isPlayerOpen: false,
  currentTrailer: null,
  volume: 1,
  muted: false,

  setPlayerOpen: (open) => set({ isPlayerOpen: open }),
  setCurrentTrailer: (trailer) => set({ currentTrailer: trailer }),
  setVolume: (volume) => set({ volume }),
  setMuted: (muted) => set({ muted }),
}));
