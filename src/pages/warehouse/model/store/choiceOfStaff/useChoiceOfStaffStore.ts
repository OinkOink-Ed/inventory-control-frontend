import type {
  ChoiceOfStaff,
  ChoiceOfStaffActions,
} from "@features/warehouse/model/store/choiceOfStaff/types.ts";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useChoiceOfStaffStore = create<
  ChoiceOfStaff & ChoiceOfStaffActions
>()(
  persist(
    (set) => ({
      warehouseChoices: undefined,
      setChoiceOfStaff: (res) => {
        set({
          warehouseChoices: res.warehouseChoices,
        });
      },
      clearChoiceOfStaff: () => {
        set({ warehouseChoices: undefined });
        useChoiceOfStaffStore.persist.clearStorage();
      },
    }),
    {
      name: "ChoiceOfStaff",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
