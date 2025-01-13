import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { ProfileActions, ProfileStore } from "./types";

export const useProfileStore = create<ProfileStore & ProfileActions>()(
  persist(
    (set) => ({
      profile: null,
      setProfile: (res) => set({ profile: res }),
    }),
    {
      name: "profileStorage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
