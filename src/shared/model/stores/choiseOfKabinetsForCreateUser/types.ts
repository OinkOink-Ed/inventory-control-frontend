export interface DivisionItem {
  id?: number;
}

export interface ChoiceOfKabinets {
  userChoices: (DivisionItem | undefined)[] | undefined;
}

export interface ChoiceOfKabinetsActions {
  setChoiceOfKabinets: (value: ChoiceOfKabinets) => void;
  clearChoiceOfKabinets: () => void;
}
