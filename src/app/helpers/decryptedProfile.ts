import { jwtDecode, JwtPayload } from "jwt-decode";
import { useProfileStore } from "../stores/profile/useProfileStore";
import { UserDtoInterfaces } from "./types/UserDtoInterfaces";

export function decryptedProfile(): UserDtoInterfaces {
  const profile = useProfileStore.getState();
  const storedCryptProfile = profile.access_token;
  try {
    return jwtDecode<JwtPayload>(storedCryptProfile)
      .sub as unknown as UserDtoInterfaces;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return {
      id: 0,
      role: { roleName: "" },
    };
  }
}
