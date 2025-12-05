import { jwtDecode } from "jwt-decode";
import type { UserDtoInterfaces } from "./types/UserDtoInterfaces";
import { useProfileStore } from "@app-stores/profile/useProfileStore";

export function decryptedProfile(): UserDtoInterfaces | false {
  const profile = useProfileStore.getState();
  const storedCryptProfile = profile.access_token;
  try {
    return jwtDecode(storedCryptProfile).sub as unknown as UserDtoInterfaces;
  } catch {
    return false;
  }
}
