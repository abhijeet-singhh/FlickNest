"use client";

import { create } from "zustand";

interface SearchStore {
  searchText: string;
  setSearchText: (searchText: string) => void;
  clearSearch: () => void;
}

export const useSearchStore = create<SearchStore>((set) => ({
  searchText: "",

  setSearchText: (searchText) => set({ searchText }),

  clearSearch: () => set({ searchText: "" }),
}));
