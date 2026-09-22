"use client";

import { create } from "zustand";

type ActiveModal = string | null;

interface UIStore {
  sidebarOpen: boolean;
  mobileMenuOpen: boolean;
  activeModal: ActiveModal;

  setSidebarOpen: (open: boolean) => void;
  setMobileMenuOpen: (open: boolean) => void;
  setActiveModal: (modal: ActiveModal) => void;
}

export const useUIStore = create<UIStore>((set) => ({
  sidebarOpen: false,
  mobileMenuOpen: false,
  activeModal: null,

  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),
  setActiveModal: (modal) => set({ activeModal: modal }),
}));
