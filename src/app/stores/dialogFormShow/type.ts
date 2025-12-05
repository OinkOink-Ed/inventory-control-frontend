export interface DialogFormShowStore {
  delivery: boolean;
  decommissioning: boolean;
  receiving: boolean;
  movement: boolean;
  create_user: boolean;
  add_kabinet: boolean;
  create_model_cartridge: boolean;
}

export interface DialogFormShowActions {
  toggleDialogForm: (name: keyof DialogFormShowStore) => void;
}
