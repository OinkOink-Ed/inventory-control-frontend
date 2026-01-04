import type {
  DialogFormShowActions,
  DialogFormShowStore,
} from "@/kit/store/dialogFormShow/type.ts";
import { create } from "zustand";

export const useDialogFormShow = create<
  DialogFormShowStore & DialogFormShowActions
>((set) => ({
  decommissioning: false,
  delivery: false,
  movement: false,
  receiving: false,
  add_kabinet: false,
  create_model_cartridge: false,
  create_user: false,

  toggleDialogForm(name) {
    set((state) => ({ [name]: !state[name] }));
  },
}));
