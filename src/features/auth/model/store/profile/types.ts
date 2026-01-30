export interface ProfileStore {
  access_token: string;
  refresh_token: string;
}

export interface ProfileActions {
  setProfile: (value: { access_token: string; refresh_token: string }) => void;
  clearProfile: () => void;
}
