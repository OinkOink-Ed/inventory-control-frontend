export interface DialogFormShowStore {
  delivery: boolean;
  decommissioning: boolean;
  receiving: boolean;
  movement: boolean;
}

export interface DialogFormShowActions {
  toggleDialogForm: (name: keyof DialogFormShowStore) => void;
}
