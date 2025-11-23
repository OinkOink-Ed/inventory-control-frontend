import { create } from "zustand";
import { DialogFormShowActions, DialogFormShowStore } from "./type";

export const useDialogFormShow = create<
  DialogFormShowStore & DialogFormShowActions
>((set) => ({
  decommissioning: false,
  delivery: false,
  movement: false,
  receiving: false,

  toggleDialogForm(name) {
    set((state) => ({ [name]: !state[name] }));
  },
}));
