import { useAuthStore } from "../pages/auth/store/useAuthStore";
import { useProfileStore } from "./profile/useProfileStore";

export function useExit() {
  const exitProfileStore = useProfileStore.persist.clearStorage;
  const exitAuthStore = useAuthStore.persist.clearStorage;

  return { exitProfileStore, exitAuthStore };
}
