import type {
  ChoiceOfKabinets,
  ChoiceOfKabinetsActions,
} from "@features/warehouse/model/store/choiseOfKabinets/types.ts";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

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
