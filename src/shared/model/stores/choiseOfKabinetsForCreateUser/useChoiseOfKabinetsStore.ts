import type {
  ChoiceOfKabinets,
  ChoiceOfKabinetsActions,
} from "@/shared/model/stores/choiseOfKabinetsForCreateUser/types";
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
