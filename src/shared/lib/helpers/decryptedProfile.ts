import { jwtDecode } from "jwt-decode";
import { useProfileStore } from "@features/auth";
import type { UserDtoInterfaces } from "@/lib/helpers";

export function decryptedProfile(): UserDtoInterfaces | false {
  const profile = useProfileStore.getState();
  const storedCryptProfile = profile.access_token;
  try {
    return jwtDecode(storedCryptProfile).sub as unknown as UserDtoInterfaces;
  } catch {
    return false;
  }
}
