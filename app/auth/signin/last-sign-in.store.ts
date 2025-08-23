"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type SignInProvider = "github" | "google";

type LastSignInState = {
  lastProvider: SignInProvider | null;
  setLastProvider: (provider: SignInProvider) => void;
};

export const useLastSignInStore = create<LastSignInState>()(
  persist(
    (set) => ({
      lastProvider: null,
      setLastProvider: (provider: SignInProvider) =>
        set({ lastProvider: provider }),
    }),
    {
      name: "last-sign-in-storage",
    },
  ),
);
