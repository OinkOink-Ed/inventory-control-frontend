export interface ProfileStore {
  profile: null | string;
}

export interface ProfileActions {
  setProfile: (value: string) => void;
}
