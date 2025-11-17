import { jwtDecode, JwtPayload } from "jwt-decode";
import { useProfileStore } from "../stores/profile/useProfileStore";
import { UserDtoInterfaces } from "./types/UserDtoInterfaces";

export function decryptedProfile(): UserDtoInterfaces | false {
  const profile = useProfileStore.getState();
  const storedCryptProfile = profile.access_token;
  try {
    return jwtDecode<JwtPayload>(storedCryptProfile)
      .sub as unknown as UserDtoInterfaces;
  } catch {
    return false;
  }
}
