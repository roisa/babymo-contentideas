"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { GeneratedContent } from "./types";

interface LibraryState {
  items: GeneratedContent[];
  addBatch: (items: GeneratedContent[]) => void;
  remove: (id: string) => void;
  clear: () => void;
}

export const useLibrary = create<LibraryState>()(
  persist(
    (set) => ({
      items: [],
      addBatch: (items) =>
        set((s) => ({
          items: [...items, ...s.items].slice(0, 200),
        })),
      remove: (id) => set((s) => ({ items: s.items.filter((i) => i.id !== id) })),
      clear: () => set({ items: [] }),
    }),
    { name: "babymo-library-v1" }
  )
);
