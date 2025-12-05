import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { type ProfileActions, type ProfileStore } from "./types";

export const useProfileStore = create<ProfileStore & ProfileActions>()(
  persist(
    (set) => ({
      access_token: "",
      refresh_token: "",
      setProfile: (res) => {
        set({
          access_token: res.access_token,
          refresh_token: res.refresh_token,
        });
      },
      clearProfile: () => {
        set({ access_token: "", refresh_token: "" });
        useProfileStore.persist.clearStorage();
      },
    }),
    {
      name: "profileStorage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
