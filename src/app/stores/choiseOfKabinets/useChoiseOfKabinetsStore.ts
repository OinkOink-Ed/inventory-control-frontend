import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { ChoiceOfKabinets, ChoiceOfKabinetsActions } from "./types";

export const useChoiceOfKabinetsStore = create<
  ChoiceOfKabinets & ChoiceOfKabinetsActions
>()(
  persist(
    (set) => ({
      userChoices: undefined,
      setChoiceOfKabinets: (res) => {
        set({
          userChoices: res.userChoices,
        });
      },
      clearChoiceOfKabinets: () => {
        set({ userChoices: undefined });
        useChoiceOfKabinetsStore.persist.clearStorage();
      },
    }),
    {
      name: "ChoiceOfKabinets",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
