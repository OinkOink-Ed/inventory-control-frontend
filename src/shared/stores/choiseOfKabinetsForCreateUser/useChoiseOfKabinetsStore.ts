import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { type ChoiceOfKabinets, type ChoiceOfKabinetsActions } from "./types";

export const useChoiseOfKabinetsForCreateUser = create<
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
        useChoiseOfKabinetsForCreateUser.persist.clearStorage();
      },
    }),
    {
      name: "ChoiceOfKabinets",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
