import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { StateCreator } from "zustand/vanilla";

interface AppState {
  dopen: boolean;
  updateOpen: (dopen: boolean) => void;
}

const appStore: StateCreator<AppState> = (set) => ({
  dopen: true,
  updateOpen: (dopen: boolean) => set(() => ({ dopen })),
});

const persistedAppStore = persist<AppState>(appStore, {
  name: "my_app_store",
});

export const useAppStore = create(persistedAppStore);
