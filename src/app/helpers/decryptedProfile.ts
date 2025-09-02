import { jwtDecode, JwtPayload } from "jwt-decode";
import { useProfileStore } from "../stores/profile/useProfileStore";

interface UserDto {
  id: number;
  role: { roleName: string };
}

export function decryptedProfile(): UserDto {
  const profile = useProfileStore.getState();
  const storedCryptProfile = profile.access_token;
  try {
    return jwtDecode<JwtPayload>(storedCryptProfile).sub as unknown as UserDto;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return {
      id: 0,
      role: { roleName: "" },
    };
  }
}
