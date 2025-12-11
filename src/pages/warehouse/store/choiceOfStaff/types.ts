export interface ChoiceOfStaff {
  warehouseChoices: number | undefined;
}

export interface ChoiceOfStaffActions {
  setChoiceOfStaff: (value: { warehouseChoices: number | undefined }) => void;
  clearChoiceOfStaff: () => void;
}
