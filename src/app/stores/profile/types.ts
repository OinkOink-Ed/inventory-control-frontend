export interface ProfileStore {
  token: string;
}

export interface ProfileActions {
  setProfile: (value: string) => void;
}
