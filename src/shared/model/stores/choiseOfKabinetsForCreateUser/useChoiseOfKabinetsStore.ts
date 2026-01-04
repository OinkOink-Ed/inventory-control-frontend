import type {
  ChoiceOfKabinets,
  ChoiceOfKabinetsActions,
} from "@/shared/stores/choiseOfKabinetsForCreateUser/types.ts";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

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
    },
  ),
);
