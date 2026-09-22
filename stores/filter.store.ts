"use client";

import { create } from "zustand";

interface FilterStore {
  filters: Record<string, unknown>;
  setFilter: (key: string, value: unknown) => void;
  clearFilters: () => void;
}

export const useFilterStore = create<FilterStore>((set) => ({
  filters: {},

  setFilter: (key, value) =>
    set((state) => ({
      filters: {
        ...state.filters,
        [key]: value,
      },
    })),

  clearFilters: () => set({ filters: {} }),
}));
