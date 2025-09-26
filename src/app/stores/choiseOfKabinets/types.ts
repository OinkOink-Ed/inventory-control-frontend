export interface ChoiceOfKabinets {
  userChoices: number | undefined;
}

export interface ChoiceOfKabinetsActions {
  setChoiceOfKabinets: (value: { userChoices: number | undefined }) => void;
  clearChoiceOfKabinets: () => void;
}
